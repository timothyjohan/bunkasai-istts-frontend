// Halaman ini menampilkan form pendaftaran J-Song Competition

// Import library yang dibutuhkan
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { getAuthToken, isAuthenticated } from "../utils/authUtils";

export default function JsongForm() {
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

    const [hide, setHide] = useState(false);

    const navigate = useNavigate();

    // validasi form menggunakan joi
    // pesan error akan ditampilkan jika data yang dimasukkan tidak sesuai dengan schema
    const schema = Joi.object({
        nama_peserta: Joi.string().required().messages({
            "string.empty": "Field 'Nama peserta' harus terisi",
        }),
        telp: Joi.string()
            .pattern(/^[0-9]{10,}$/)
            .messages({
                "string.pattern.base": "Field 'No Telpon' invalid",
            })
            .required()
            .messages({
                "string.empty": "Field 'No Telpon' harus diisi",
            }),
        nama_panggung: Joi.string().required().messages({
            "string.empty": "Field 'Nama panggung/Stage name' harus terisi",
        }),
        lagu: Joi.string()
            .required()
            .pattern(new RegExp(".*-.*")) // This ensures that the string includes "-"
            .messages({
                "string.empty": "Field 'Judul dan asal lagu' harus terisi",
                "string.pattern.base":
                    "Field 'Judul dan asal lagu' diisi dengan format <judul> - <asal>",
            }),
        link: Joi.string().required().messages({
            "string.empty": `Isi field 'link' dengan "-" jika tidak ada`,
        }),
        // bukti: Joi.object().required().messages({
        //     "any.required": "deskripsi tidak boleh kosong",
        // }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: joiResolver(schema) });

    // fungsi untuk menampilkan pesan error
    const ShowErrors = () => {
        if (errors.nama_peserta) {
            setError(errors.nama_peserta.message);
        } else if (errors.telp) {
            setError(errors.telp.message);
        } else if (errors.nama_panggung) {
            setError(errors.nama_panggung.message);
        } else if (errors.lagu) {
            setError(errors.lagu.message);
        } else if (errors.link) {
            setError(errors.link.message);
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
        }, 50);
    }, []);

    useEffect(()=>{
        setTimeout(() => {
            setHide(!hide)
        }, 1000);
    },[selected])

    // fungsi untuk submit jsong
    // data yang diinputkan akan dikirim ke server
    // cara kerja:
    // 1. fungsi submitJsong akan dijalankan saat tombol submit ditekan
    // 2. fungsi submitJsong akan mengirim data ke server
    // 3. setSuccess(true) untuk menandakan bahwa data berhasil disimpan
    // 4. setError(error) untuk menandakan bahwa terjadi error
    // 5. setBtnClick(false) untuk menandakan bahwa tombol submit telah dilepas
    // 6. reset() untuk mereset form
    // 7. fungsi ShowErrors akan dijalankan
    // 8. fungsi submitJsong akan dijalankan lagi setelah 5 detik
    const submitJsong = async (data) => {
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
                            `${import.meta.env.VITE_API_URL}/api/jsong/new`,
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
                <div className="flex items-center justify-center mt-20 bg-neutral-800/80 text-sm xl:text-xl xl:w-2/6 mx-auto p-10 text-neutral-200 rounded-xl mb-44">
                    <form onSubmit={handleSubmit(submitJsong)}>
                        <h1 className="text-2xl mb-10 text-center ">
                            Form pendaftaran J-Song
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
                        <br />
                        <br />
                        <label htmlFor="telp" className="m-2">
                            Nomor telp
                        </label>
                        <input
                            {...register("telp")}
                            disabled={btnClick ? "true" : null}
                            type="phone"
                            id="telp"
                            placeholder="contoh: 0812XXXXX"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
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
                        <br />
                        <br />
                        <label htmlFor="lagu" className="m-2">
                            Judul dan asal lagu
                        </label>
                        <input
                            {...register("lagu")}
                            disabled={btnClick ? "true" : null}
                            type="title"
                            id="lagu"
                            placeholder="contoh: Unravel - Tokyo Ghoul"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
                        <label htmlFor="link" className="m-2">
                            Link lagu / instrument
                        </label>
                        <input
                            {...register("link")}
                            disabled={btnClick ? "true" : null}
                            type="title"
                            id="link"
                            placeholder="contoh: https://youtu.be/5c8MGs_8ngg?si=ZDHI9kSidmGkwbxN"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />
                        <br />
                        

                        {success ? (
                            <>
                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition duration-400 scale-100">
                                    <p>
                                        Pengajuan J-Song Competition telah
                                        disimpan
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition  duration-400 scale-0 absolute">
                                    <p>
                                        Pengajuan J-Song Competition telah
                                        disimpan
                                    </p>
                                </div>
                            </>
                        )}
                        {error ? (
                            <>
                                <div className="text-green-400  font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
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

                        {btnClick ? (
                            <button
                                type="submit"
                                disabled
                                className="w-full py-2 rounded-xl font-bold transition-all text-violet-500 bg-green-400"
                            >
                                <img
                                    src="loading.png"
                                    className="h-6 mx-auto transition-all animate-spin"
                                    alt=""
                                />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400"
                                onClick={ShowErrors}
                            >
                                Submit
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
