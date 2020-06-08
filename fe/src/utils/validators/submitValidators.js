import { SubmissionError } from 'redux-form';
import { api } from "../../api/api";
import history from '../../history/history'

function submit(values) {
    return api.login(values.email, values.password)
        .then(res => {
            if (res.status === 200) {
                history.push('/home');
            } else {
                throw new Error(res.error);
            }
        })
        .catch(err => {
            throw new SubmissionError({
                username: 'User does not exist',
                _error: 'User does not exist!'
            })
        });
}

export default submit;