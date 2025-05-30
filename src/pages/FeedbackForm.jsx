// Komponen untuk menampilkan form feedback

// Import library yang dibutuhkan
import axios from "axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton"; // Import the SubmitButton component

export default function FeedbackForm() {
    // State untuk menentukan apakah tombol submit telah ditekan
    const [btnClick, setBtnClick] = useState(false);
    // State untuk menentukan apakah komponen sedang dimuat
    const [load, setLoad] = useState(false);
    // State untuk menentukan apakah komponen telah dipilih
    const [selected, setSelected] = useState(true);
    // State untuk menentukan apakah berhasil submit
    const [success, setSuccess] = useState(null);
    // State untuk menentukan apakah terjadi error
    const [error, setError] = useState(null);

    // validasi form menggunakan joi
    // pesan error akan ditampilkan jika data yang dimasukkan tidak sesuai dengan schema
    const schema = Joi.object({
        kritik: Joi.string().required().messages({
            "string.empty": "Field 'Kritik' harus terisi",
        }),
        saran: Joi.string().required().messages({
            "string.empty": "Field 'Saran' harus terisi",
        }),
        pesan: Joi.string().required().messages({
            "string.empty": "Field 'Pesan' harus terisi",
        }),
        kesan: Joi.string().required().messages({
            "string.empty": "Field 'Kesan' harus terisi",
        }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: joiResolver(schema) });

    // fungsi untuk menampilkan pesan error
    const ShowErrors = () => {
        if (errors.kritik) {
            setError(errors.kritik.message);
        } else if (errors.saran) {
            setError(errors.saran.message);
        } else if (errors.pesan) {
            setError(errors.pesan.message);
        } else if (errors.kesan) {
            setError(errors.kesan.message);
        }
    };

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        ShowErrors();
    }, [errors]);

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        setTimeout(() => {
            setSelected(false);
            setLoad(true);
        }, 0);
    }, []);

    // fungsi untuk submit feedback
    // cara kerja fungsi:
    // 1. setBtnClick(true) untuk menandakan bahwa tombol submit telah ditekan
    // 2. axios.post untuk mengirim data ke backend
    // 3. setSuccess(true) untuk menandakan bahwa data berhasil disimpan
    // 4. setError(error) untuk menandakan bahwa terjadi error
    // 5. setBtnClick(false) untuk menandakan bahwa tombol submit telah dilepas
    // 6. reset() untuk mereset form
    const submitFeedback = async (data) => {
        setBtnClick(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/feedback/new`,
                data
            );
            setSuccess(true);
            setError(null);
        } catch (error) {
            setSuccess(null);
            setError(error);
        }
        setBtnClick(false);
        reset();
    };

    // Mengembalikan JSX untuk render komponen
    return (
        <>
            {/* Transition */}
            {/* <div style={{height: '110vh'}} className={`bg-yellow-300 rotate-45 h-screen w-screen rounded-xl transition duration-1000 absolute z-30 ${selected ? 'scale-150 translate-x-0 -translate-y-0' : 'scale-0 -translate-x-full translate-y-full'}  `}>
      </div> */}

            <div className="pt-28 min-h-screen">
                <div className="flex items-center justify-center mt-20 bg-neutral-800/80 w-1/3 mx-auto p-10 text-neutral-200 rounded-xl">
                    <form onSubmit={handleSubmit(submitFeedback)}>
                        <h1 className="text-2xl mb-10 text-center">
                            Form Feedback
                        </h1>
                        <label htmlFor="kritik" className="m-2">
                            Kritik
                        </label>
                        <input
                            {...register("kritik")}
                            disabled={btnClick ? "true" : null}
                            type="text"
                            id="kritik"
                            placeholder="Kritik"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br /> <br />
                        <label htmlFor="saran" className="m-2">
                            Saran
                        </label>
                        <input
                            {...register("saran")}
                            disabled={btnClick ? "true" : null}
                            type="name"
                            id="saran"
                            placeholder="Saran"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
                        <label htmlFor="pesan" className="m-2">
                            Pesan
                        </label>
                        <input
                            {...register("pesan")}
                            disabled={btnClick ? "true" : null}
                            type="title"
                            id="pesan"
                            placeholder="Pesan"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
                        <label htmlFor="kesan" className="m-2">
                            Kesan
                        </label>
                        <input
                            {...register("kesan")}
                            disabled={btnClick ? "true" : null}
                            type="text"
                            placeholder="Kesan"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
                        {success ? (
                            <>
                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition duration-400 scale-100">
                                    <p>Feedback telah disimpan</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition  duration-400 scale-0 absolute">
                                    <p>Feedback telah disimpan</p>
                                </div>
                            </>
                        )}
                        {error ? (
                            <>
                                <div className="text-green-400 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
                                    <p> {error} </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-green-400 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-0 absolute">
                                    <p> {error} </p>
                                </div>
                            </>
                        )}
                        <SubmitButton btnClick={btnClick} ShowErrors={ShowErrors} />
                    </form>
                </div>
            </div>
        </>
    );
}
