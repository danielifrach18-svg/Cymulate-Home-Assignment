import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { RegisterFormData } from "../types";
import "../styles/global.css";
import { getErrorMessage } from "../utils/handleError";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password);
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
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

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <a className="link" href="/login">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
