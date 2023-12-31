// Halaman ini merupakan halaman persetujuan syarat dan ketentuan

// Import beberapa package yang dibutuhkan
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TenantConf() {
    // State untuk menandakan apakah tombol tidak setuju telah ditekan
    const [disagreeClick, setDisagreeClick] = useState(false);
    // State untuk menandakan apakah tombol setuju telah ditekan
    const [agreeClick, setAgreeClick] = useState(false);
    // State untuk menentukan apakah komponen sedang dimuat
    const [load, setLoad] = useState(false);
    // Fungsi untuk navigasi antar halaman
    const navigate = useNavigate();
    // Mengambil state page dari redux store
    const page = useSelector((state) => state.page);

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        console.log(page);
        setLoad(true);
    }, []);

    // Fungsi yang dijalankan saat tombol tidak setuju ditekan
    // Fungsi ini akan mengubah nilai state disagreeClick menjadi true
    // Fungsi ini akan mengubah nilai state load menjadi false
    // Fungsi ini akan menavigasi ke halaman Home setelah 300ms
    const disagree = () => {
        setDisagreeClick(true);
        setLoad(false);
        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    // Fungsi yang dijalankan saat tombol setuju ditekan
    // Fungsi ini akan mengubah nilai state agreeClick menjadi true
    // Fungsi ini akan mengubah nilai state load menjadi false
    // Fungsi ini akan menavigasi ke halaman TenantForm setelah 300ms
    const agree = () => {
        setAgreeClick(true);
        setTimeout(() => {
            navigate("/tenant-form");
        }, 300);
        // setLoad(false);
    };

    // Mengembalikan JSX untuk render komponen
    return (
        <>
            <div className="pt-28 min-h-screen">
                <div
                    className={`${
                        disagreeClick
                            ? "translate-x-full transition-all duration-500"
                            : ""
                    } ${
                        agreeClick
                            ? page.page > page.previous
                                ? "translate-x-full transition-all duration-500"
                                : "translate-x-full transition-all duration-500"
                            : ""
                    } ${
                        page.page > page.previous
                            ? load
                                ? "-translate-x-0 transition-all duration-300"
                                : "translate-x-full"
                            : load
                            ? "translate-x-0 transition-all duration-300"
                            : "-translate-x-full"
                    } flex items-center justify-center mt-20 bg-neutral-800/80 w-4/6 mx-auto p-10 text-neutral-200 rounded-md`}
                >
                    <div className="text-center">
                        <h1 className="text-2xl mb-10">Syarat dan ketentuan</h1>
                        <p className="text-lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusantium, ex a nihi l beatae reiciendis
                            doloribus cupiditate explicabo quasi deserunt
                            quisquam impedit non corrupti modi ipsum facere sed
                            architecto? Laudantium, facilis. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Commodi iure
                            placeat accusantium sint repellendus, explicabo
                            ducimus maiores culpa vero. Expedita a ut commodi
                            vitae eveniet nobis esse iure, ducimus facilis.
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Dolorem, eos delectus incidunt earum cumque
                            nostrum voluptatibus necessitatibus alias quod,
                            nobis aliquam? Illo aliquam eos ex nesciunt neque
                            esse harum fugiat?
                        </p>
                        <button
                            onClick={disagree}
                            className="mt-5 bg-neutral-700 py-1.5 px-10 text-xl rounded-xl hover:bg-violet-500 hover:text-green-400 hover:font-bold transition-all hover:scale-110 shadow-xl"
                        >
                            Tidak setuju
                        </button>
                        <button
                            onClick={agree}
                            className="ml-5 mt-5 bg-neutral-700 py-1.5 px-10 text-xl rounded-xl hover:text-violet-500 hover:bg-green-400 hover:font-bold transition-all hover:scale-110 shadow-xl"
                        >
                            Setuju
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
