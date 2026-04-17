import { useState } from "react";

const LoginFom = ({ onLogin, isLoading, errorMessage }) => {
  const [userID, setUserID] = useState("");
  const [userPASS, setUserPASS] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // El formulario solo recoge datos y delega el login en LoginPage.
    await onLogin({ userID, userPASS });
  };

  return (
    <div className="login_DIV">
      <form className="login_box" onSubmit={handleSubmit}>
        <input
          className="CUENTA"
          type="text"
          placeholder="Email-Pokemon"
          value={userID}
          onChange={(event) => setUserID(event.target.value)}
        />
        <input
          className="CLAVE"
          type="password"
          placeholder="Password "
          value={userPASS}
          onChange={(event) => setUserPASS(event.target.value)}
        />
        <button className="BOTONSUBMIT" type="submit" disabled={isLoading}>
          {isLoading ? "..." : "LOGIN"}
        </button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
};

export default LoginFom
