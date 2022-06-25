import React from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
    isRequired
}) => {
    const handleChange = (e) => {
        const { target } = e;
        // const { value } = target;
        // if (target.name === "name") {
        //     let spaces = 0;
        //     let spaceIndex;
        //     for (let i = 0; i < value.length; i++) {
        //         if (value[i] === " ") {
        //             spaces += 1;
        //             spaceIndex = i;
        //         }
        //     }
        //     if (spaces >= 2 || spaceIndex === 0) {
        //         e.preventDefault();
        //         return;
        //     }
        // }
        let value = target.value;
        if (target.name === "name") {
            value = value.toUpperCase();
        }
        onChange({ name: target.name, value: value });
    };
    const getInputClasses = () => {
        return error && error !== "isRequired" ? "invalid" : "";
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
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {error !== "isRequired" && (
                    <div className="error-text">{error}</div>
                )}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text",
    isRequired: true
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool
};

export default TextField;
