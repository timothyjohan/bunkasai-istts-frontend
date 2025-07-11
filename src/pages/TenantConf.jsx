// Halaman ini merupakan halaman persetujuan syarat dan ketentuan

// Import beberapa package yang dibutuhkan
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AgreementButton from "../components/AgreementButton"; // Import the new component

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
            <div className="pt-28 min-h-screen mb-44">
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
                                ? "xl:-translate-x-0 xl:transition-all duration-300"
                                : "xl:translate-x-full"
                            : load
                            ? "xl:translate-x-0 xl:transition-all duration-300"
                            : "xl:-translate-x-full"
                    } flex items-center justify-center mt-20 bg-neutral-800/80 text-sm xl:text-xl xl:w-4/6 mx-auto p-10 text-neutral-200 rounded-md`}
                >
                    <div className="text-center">
                        <h1 className="xl:text-2xl text-xl font-bold mb-10">Syarat dan ketentuan</h1>
                        <p className="xl:text-lg text-sm text-justify w-5/6 mx-auto mb-5">
                            <li>Halaman ini adalah halaman pendaftaran tenant untuk acara BUNKASAI ISTTS.</li> 
                            <br />
                            <li>Dengan mengisi formulir ini, Anda setuju untuk memberikan informasi kontak yang valid.</li>
                            <br />
                            <li>Kami akan menghubungi Anda lebih lanjut melalui nomor telepon yang Anda berikan.</li>
                            <br />
                            <li>Informasi yang Anda berikan akan digunakan untuk memberikan informasi lebih lanjut dan tindak lanjut terkait pendaftaran Anda.</li>
                            <br />
                            <li>Dengan menekan tombol 'Setuju', Anda menyetujui untuk menerima komunikasi dari kami melalui nomor telepon yang Anda berikan.</li>
                            <br />
                            <li>Kami berhak untuk menghubungi Anda menggunakan nomor telepon yang Anda sediakan untuk keperluan administratif terkait acara BUNKASAI ISTTS.</li>
                            <br />
                            <li>Informasi kontak yang Anda berikan akan diperlakukan secara rahasia dan tidak akan dibagikan kepada pihak ketiga tanpa izin Anda.</li>
                        </p>
                        <AgreementButton
                            onClick={disagree}
                            text="Tidak setuju"
                        />
                        <AgreementButton
                            onClick={agree}
                            text="Setuju"
                            additionalClasses="xl:ml-5"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
