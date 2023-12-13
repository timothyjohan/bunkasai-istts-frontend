import { Link, useNavigate } from "react-router-dom"; // Mengimpor modul Link dan useNavigate dari react-router-dom
import { changePage } from "../app/pageSlice"; // Mengimpor fungsi changePage dari file pageSlice.js
import { useDispatch } from "react-redux"; // Mengimpor fungsi useDispatch dari react-redux

export default function Navbar() {
    // Mendefinisikan komponen Navbar
    const dispatch = useDispatch(); // Menggunakan useDispatch untuk memanggil action Redux
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi antar halaman

    const toHome = () => {
        // Fungsi untuk navigasi ke halaman Home
        dispatch(changePage(0)); // Memanggil action changePage dengan parameter 0
        navigate("/"); // Navigasi ke halaman Home
    };
    const toTenant = () => {
        // Fungsi untuk navigasi ke halaman Tenant
        dispatch(changePage(1)); // Memanggil action changePage dengan parameter 1
        navigate("/tenant-conf"); // Navigasi ke halaman Tenant
    };
    const toComp = () => {
        // Fungsi untuk navigasi ke halaman Competition
        dispatch(changePage(2)); // Memanggil action changePage dengan parameter 2
        navigate("/competition-select"); // Navigasi ke halaman Competition
    };

    return (
        // Mengembalikan JSX untuk render komponen
        <>
            <div className="fixed w-full z-20">
                <nav className="w-11/12 mx-auto p-2 mt-2 flex items-center justify-between ">
                    <div className="flex items-center">
                        <img
                            src="bunkasai-logo.png"
                            className="w-20 h-20 object-contain mx-5"
                        />
                    </div>
                    <div className="flex items-center text-neutral-300">
                        <button
                            onClick={toHome}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className=" ">HOME</button>
                        </button>
                        <button
                            onClick={toTenant}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className=" ">TENANT</button>
                        </button>
                        <button
                            onClick={toComp}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className="">COMPETITION</button>
                        </button>
                    </div>
                </nav>
                {/* <hr className="border-neutral-200 border-solid w-11/12 mx-auto " /> */}
            </div>
        </>
    );
}
