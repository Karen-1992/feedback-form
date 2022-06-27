import React from "react";
import PropTypes from "prop-types";

const TelField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
    isRequired
}) => {
    const prefiks = "+7";
    const handleKeyDown = (e) => {
        const { key } = e;
        const isValidKey =
            (key >= "0" && key <= "9") ||
            key === "ArrowLeft" ||
            key === "ArrowRight" ||
            key === "Delete" ||
            key === "Backspace" ||
            key === "Tab";
        if (!isValidKey) {
            e.preventDefault();
        }
        if ((key === "Delete" || key === "Backspace") && e.target.selectionStart < 5) {
            e.preventDefault();
        }
    };
    function getPhoneNumbers(value) {
        let numbers = "";
        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value[i]) && value[i] !== " ") {
                numbers += value[i];
            }
        }
        return numbers;
    }
    function getPhoneValue(target) {
        const mask = target.placeholder;
        const phoneNumbers = getPhoneNumbers(target.value);
        const maskArr = mask.split("");
        let index;
        for (let i = 1; i < phoneNumbers.length; i++) {
            index = maskArr.findIndex((s) => s === "_");
            if (index === -1) {
                return maskArr.join("").slice(0, index + 1);
            } else {
                maskArr[index] = phoneNumbers[i];
            }
        }
        return maskArr.join("").slice(0, index + 1);
    }
    const handleChange = (e) => {
        const { target } = e;
        const value = getPhoneValue(target);
        onChange({ name: target.name, value });
    };
    const handleFocus = ({ target }) => {
        const { value } = target;
        const newValue = prefiks + value.slice(2, value.length);
        onChange({ name: target.name, value: newValue });
    };
    const getInputClasses = () => {
        return error && error !== "isRequired" ? "invalid" : "";
    };
    const handleBlur = ({ target }) => {
        if (target.value === prefiks) {
            onChange({ name: target.name, value: "" });
        }
    };
    return (
        <div className="text-field__container">
            <label className="" htmlFor={name}>
                {label}
            </label>
            {isRequired && <span className="required">*</span>}
            <div className="input__container">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className={getInputClasses()}
                    onFocus={handleFocus}
                    maxLength="18"
                    onBlur={handleBlur}
                />
                {error && error !== "isRequired" && (
                    <div className="error-text">{error}</div>
                )}
            </div>
        </div>
    );
};
TelField.defaultProps = {
    type: "text",
    isRequired: true
};
TelField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool
};

export default TelField;
