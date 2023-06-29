import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister({
            password: formValue.password,
            email: formValue.email
        });
    }

    function handleClick() {
        navigate('/sign-in', { replace: true });
    }

    return (
        <div className={`register`}>
            <h3 className="register__title">Регистрация</h3>
            <form className="register__form" name="registerForm" onSubmit={handleSubmit}>
                <input type="email" name="email" className="register__input"
                    placeholder="Email" minLength="2" maxLength="30" required onChange={handleChange} />
                <input type="password" name="password" minLength="2" maxLength="30"
                    id="link" className="register__input" placeholder="Пароль" required onChange={handleChange} />
                <button className="register__save-button" type="submit">Зарегистрироваться</button>
                <a className="register__login-title" href="#" onClick={handleClick}>Уже зарегистрированы? Войти</a>
            </form>
        </div>
    )
}

export default Register;