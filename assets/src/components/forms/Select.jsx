import React from 'react';

const Select = (props) =>{
    const {name, label, value, onChange, children, error = ""} = props;
    return (
        <>
            <div className={"form-group" + (error && " has-danger")}>
                <label htmlFor={name} className="form-label">{label}</label>
                <select onChange={onChange} value={value} name={name} id={name} className={"form-select" + (error && " is-invalid")}>
                    <option defaultValue disabled value="">Choisir...</option>
                    {children}
                </select>
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
        </>
    )
}

export default Select;