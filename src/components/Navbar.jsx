import { Link, useNavigate } from "react-router-dom"; // Mengimpor modul Link dan useNavigate dari react-router-dom
import { changePage } from "../app/pageSlice"; // Mengimpor fungsi changePage dari file pageSlice.js
import { useDispatch } from "react-redux"; // Mengimpor fungsi useDispatch dari react-redux
import { useEffect, useState } from "react";

export default function Navbar() {
    // Mendefinisikan komponen Navbar
    const dispatch = useDispatch(); // Menggunakan useDispatch untuk memanggil action Redux
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi antar halaman

    const [showMenu, setShowMenu] = useState(false);
    const [showMenuTransition, setShowMenuTransition] = useState(false);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toHome = () => {
        // Fungsi untuk navigasi ke halaman Home
        dispatch(changePage(0)); // Memanggil action changePage dengan parameter 0
        navigate("/"); // Navigasi ke halaman Home
        setShowMenu(!showMenu);

    };
    const toTenant = () => {
        // Fungsi untuk navigasi ke halaman Tenant
        dispatch(changePage(1)); // Memanggil action changePage dengan parameter 1
        navigate("/tenant-conf"); // Navigasi ke halaman Tenant
        setShowMenu(!showMenu);

    };
    const toComp = () => {
        // Fungsi untuk navigasi ke halaman Competition
        dispatch(changePage(2)); // Memanggil action changePage dengan parameter 2
        navigate("/competition-select"); // Navigasi ke halaman Competition
        setShowMenu(!showMenu);

    };
    useEffect(()=>{
        setShowMenuTransition(showMenu)
    },[showMenu])

    return (
    <div className="fixed w-full z-50 bg-neutral-800/60">
        <nav className="w-11/12 mx-auto pb-2 mt-2 flex items-center justify-between">
            <div className="flex items-center">
                <img
                    src="bunkasai-logo.png"
                    className="xl:w-20 xl:h-20 w-16 h-16 object-contain mx-5"
                    alt="Logo"
                />
            </div>
            <div className="hidden md:flex items-center text-neutral-300">
                <button
                    onClick={toHome}
                    className="mx-5 text-xl font-bold transition-all hover:scale-110"
                >
                    HOME
                </button>
                <button
                    onClick={toTenant}
                    className="mx-5 text-xl font-bold transition-all hover:scale-110"
                >
                    TENANT
                </button>
                <button
                    onClick={toComp}
                    className="mx-5 text-xl font-bold transition-all hover:scale-110"
                >
                    COMPETITION
                </button>
            </div>
            <div className="md:hidden z-50">
                <img
                    src="/burger_menu.png"
                    className={`w-10 h-10 mr-4 cursor-pointer opacity-60 transition-all transform ${showMenu ? 'rotate-90' : 'rotate-0'}`}
                    alt="Menu"
                    onClick={toggleMenu}
                />
            </div>
        </nav>
        {/* Dropdown menu */}
        {showMenu && (
            <div className={`md:hidden ${showMenuTransition ? 'opacity-100': 'opacity-0' } mt-0 absolute top-16 right-0 w-full text-neutral-100 bg-neutral-800/95 shadow-md rounded-xl transition-opacity duration-300 z-50`}>
                <button
                    onClick={toHome}
                    className="block w-full py-2 text-center border-b border-neutral-500 my-4"
                >
                    HOME
                </button>
                <button
                    onClick={toTenant}
                    className="block w-full py-2 text-center border-b border-neutral-500 my-4"
                >
                    TENANT
                </button>
                <button
                    onClick={toComp}
                    className="block w-full text-center  my-4"
                >
                    COMPETITION
                </button>
            </div>
        )}
        <div className={`bg-neutral-800 opacity-0 transition-all duration-700 blur-xl -mt-20 ${showMenu ? 'h-screen w-full mx-auto opacity-80' : ''}  z-40`}>
        </div>
    </div>
);
}
