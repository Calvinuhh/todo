import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Todos from "../components/Todos";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const currentTime = Date.now();

    if (
      !token ||
      !tokenTimestamp ||
      currentTime - parseInt(tokenTimestamp) > 3600000
    ) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center ">
      <Todos />
    </div>
  );
}
