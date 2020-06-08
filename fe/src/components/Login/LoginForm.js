import React from 'react';
import { Formik, Form, Field } from 'formik';
import { validatePassword, validateLoginEmail } from '../../utils/validators/validators';
import { Input } from '../common/FormControls/FormControls';
import style from './Login.module.css';

const LoginForm = (props) => {
    return (
        <div className="container">
            <Formik
                initialValues={props.initialValues}
                onSubmit={props.onSubmit} >
                {props => (
                    <Form>
                        <div className="form-group">
                            <label>Email address:</label>
                            <Field
                                className="form-control"
                                component={Input}
                                name="email"
                                validate={validateLoginEmail}
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <Field
                                className="form-control"
                                component={Input}
                                name="password"
                                type="password"
                                validate={validatePassword}
                                placeholder="Enter password" />
                        </div>
                        <div className="form-group form-check">
                            <Field
                                className="form-check-input"
                                component={"input"}
                                type="checkbox"
                                name="rememberMe"
                                placeholder="Enter password" />
                            <label className="form-check-label">Check me out</label>
                        </div>
                        <div className={style.loginError}>
                            {props.errors.serverError}
                        </div>
                        <button className="btn btn-primary" disabled={props.submitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;