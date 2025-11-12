import { Link } from 'react-router-dom';
import { useState } from 'react';
import './LoginCard.css';

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login:', { email, password });
    };

    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Welcome Back</h1>
                    <p className="login__subtitle">Sign in to your ShopEase account</p>
                </div>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email Address</label>
                        <input 
                            type="email" 
                            className="email__input login__input" 
                            placeholder='example@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input login__input" 
                            placeholder='••••••••••'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login__button__container">
                        <button className="login__button" onClick={handleLogin}>Sign In</button>
                    </div>
                </div>
                <div className="login__other__actions">
                    <Link to="/forgot-password" className="login__forgot__password">
                        Forgot Password?
                    </Link>
                    <div className="login__new__account">
                        Don't have an account? 
                        <Link to="/account/register" className="create__account__link">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginCard;