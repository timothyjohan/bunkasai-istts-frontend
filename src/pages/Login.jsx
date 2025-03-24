import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!username.trim() || !password.trim()) {
            setError('Username dan password tidak boleh kosong!');
            return;
        }
        
        setError('');
        login()
    };

    const login = async () => {
        //login to localhost:3666/api/user the body username and password using axios then save the token to cookies
        try {
            const res = await fetch('http://localhost:3666/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            console.log({data});

            if (res.ok) {
                document.cookie = `token=${data.body.token}; path=/`;
                // Dispatch an event to notify components about token change
                window.dispatchEvent(new Event('tokenUpdated'));
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong!');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-transparent">
            <div className="bg-transparent border border-white rounded-lg p-8 w-2/5 min-w-[400px]">
                <h1 className="text-3xl font-bold text-center text-white mb-6">LOGIN</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="username"
                            className="block text-lg font-medium text-white"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
                        Login
                    </button>
                    <div className="text-center text-lg text-white">
                        <span>Belum memiliki akun? </span>
                        <a href="/register" className="underline text-white hover:text-gray-200">Daftar sekarang</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
