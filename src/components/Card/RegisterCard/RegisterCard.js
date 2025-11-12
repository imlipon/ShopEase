import { Link } from 'react-router-dom';
import { useState } from 'react';
import './RegisterCard.css';

const RegisterCard = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateAccount = () => {
        console.log('Create Account:', formData);
    };

    return ( 
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                    <p className="register__subtitle">Join ShopEase and start shopping</p>
                </div>
                <div className="register__inputs">
                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First Name</label>
                        <input 
                            type="text" 
                            className="fname__input register__input"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Your first name"
                        />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last Name</label>
                        <input 
                            type="text" 
                            className="lname__input register__input"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Your last name"
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email Address</label>
                        <input 
                            type="email" 
                            className="email__input register__input" 
                            placeholder='example@gmail.com'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input register__input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••••"
                        />
                    </div>
                    <div className="register__button__container">
                        <button className="register__button" onClick={handleCreateAccount}>Create Account</button>
                    </div>
                </div>
                <div className="register__other__actions">
                    <div className="register__login__account">
                        Already have an account? 
                        <Link to="/account/login" className="login__link">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RegisterCard;