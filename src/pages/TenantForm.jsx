// Halaman ini merupakan halaman pengisian form untuk tenant

// Import beberapa package yang dibutuhkan
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import ReCAPTCHA from "react-google-recaptcha";

export default function TenantForm() {
    // State untuk menentukan apakah tombol tidak setuju telah ditekan
    const [disagreeClick, setDisagreeClick] = useState(false);
    // State untuk menentukan apakah tombol ditekan
    const [btnClick, setBtnClick] = useState(false);
    // State untuk menentukan apakah berhasil submit
    const [success, setSuccess] = useState(null);
    // State untuk menentukan apakah terjadi error
    const [error, setError] = useState(null);
    // const{register, handleSubmit, reset} = useForm()
    // State untuk menentukan apakah komponen sedang dimuat
    const [load, setLoad] = useState(false);
    // Fungsi untuk navigasi antar halaman
    const navigate = useNavigate();
    const [captcha, setCaptcha] = useState(false);

    // validasi schema Joi
    // pesan error akan ditampilkan jika data yang dimasukkan tidak sesuai dengan schema
    const schema = Joi.object({
        nama_tenant: Joi.string().required().messages({
            "string.empty": "Nama tenant is required",
        }),
        nama_cp: Joi.string().required().messages({
            "string.empty": "Nama contact person is required",
        }),
        telp: Joi.number()
            .integer()
            .messages({
                "number.base": "No Telpon harus berupa angka",
                "number.integer": "No Telpon harus berupa angka bulat",
            })
            .custom((value, helpers) => {
                const isNumeric = /^[0-9]+$/.test(value);
                if (isNumeric) {
                    return value;
                } else {
                    return helpers.message({
                        "string.pattern.base":
                            "No Telpon tidak boleh mengandung simbol",
                    });
                }
            })
            .required()
            .messages({
                "any.required": "No Telpon is required",
            }),
        alamat: Joi.string().required().messages({
            "string.empty": "Alamat is required",
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
        if (errors.nama_tenant) {
            setError(errors.nama_tenant.message);
        } else if (errors.nama_cp) {
            setError(errors.nama_cp.message);
        } else if (errors.telp) {
            setError(errors.telp.message);
        } else if (errors.alamat) {
            setError(errors.alamat.message);
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
        }, 0);
    }, []);

    // fungsi untuk submit tenant
    // data yang diinputkan akan dikirim ke API
    // cara kerja:
    // 1. fungsi submitTenant akan dijalankan saat tombol submit ditekan
    // 2. setBtnClick(true) untuk menandakan bahwa tombol submit telah ditekan
    // 3. axios.post untuk mengirim data ke backend
    // 4. setSuccess(true) untuk menandakan bahwa data berhasil disimpan
    // 5. setError(error) untuk menandakan bahwa terjadi error
    // 6. setBtnClick(false) untuk menandakan bahwa tombol submit telah dilepas
    // 7. reset() untuk mereset form
    // 8. navigate("/tenant-conf") untuk navigasi ke halaman TenantConf
    // 9. setTimeout untuk menunggu 300ms sebelum navigasi ke halaman TenantConf
    const submitTenant = async (data) => {
        setBtnClick(true);
        if(captcha){
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/tenants/new`,
                    data
                );
                setSuccess(true);
                setError(null);
            } catch (error) {
                setSuccess(null);
                setError(error);
            }
        }else{
            setError("Please complete captcha")
        }
        setBtnClick(false);
        reset();
    };

    // Mengembalikan JSX untuk render komponen
    return (
        <>
            <div className="pt-28 min-h-screen mb-44">
                <div
                    className={`${
                        disagreeClick
                            ? "-translate-x-full transition-all duration-300"
                            : ""
                    } ${
                        load
                            ? "-translate-x-0 transition-all duration-300"
                            : "translate-x-[100vw]"
                    } flex items-center justify-center mt-20 bg-neutral-800/80 text-sm xl:text-xl xl:w-2/6 mx-auto p-10 text-neutral-200 rounded-xl`}
                >
                    <div className="">
                        <form onSubmit={handleSubmit(submitTenant)}>
                            <h1 className="text-2xl mb-10 text-center">
                                Form pendaftaran Tenant
                            </h1>
                            <label htmlFor="nama_tenant" className="m-2">
                                Nama tenant
                            </label>
                            <input
                                {...register("nama_tenant")}
                                disabled={btnClick ? "true" : null}
                                type="text"
                                id="nama_tenant"
                                placeholder="Nama Tenant"
                                className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                            />
                            <br /> <br />
                            <label htmlFor="nama_cp" className="m-2">
                                Nama contact person
                            </label>
                            <input
                                {...register("nama_cp")}
                                disabled={btnClick ? "true" : null}
                                type="text"
                                id="nm_cp"
                                placeholder="Nama contact person"
                                className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                            />
                            <br /> <br />
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
                            <label htmlFor="alamat" className="m-2">
                                Alamat
                            </label>
                            <input
                                {...register("alamat")}
                                disabled={btnClick ? "true" : null}
                                type="address"
                                id="alamat"
                                placeholder="contoh: Jl. Ngagel Jaya Tengah No.73-77"
                                className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02] mb-10 "
                            />
                            <ReCAPTCHA
                                className=""
                                sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                                onChange={captchaConf}
                            />
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
            </div>
        </>
    );
}
