import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordVisibilityToggleButton from "../components/PasswordVisibilityToggleButton";
import FormSubmitButton from "../components/FormSubmitButton";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email dan password tidak boleh kosong!");
      return;
    }

    setError("");
    login();
  };

  const login = async () => {
    //login to localhost:3666/api/user the body email and password using axios then save the token to cookies
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log({ data });

      if (res.ok) {
        // Set each cookie separately with proper formatting
        document.cookie = `token=${data.body.token}; path=/`;
        document.cookie = `name=${data.body.name}; path=/`;
        document.cookie = `phone=${data.body.phone}; path=/`;

        // Dispatch an event to notify components about token change
        window.dispatchEvent(new Event("tokenUpdated"));
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <div className=" bg-neutral-800 border border-white rounded-lg p-8 w-2/5 min-w-[400px]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          LOGIN
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-lg text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-lg text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
              />
              <PasswordVisibilityToggleButton
                showPassword={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded-lg text-red-100 text-center">
              {error}
            </div>
          )}

          <FormSubmitButton text="Login" />
          <div className="text-center text-lg text-white">
            <span>Belum memiliki akun? </span>
            <a
              href="/register"
              className="underline text-white hover:text-gray-200"
            >
              Daftar sekarang
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
