import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { LoginFormData } from "../types";
import "../styles/global.css";
import { getErrorMessage } from "../utils/handleError";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data.email, data.password);
      localStorage.setItem("token", res.data.token);
      navigate("/phishing");
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <a className="link" href="/register">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
