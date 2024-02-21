// Halaman ini merupakan halaman pengisian form untuk coswalk

// Dependency
import axios from "axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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


    // validasi schema Joi
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
        bukti: Joi.object().required().messages({
            "any.required": "Field Bukti Transfer harus terisi",
        }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: joiResolver(schema) });

    // menampilkan error
    const ShowErrors = () => {
        if (errors.nama_peserta) {
            setError(errors.nama_peserta.message);
        } else if (errors.nama_panggung) {
            setError(errors.nama_panggung.message);
        } else if (errors.instagram) {
            setError(errors.instagram.message);
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
        if (data.bukti[0]) {
            setBtnClick(true);
            try {
                const formData = new FormData();
                formData.append("nama_peserta", data.nama_peserta);
                formData.append("nama_panggung", data.nama_panggung);
                formData.append("instagram", data.instagram);
                formData.append("bukti", data.bukti[0]);
                (await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/coswalk/new`,
                    formData
                )) / setSuccess(true);
                setError(null);
            } catch (error) {
                setSuccess(null);
                setError(error);
            }
            setBtnClick(false);
            reset();
        } else {
            setError("Field 'Bukti Transfer' harus terisi");
        }
    };

    // mengembalikan JSX untuk render komponen
    return (
        <>
            {/* Transition */}
            <div
                className={`h-[200vh] h-1 bg-yellow-300 -rotate-45 xl:rotate-45 w-screen transition duration-1000 absolute z-30 
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

            <div className="pt-28 min-h-screen">
                <div className="flex items-center justify-center mt-20 bg-neutral-800/80 w-2/6 mx-auto p-10 text-neutral-200 rounded-xl">
                    
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
                        <br />
                        <br />
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
                        <label htmlFor="bukti" className="m-2">
                            Bukti Transfer
                        </label>
                        <input
                            {...register("bukti", {
                                required: "File is required",
                                validate: {
                                    validFileType: (value) => {
                                        const fileType =
                                            value[0]?.type.split("/")[0];
                                        return (
                                            fileType === "image" ||
                                            "File must be an image"
                                        );
                                    },
                                    validFileSize: (value) => {
                                        const fileSize = value[0]?.size;
                                        return (
                                            fileSize <= 1024 * 1024 * 5 ||
                                            "File size must be less than 5MB"
                                        );
                                    },
                                },
                            })}
                            disabled={btnClick ? "true" : null}
                            type="file"
                            accept="image/*"
                            id="link"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
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
