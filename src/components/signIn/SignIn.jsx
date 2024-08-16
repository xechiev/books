import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import classes from './SignIn.module.scss';
import { isLoggedIn } from '../../redux/reducers/UserSlice';

const SignupSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(40),
});

export default function SignIn() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    const dispatch = useDispatch();
    const [errorSignIn, setErrorSignIn] = useState(null);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const user = Object.keys(localStorage);
        if (user.length) {
            user.forEach((el) => {
                if (el === data.email) {
                    dispatch(isLoggedIn(true));
                    localStorage.setItem('users', JSON.stringify(data));
                    navigate('/');
                } else {
                    setErrorSignIn(true);
                }
            });
        } else {
          setErrorSignIn(true);
        }
    };
    return (
        <div className={classes.body}>
            <div className={classes.wrapper}>
                {errorSignIn && (
                    <Alert variant="danger" className={classes.danger}>
                        Invalid email or password!
                    </Alert>
                )}
                <h5 className={classes.name}>Sign In</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h6 className={classes.title}>Email address</h6>
                    <input
                        {...register('email')}
                        className={classes.form}
                        type="email"
                        placeholder="alex@example.com"
                    />
                    {errors.email && (
                        <p className={classes.error}>{errors.email.message}</p>
                    )}
                    <h6 className={classes.title}>Password</h6>
                    <input
                        {...register('password')}
                        className={classes.form}
                        type="password"
                    />
                    {errors.password && (
                        <p className={classes.error}>
                            {errors.password.message}
                        </p>
                    )}
                    <button type="submit" className={classes.submit}>
                        Login
                    </button>
                    <span className={classes.haveAccount}>
                        Don’t have an account?{' '}
                        <Link to="/signUp" className={classes.signIn}>
                            Sign Up.
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
