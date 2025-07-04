import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

// Mocking authUtils functions as they cannot be resolved in this environment.
// Dalam aplikasi nyata, ini akan diimpor dengan benar dari "../utils/authUtils".
const isAuthenticated = () => {
    const token = Cookies.get('token');
    return !!token; // Menganggap pengguna terautentikasi jika ada token
};

const getAuthToken = async () => {
    // Dalam aplikasi nyata, ini akan mengambil token autentikasi yang sebenarnya
    return Cookies.get('token') || "dummy-auth-token-123"; // Mengembalikan token dari cookie atau token dummy
};

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jsongData, setJsongData] = useState([]);
    const [coswalkData, setCoswalkData] = useState([]);
    const [ticketData, setTicketData] = useState([]);
    const [yonkomaData, setYonkomaData] = useState([]); // State for Yonkoma data
    const [cosplayData, setCosplayData] = useState([]); // State for Cosplay Competition data
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated()) {
                navigate("/login");
                return;
            }

            const email = Cookies.get('email'); // Mengambil email dari cookie
            if (!email) {
                setError("Email pengguna tidak ditemukan. Harap login kembali.");
                setLoading(false);
                return;
            }
            setUserEmail(email);
            const token = await getAuthToken();

            // Use Promise.allSettled to fetch all data concurrently
            const results = await Promise.allSettled([
                axios.get(`${import.meta.env.VITE_API_URL}/api/jsong/email/${email}`, { headers: { "x-auth-token": token } }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/coswalk/email/${email}`, { headers: { "x-auth-token": token } }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/ticket/email/${email}`, { headers: { "x-auth-token": token } }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/yonkoma/email/${email}`, { headers: { "x-auth-token": token } }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/cosplay-competition/email/${email}`, { headers: { "x-auth-token": token } })
            ]);

            // Process J-Song data
            if (results[0].status === 'fulfilled') {
                const data = results[0].value.data;
                setJsongData(Array.isArray(data) ? data : [data].filter(Boolean));
            } else {
                console.error("Error fetching J-Song data:", results[0].reason);
            }

            // Process Coswalk data
            if (results[1].status === 'fulfilled') {
                const data = results[1].value.data;
                setCoswalkData(Array.isArray(data) ? data : [data].filter(Boolean));
            } else {
                console.error("Error fetching Coswalk data:", results[1].reason);
            }

            // Process Ticket data
            if (results[2].status === 'fulfilled') {
                const data = results[2].value.data;
                setTicketData(Array.isArray(data) ? data : [data].filter(Boolean));
            } else {
                console.error("Error fetching Ticket data:", results[2].reason);
            }
            
            // Process Yonkoma data
            if (results[3].status === 'fulfilled') {
                const data = results[3].value.data;
                setYonkomaData(Array.isArray(data) ? data : [data].filter(Boolean));
            } else {
                console.error("Error fetching Yonkoma data:", results[3].reason);
            }

            // Process Cosplay Competition data
            if (results[4].status === 'fulfilled') {
                const data = results[4].value.data;
                setCosplayData(Array.isArray(data) ? data : [data].filter(Boolean));
            } else {
                console.error("Error fetching Cosplay Competition data:", results[4].reason);
            }

            setLoading(false);
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-300">
                <p>Memuat data profil...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-red-500">
                <p>Terjadi kesalahan: {error}</p>
            </div>
        );
    }

    return (
        <div className="pt-28 min-h-screen bg-neutral-900 text-neutral-300 p-4">
            <div className="max-w-4xl mx-auto bg-neutral-800/80 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">Profil Pengguna</h1>
                <p className="text-center text-lg mb-8">Selamat datang, {userEmail || 'Pengguna'}!</p>

                {/* Bagian J-Song */}
                {jsongData.length > 0 && (
                    <div className="mb-10 p-6 bg-neutral-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Pendaftaran J-Song</h2>
                        {jsongData.map((entry, index) => (
                            <div key={index} className="bg-neutral-600 p-4 rounded-md mb-4 last:mb-0">
                                <p><span className="font-medium">Nama Peserta:</span> {entry.nama_peserta}</p>
                                <p><span className="font-medium">Nama Panggung:</span> {entry.nama_panggung}</p>
                                <p><span className="font-medium">Judul Lagu:</span> {entry.lagu}</p>
                                <p><span className="font-medium">Status:</span> {entry.status ? <span className="text-green-400">Dikonfirmasi</span> : <span className="text-yellow-400">Menunggu Verifikasi</span>}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bagian Coswalk */}
                {coswalkData.length > 0 && (
                    <div className="mb-10 p-6 bg-neutral-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Pendaftaran Coswalk</h2>
                        {coswalkData.map((entry, index) => (
                            <div key={index} className="bg-neutral-600 p-4 rounded-md mb-4 last:mb-0">
                                <p><span className="font-medium">Nama Peserta:</span> {entry.nama_peserta}</p>
                                <p><span className="font-medium">Nama Panggung:</span> {entry.nama_panggung}</p>
                                <p><span className="font-medium">Instagram:</span> {entry.instagram}</p>
                                <p><span className="font-medium">Status:</span> {entry.status ? <span className="text-green-400">Dikonfirmasi</span> : <span className="text-yellow-400">Menunggu Verifikasi</span>}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bagian Yonkoma */}
                {yonkomaData.length > 0 && (
                    <div className="mb-10 p-6 bg-neutral-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Pendaftaran Lomba Yonkoma</h2>
                        {yonkomaData.map((entry, index) => (
                            <div key={index} className="bg-neutral-600 p-4 rounded-md mb-4 last:mb-0">
                                <p><span className="font-medium">Nama Peserta:</span> {entry.nama_peserta}</p>
                                <p><span className="font-medium">No. Telepon:</span> {entry.telp}</p>
                                <p><span className="font-medium">Status:</span> {entry.status ? <span className="text-green-400">Dikonfirmasi</span> : <span className="text-yellow-400">Menunggu Verifikasi</span>}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bagian Cosplay Competition */}
                {cosplayData.length > 0 && (
                    <div className="mb-10 p-6 bg-neutral-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Pendaftaran Cosplay Competition</h2>
                        {cosplayData.map((entry, index) => (
                            <div key={index} className="bg-neutral-600 p-4 rounded-md mb-4 last:mb-0">
                                <p><span className="font-medium">Nama Ketua:</span> {entry.nama_peserta}</p>
                                <p><span className="font-medium">Nama Kelompok:</span> {entry.nama_kelompok}</p>
                                <p><span className="font-medium">No. Telepon:</span> {entry.telp}</p>
                                <p><span className="font-medium">Status:</span> {entry.status ? <span className="text-green-400">Dikonfirmasi</span> : <span className="text-yellow-400">Menunggu Verifikasi</span>}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bagian Tiket */}
                {ticketData.length > 0 && (
                    <div className="p-6 bg-neutral-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Pembelian Tiket</h2>
                        {ticketData.map((entry, index) => (
                            <div key={index} className="bg-neutral-600 p-4 rounded-md mb-4 last:mb-0">
                                <p><span className="font-medium">Nama Pembeli:</span> {entry.nama_pembeli}</p>
                                <p><span className="font-medium">Status:</span> {entry.status ? <span className="text-green-400">Dikonfirmasi</span> : <span className="text-yellow-400">Menunggu Verifikasi</span>}</p>
                                <p className="mt-2"><span className="font-medium">ULID Tiket:</span></p>
                                <div className="bg-white p-4 rounded-md flex justify-center items-center">
                                    {entry.qrCode ? (
                                        <img 
                                            src={entry.qrCode} 
                                            alt={`QR Code for ${entry.ulid}`} 
                                            className="w-32 h-32 object-contain"
                                        />
                                    ) : (
                                        <p className="text-black text-sm">QR Code tidak tersedia.</p>
                                    )}
                                </div>
                                <div className="text-center mt-2 text-sm break-all text-black bg-white p-2 rounded-md">{entry.ulid}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tampilkan pesan jika tidak ada data sama sekali */}
                {jsongData.length === 0 && coswalkData.length === 0 && ticketData.length === 0 && yonkomaData.length === 0 && cosplayData.length === 0 && (
                    <p className="text-center text-neutral-400 mt-8">Tidak ada data pendaftaran atau pembelian tiket yang ditemukan.</p>
                )}
            </div>
        </div>
    );
}
