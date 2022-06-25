import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    minLength,
    maxLength,
    rows,
    isRequired
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
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
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    rows={rows}
                    minLength={minLength}
                    maxLength={maxLength}
                    className={getInputClasses()}
                />
                {error !== "isRequired" && (
                    <div className="error-text">{error}</div>
                )}
            </div>
        </div>
    );
};
TextAreaField.defaultProps = {
    type: "text",
    rows: "5",
    minLength: "10",
    maxLength: "300",
    isRequired: true
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    rows: PropTypes.string,
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool
};

export default TextAreaField;
