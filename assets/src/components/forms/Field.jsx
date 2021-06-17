import React from 'react';

const Field = (props) =>{
    const {name, label, placeholder = "", value, onChange, type = "text", error = ""} = props;
    return (
        <div className={"form-group" + (error && " has-danger")}>
            <label className="form-label" htmlFor={name}>{label}</label>
            <input type={type}
                   placeholder={placeholder || label}
                   id={name}
                   name={name}
                   className={"form-control" + (error && " is-invalid")}
                   value={value}
                   onChange={onChange}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}

export default Field;