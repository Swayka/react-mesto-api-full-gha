import React, { useState } from "react";

function Login({handleLogin}) {
  const [formValue, setFormValue] = useState({ 
    email: "", password: "" 
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault()
    handleLogin(formValue)
  };


  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Вход</h2>

        <input
          type="email"
          className="auth__input auth__input_email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="auth__input auth__input_password"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          value={formValue.password}
          onChange={handleChange}
        />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </div>
  );

}

export default Login;