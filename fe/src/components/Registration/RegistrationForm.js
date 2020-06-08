import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
    Schema,
    validatePassword,
    validateUsername,
    validateRegistrationEmail,
} from '../../utils/validators/validators';
import { Input } from '../common/FormControls/FormControls';
import style from './Registration.module.css'

const RegistrationForm = (props) => {
    return (
        <div className="container">
            <Formik
                initialValues={props.initialValues}
                onSubmit={props.onSubmit}
                validationSchema={Schema}>
                {props => (
                    <Form>
                        <div className="form-group">
                            <label>Username:</label>
                            <Field
                                className="form-control"
                                component={Input}
                                name="username"
                                validate={validateUsername}
                                placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <Field
                                className="form-control"
                                component={Input}
                                name="email"
                                type="email"
                                validate={validateRegistrationEmail}
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <Field
                                className="form-control"
                                component={Input}
                                name="password"
                                type="password"
                                placeholder="Password"
                                validate={validatePassword} />
                        </div>
                        <div className="form-group">
                            <label>Repeat password:</label>
                            <Field
                                className="form-control"
                                component={Input}
                                name="repeatPassword"
                                type="password"
                                placeholder="Repeat password" />
                        </div>
                        <div className={style.RegistrationError}>
                            {props.errors.serverError}
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegistrationForm;