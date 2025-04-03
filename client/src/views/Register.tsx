import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
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
      <RegisterForm />
    </>
  );
}
