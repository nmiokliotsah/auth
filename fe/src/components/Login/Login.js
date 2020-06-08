import React from 'react';
import LoginForm from './LoginForm';
import { api } from '../../api/api';
import style from './Login.module.css';
import history from '../../history/history'

const Login = () => {
    const onSubmit = (formData, actions) => {
        const { email, password } = formData;
        api.login(email, password)
            .then(res => {
                if (res.status === 200) {
                    history.push('/home');
                } else {
                    actions.setFieldError("serverError", "This user does not exist");
                }
            });
    }
    const initialValues = {
        email: '',
        password: ''
    }
    return (
        <div className={style.formLogin}>
            <LoginForm
                onSubmit={onSubmit}
                initialValues={initialValues} />
        </div>
    );
}

export default Login;