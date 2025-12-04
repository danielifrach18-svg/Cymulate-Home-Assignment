import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendPhishingEmail, getAllAttempts } from "../api/phishing";
import { PhishingAttempt, PhishingFormData } from "../types";
import "../styles/global.css";
import "../styles/table.css";
import { getErrorMessage } from "../utils/handleError";

const Phishing: React.FC = () => {
  const [attempts, setAttempts] = useState<PhishingAttempt[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhishingFormData>();

  const token = localStorage.getItem("token") || "";

  const fetchAttempts = async () => {
    try {
      const res = await getAllAttempts(token);
      setAttempts(res.data);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  const onSubmit = async (data: PhishingFormData) => {
    try {
      await sendPhishingEmail(data.email, token);
      alert("Phishing email sent");
      reset();
      fetchAttempts();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  return (
    <div className="container">
      <h2>Phishing Simulation</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Target Email"
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <button type="submit">Send Phishing Email</button>
      </form>

      <h3>Attempts</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a) => (
            <tr key={a._id}>
              <td>{a.email}</td>
              <td>{a.subject}</td>
              <td>{a.status}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Phishing;
