import { useState } from "react";

function Login(props) {

    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
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
        props.onLogin({
            password: formValue.password,
            email: formValue.email
        });
        
    }

    return (
        <div className={`register`}>
            <h3 className="register__title">Войти</h3>
            <form className="register__form" name="registerForm" onSubmit={handleSubmit}>
                <input type="email" name="email" className="register__input" value={formValue.email}
                    placeholder="Email" minLength="2" maxLength="30" required onChange={handleChange} />
                <input type="password" name="password" minLength="2" maxLength="30" value={formValue.password}
                    id="link" className="register__input" placeholder="Пароль" required onChange={handleChange} />
                <button className="register__save-button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;