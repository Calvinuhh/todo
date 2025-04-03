import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    if (token && tokenTimestamp) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    validateForm();
  }, [username, password]);

  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (username.length > 40) {
      newErrors.username = "Username must be at most 40 characters long";
    } else if (
      !/^[a-zA-Z0-9ñÑ!@#$%^&*()_+=[\]{}|;:'",.<>/?`~\\-]+$/.test(username)
    ) {
      newErrors.username =
        "Username must contain only letters, numbers, and special characters, no spaces";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    setErrors(newErrors);
    setIsFormValid(!newErrors.username && !newErrors.password);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      Swal.fire({
        icon: "success",
        title: "Registration successful",
        text: "You have registered successfully!",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("username")}
            className="w-full px-3 py-2 border rounded"
          />
          {touched.username && errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            className="w-full px-3 py-2 border rounded"
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Cargando..." : "Register"}
        </button>
        <button
          type="button"
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mt-4 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign in
        </button>
      </form>
    </div>
  );
}
