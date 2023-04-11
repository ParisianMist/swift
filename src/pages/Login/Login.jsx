import './Login.scss';

//tools
import axios from "axios";
import { useState } from "react";
import { API_URL } from '../../utils/utils';

//logo
import logo from '../../assets/logo/swift_logo-white.png'

const Login = ({ setIsUserLoggedIn }) => {
    const [errorLogin, setErrorLogin] = useState();

    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        // axios POST request: /login
        axios
            .post(`${API_URL}/login`,
                {
                    email,
                    password,
                })
            .then((res) => {
                // get token from response
                const { token } = res.data;

                //store token in session storage
                sessionStorage.setItem('token', token);

                //change state to true to navigate to profile
                setIsUserLoggedIn(true);
            })
            .catch((error) => {
                console.error("Error:" + error);
                setErrorLogin("Unsuccessful Login");
              });
    }

    return (
        <main className='login'>
            <form className='login-form'
            onSubmit={handleSubmit}
            >
                
                <img src={logo} alt="" className="login__logo" />
                <label className='login-form__label'>
                    Email:
                </label>
                <input type='email' name='email' className='login-form__input login-form__input--email' />

                <label className='login-form__label'>
                    Password:
                </label>
                <input type='password' name='password' className='login-form__input login-form__input--password' />

                {errorLogin && <div className='login-form__message'>{errorLogin}</div>}

                <button className='button login-form__button'>Log In</button>
            </form>
            <div className="login__overlay"></div>
        </main>
    );
};

export default Login;
