import React from 'react';
import style from './FormControls.module.css';

export const Input = ({ field, form: { touched, errors }, ...props }) => {
    const error = touched[field.name] && errors[field.name];

    return (
        <div className={error ? style.FormError : ""}>
            <input {...field} {...props} />
            {error && <span>{errors[field.name]}</span>}
        </div>
    );
}