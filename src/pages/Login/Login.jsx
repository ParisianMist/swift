import './Login.scss';

const Login = ({ setIsUserLoggedIn }) => {

    return (
        <main className='login'>
            <form className='login-form'            >
                <label className='login-form__label'>
                    Email:
                </label>
                <input type='text' name='username' className='login-form__input login-form__input--email' />

                <label className='login-form__label'>
                    Password:
                </label>
                <input type='password' name='password' className='login-form__input login-form__input--password' />


                <button className='login-form__button'>Log In</button>
            </form>
            <div className="login__overlay"></div>
        </main>
    );
};

export default Login;