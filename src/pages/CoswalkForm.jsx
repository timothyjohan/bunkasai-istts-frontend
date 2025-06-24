// Halaman ini merupakan halaman pengisian form untuk coswalk

// Dependency
import axios from "axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuthToken, isAuthenticated } from "../utils/authUtils";
import SubmitButton from "../components/SubmitButton"; // Import the SubmitButton component

export default function CoswalkForm() {
    // State untuk menentukan apakah komponen telah dipilih
    const [btnClick, setBtnClick] = useState(false);
    // State untuk menentukan apakah komponen sedang dimuat
    const [load, setLoad] = useState(false);
    // State untuk menentukan apakah komponen telah dipilih
    const [selected, setSelected] = useState(true);
    // State untuk menentukan apakah berhasil submit
    const [success, setSuccess] = useState(null);
    // State untuk menentukan status error
    const [error, setError] = useState(null);

    const [hide, setHide] = useState(false);

    const navigate = useNavigate();    // validasi schema Joi
    // pesan error akan ditampilkan jika data yang dimasukkan tidak sesuai dengan schema
    const schema = Joi.object({
        nama_peserta: Joi.string().required().messages({
            "string.empty": "Field 'Nama peserta' harus terisi",
        }),
        nama_panggung: Joi.string().required().messages({
            "string.empty": "Field 'Nama panggung/Stage name' harus terisi",
        }),
        instagram: Joi.string().required().regex(/^@/).messages({
            "string.empty": "Field 'Instagram' harus terisi",
            "string.pattern.base": "Field 'Instagram' harus diawali dengan '@'",
        }),
        bukti_transfer: Joi.any().required().messages({
            "any.required": "Bukti transfer harus diupload",
        }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: joiResolver(schema) });    // menampilkan error
    const ShowErrors = () => {
        if (errors.nama_peserta) {
            setError(errors.nama_peserta.message);
        } else if (errors.nama_panggung) {
            setError(errors.nama_panggung.message);
        } else if (errors.instagram) {
            setError(errors.instagram.message);
        } else if (errors.bukti_transfer) {
            setError(errors.bukti_transfer.message);
        }
    };

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        ShowErrors();
    }, [errors]);

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
            setSelected(false);
        }, 50);
    }, []);

    useEffect(()=>{
        setTimeout(() => {
            setHide(!hide)
        }, 1000);
    },[selected])

    // fungsi untuk submit data
    // cara kerja:
    // 1. setBtnClick(true) untuk mengubah state btnClick menjadi true
    // 2. try catch untuk mengirim data ke API
    // 3. setSuccess(true) untuk mengubah state success menjadi true
    // 4. setError(null) untuk mengubah state error menjadi null
    // 5. setBtnClick(false) untuk mengubah state btnClick menjadi false
    // 6. reset() untuk mereset form
    const submitCoswalk = async (data) => {
        if (!isAuthenticated()) navigate("/login");
        setBtnClick(true);
        try {
            const request = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/payment`
            );
            const transactionToken = request.data.transactionToken;
            console.log(transactionToken);
    
            window.snap.pay(transactionToken, {
                onSuccess: async (result) => {
                    /* You may add your own implementation here */
                    setSuccess(null);
                    console.log(result);
                    try {
                        
                        await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/coswalk/new`,
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
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("Waiting for your payment!");
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("Payment failed!");
                    console.log(result);
                    setBtnClick(false);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert('You closed the popup without finishing the payment');
                    setBtnClick(false);
                }
            });
        } catch (error) {
            console.error("Error fetching transaction token:", error);
            // Handle error
        }
    };

    // mengembalikan JSX untuk render komponen
    return (
        <>
            {/* Transition */}
            <div
                className={`h-[200vh] md:h-[100vh] bg-yellow-300 -rotate-45 xl:rotate-45 w-[150vw] md:w-[100vw] transition duration-1000 absolute z-30 
                ${
                    selected
                        ? "scale-150 translate-x-0 -translate-y-0"
                        : "scale-0 -translate-x-full translate-y-full"
                }  
                ${
                    hide
                    ? "hidden"
                    : ""
                }
                `}
            ></div>
            {/*  */}

            <div className="pt-28 min-h-screen mb-44">
                <div className="flex items-center justify-center mt-20 bg-neutral-800/80 text-sm xl:text-xl xl:w-2/6 mx-auto p-10 text-neutral-200 rounded-xl">
                    
                    <form onSubmit={handleSubmit(submitCoswalk)}>
                        <h1 className="text-2xl mb-10 text-center">
                            Form pendaftaran Coswalk
                        </h1>
                        <label htmlFor="nama_peserta" className="m-2">
                            Nama peserta
                        </label>
                        <input
                            {...register("nama_peserta")}
                            disabled={btnClick ? "true" : null}
                            type="text"
                            id="nama_peserta"
                            placeholder="Nama peserta"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br /> <br />
                        <label htmlFor="nama_panggung" className="m-2">
                            Nama panggung / Stage name
                        </label>
                        <input
                            {...register("nama_panggung")}
                            disabled={btnClick ? "true" : null}
                            type="name"
                            id="nama_panggung"
                            placeholder="Nama panggung"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />                        <br />
                        <label htmlFor="insta" className="m-2">
                            Instagram
                        </label>
                        <input
                            {...register("instagram")}
                            disabled={btnClick ? "true" : null}
                            type="title"
                            id="insta"
                            placeholder="contoh: @bunkasaiistts"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
                        
                        {/* Upload Bukti Transfer */}
                        <div>
                            <label htmlFor="bukti_transfer" className="block m-2">
                                Upload Bukti Transfer
                            </label>
                            <p className="text-xs text-neutral-400 mt-2 mb-4 mx-2">
                                Contoh : 
                                <br />
                                Transfer biaya pendaftaran sebesar Rp 50.000 <br />
                                ke: BCA: 1234567890 a.n. Bunkasai ISTTS<br />
                            </p>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-600 border-dashed rounded-lg">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-neutral-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <div className="flex text-sm text-neutral-400 justify-center">
                                        <label htmlFor="bukti_transfer" className="relative cursor-pointer bg-neutral-700 rounded-md font-medium text-yellow-400 hover:text-yellow-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-800 focus-within:ring-yellow-500 px-3 py-1">
                                            <span>Unggah file</span>
                                            <input 
                                                {...register("bukti_transfer")}
                                                id="bukti_transfer" 
                                                name="bukti_transfer" 
                                                type="file" 
                                                className="sr-only" 
                                                accept="image/*"
                                                disabled={btnClick ? "true" : null}
                                            />
                                        </label>
                                        <p className="pl-1">atau tarik dan lepas</p>
                                    </div>
                                    <p className="text-xs text-neutral-500">
                                        PNG, JPG, GIF hingga 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        {success ? (
                            <>
                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition duration-400 scale-100">
                                    <p>Pengajuan tenant telah disimpan</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition  duration-400 scale-0 absolute">
                                    <p>Pengajuan tenant telah disimpan</p>
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
