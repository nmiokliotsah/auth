import { api } from '../../api/api';
import * as Yup from "yup";

export const required = value => {
    if (!value) {
        return "Field is required";
    }
}

export const validateUsername = value => {
    if (!value) {
        return "Field is required";
    } else if (value.length < 3) {
        return 'Name must be at least 3 characters';
    } else if (value) {
        return api.getUserByUsername(value)
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.username) {
                    return 'This name is taken';
                }
            });
    }
}

export const validateLoginEmail = value => {
    if (!value) {
        return "Field is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return "Email is incorrect";
    }
}

export const validateRegistrationEmail = value => {
    if (!value) {
        return "Field is required";
    } else if (value) {
        const correctEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

        if (!correctEmail) {
            return "Email is incorrect";
        }

        return api.getUserByEmail(value)
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.email) {
                    return 'This email is taken';
                }
            });
    }
}

export const validatePassword = value => {
    if (!value) {
        return "Field is required";
    } else if (value.length < 8) {
        return "Password must be at least 8 characters";
    }
}

export const Schema = Yup.object().shape({
    repeatPassword: Yup.string()
    .required('Field is required')
    .min(8, "Password must be at least 8 characters")
    .when("password", {
        is: value => (value && value.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password does not match"
        )
    })
});