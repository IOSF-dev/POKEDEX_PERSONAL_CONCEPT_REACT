import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import LoginFom from "../components/LoginFom";
import { login } from "../services/AuthServices.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(formData) {
    try {
      setIsLoading(true);
      setErrorMessage("");

      // 1. Pedimos login al servicio.
      const result = await login(formData);

      // 2. loginValidation ya deja guardado el usuario en localStorage.
      // 3. Segun el rol, navegamos al panel correspondiente.
      if (result.mode === "admin") {
        navigate("/admin");
        return;
      }

      if (result.mode === "pokemon") {
        navigate("/pokemon");
        return;
      }

      setErrorMessage("No se pudo determinar el tipo de acceso.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main className="main_LOG">
        <HeaderComponent />
        <LoginFom
          onLogin={handleLogin}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <footer className="footer_LOG">
          <div className="GIF"></div>
        </footer>
      </main>
    </>
  );
};

export default LoginPage
