import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email tidak boleh kosong!");
      return;
    }

    if (!password.trim()) {
      setError("Password tidak boleh kosong!");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Konfirmasi password tidak boleh kosong!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama!");
      return;
    }

    if (!name.trim()) {
      setError("Nama tidak boleh kosong!");
      return;
    }
    if (!phoneNumber.trim()) {
      setError("Nomor telepon tidak boleh kosong!");
      return;
    }

    setError("");
    register();
  };

  const register = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name,
            phone_number: phoneNumber,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        navigate("/login");
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
      <div className="mt-20 bg-neutral-800 border border-white rounded-lg p-8 w-2/5 min-w-[400px]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          REGISTER
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-white"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-lg text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-white"
            >
              Nomor Telepon
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-lg text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
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
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-white"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-lg text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded-lg text-red-100 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-3 py-3 mt-2 mb-4 text-lg text-white bg-transparent border border-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Register
          </button>
          <div className="text-center text-lg text-white">
            <span>Sudah memiliki akun? </span>
            <a
              href="/login"
              className="underline text-white hover:text-gray-200"
            >
              Login sekarang
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
