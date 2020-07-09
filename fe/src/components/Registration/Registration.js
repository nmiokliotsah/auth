import React from 'react';
import { api } from '../../api/api';
import style from './Registration.module.css';
import RegistrationForm from './RegistrationForm';
import history from '../../history/history'

const Registration = () => {
    const onSubmit = (formData, actions) => {
        const { username, email, password, repeatPassword } = formData;

        api.register({ username, email, password, repeatPassword })
            .then(res => {
                if (res.status === 200) {
                    history.push('/login');
                } else {
                    actions.setFieldError('serverError', 'Something going wrong, try again');
                }
            });
    }
    const initialValues = {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    }

    return <RegistrationForm onSubmit={onSubmit} initialValues={initialValues} />
}

export default Registration;