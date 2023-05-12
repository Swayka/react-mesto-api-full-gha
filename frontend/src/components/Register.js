import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {

  const [data, setData] = useState({ 
    email: "", password: "" 
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    props.handleRegister({ email, password });
  };


  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>

        <input
          type="email"
          className="auth__input auth__input_email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="auth__input auth__input_password"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__container">
        <p className="auth__caption">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__sign-in">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;