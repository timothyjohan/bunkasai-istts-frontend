import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordVisibilityToggleButton from "../components/PasswordVisibilityToggleButton";
import FormSubmitButton from "../components/FormSubmitButton";

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
              <PasswordVisibilityToggleButton
                showPassword={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
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
              <PasswordVisibilityToggleButton
                showPassword={showConfirmPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded-lg text-red-100 text-center">
              {error}
            </div>
          )}

          <FormSubmitButton text="Register" />
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
