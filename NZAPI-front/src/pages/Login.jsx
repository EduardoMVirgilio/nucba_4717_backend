import { useForm } from "react-hook-form";
import style from "../styles/login.module.css";
import useUser from "../context/useUser.jsx";
import { useNavigate } from "react-router";
const Login = () => {
  const { profile, token, setToken } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: data.email, clave: data.password }),
      });
      if (!response.ok) {
        let result = await response.json();
        if (result.errors.correo) {
          throw new Error(result.errors.correo.msg);
        }
        if (result.errors.clave) {
          throw new Error(result.errors.clave.msg);
        }
        throw new Error(result.message);
      }
      let result = await response.json();
      console.log(result);
      setToken(result.token);
      navigate("/");
    } catch (error) {
      setError("password", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id={style.login}>
      <fieldset>
        <legend>Iniciar sesión</legend>
        <input
          type="text"
          {...register("email", {
            required: "Email es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email es invalido",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          {...register("password", {
            required: "Password es requerido",
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Password es invalido",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={() => navigate("/")}>
          Volver
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
