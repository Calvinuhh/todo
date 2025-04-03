import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimeStamp = localStorage.getItem("tokenTimeStamp");
    if (token && tokenTimeStamp) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <LoginForm />
    </>
  );
}
