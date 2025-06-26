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
  const onSubmit = (data) => {
    console.log(data);
    // setToken(data.token);
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id={style.login}>
      <fieldset>
        <legend>Iniciar sesión</legend>
        <input type="text" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register("password")} />
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
