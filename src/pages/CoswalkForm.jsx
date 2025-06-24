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
    const [error, setError] = useState(null);    const [hide, setHide] = useState(false);
    
    // State for drag and drop and file preview
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const navigate = useNavigate();

    // Function to get value from cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    // Function to handle file selection
    const handleFileSelect = (file) => {
        if (!file || !file.name) {
            setError('File tidak valid');
            return;
        }
        
        setSelectedFile(file);
        setValue('bukti_transfer', [file]);
        
        // Create preview for image
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Event handlers untuk drag and drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    };

    // Event handler untuk file input
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };// validasi schema Joi
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
        }),        bukti_transfer: Joi.array().min(1).required().messages({
            "array.min": "Bukti transfer harus diupload",
            "any.required": "Bukti transfer harus diupload",
        }),
    });    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({ resolver: joiResolver(schema) });// menampilkan error
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

    // useEffect untuk mengisi form dengan data dari cookies
    useEffect(() => {
        const nameFromCookie = getCookie('name');
        
        if (nameFromCookie) {
            setValue('nama_peserta', nameFromCookie);
        }
    }, [setValue]);    // fungsi untuk submit data
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
            // STEP 1: Upload transfer proof before payment
            console.log('Uploading transfer proof...');
            
            // Ensure file exists for upload
            if (!selectedFile && (!data.bukti_transfer || !data.bukti_transfer[0] || !data.bukti_transfer[0].name)) {
                setBtnClick(false);
                setError('Bukti transfer harus diupload');
                return;
            }

            const fileToUpload = selectedFile || data.bukti_transfer[0];
            
            // Validate file
            if (!fileToUpload.name) {
                setBtnClick(false);
                setError('File tidak valid. Silakan pilih file lagi.');
                return;
            }
            
            const userEmail = getCookie('email');
            
            if (!userEmail) {
                setBtnClick(false);
                setError('Email tidak ditemukan. Silakan login ulang.');
                return;
            }

            const formData = new FormData();
            formData.append('email', userEmail);
            formData.append('type', 'coswalk');
            formData.append('transferProof', fileToUpload);

            const uploadResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/transfer-proof/uploadTransferProof`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Transfer proof uploaded successfully');

            // STEP 2: Process payment after successful upload
            console.log('Processing payment...');
            const request = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/payment`
            );
            const transactionToken = request.data.transactionToken;
    
            window.snap.pay(transactionToken, {
                onSuccess: async (result) => {
                    setSuccess(null);
                    console.log('Payment successful, submitting form...');
                    
                    try {
                        // STEP 3: Submit Coswalk form after successful payment
                        await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/coswalk/new`,
                            data
                        );
                        console.log('Form submitted successfully');
    
                        setSuccess(true);
                        setError(null);
                    } catch (error) {
                        console.error('Form submission failed:', error.response?.data);
                        setSuccess(null);
                        setError(error.response?.data?.message || error.message || 'Terjadi kesalahan');
                    }
                    setBtnClick(false);
                    reset();
                    // Reset file states
                    setSelectedFile(null);
                    setFilePreview(null);
                },
                onPending: function (result) {
                    console.log('Payment pending');
                    alert("Waiting for your payment!");
                },
                onError: function (result) {
                    console.log('Payment failed');
                    alert("Payment failed!");
                    setBtnClick(false);
                },
                onClose: function () {
                    console.log('Payment popup closed');
                    alert('You closed the popup without finishing the payment');
                    setBtnClick(false);
                }
            });
        } catch (error) {
            console.error("Error in submitCoswalk:", error);
            setBtnClick(false);
            
            // Parse HTML error response untuk mendapatkan error message yang lebih baik
            let errorMessage = 'Terjadi kesalahan saat memproses';
            
            if (error.response?.data && typeof error.response.data === 'string') {
                // Extract error dari HTML response
                const htmlError = error.response.data;
                if (htmlError.includes('Proof already exists with status')) {
                    errorMessage = 'Bukti transfer sudah pernah diupload sebelumnya dan sedang dalam proses pengecekan.';
                } else if (htmlError.includes('Email is required')) {
                    errorMessage = 'Email tidak ditemukan. Silakan login ulang.';
                } else if (htmlError.includes('Invalid file type')) {
                    errorMessage = 'Tipe file tidak valid. Harap upload gambar (PNG, JPG, GIF).';
                }
            } else if (error.response?.status === 500) {
                errorMessage = 'Gagal memproses. Silakan coba lagi.';
            } else if (error.message?.includes('payment')) {
                errorMessage = 'Gagal memproses pembayaran. Silakan coba lagi.';
            }
            
            setError(errorMessage);
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
                        </label>                        <input
                            {...register("nama_peserta")}
                            disabled={btnClick}
                            type="text"
                            id="nama_peserta"
                            placeholder="Nama peserta"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br /> <br />
                        <label htmlFor="nama_panggung" className="m-2">
                            Nama panggung / Stage name
                        </label>                        <input
                            {...register("nama_panggung")}
                            disabled={btnClick}
                            type="name"
                            id="nama_panggung"
                            placeholder="Nama panggung"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]"
                        />
                        <br />                        <br />
                        <label htmlFor="insta" className="m-2">
                            Instagram
                        </label>                        <input
                            {...register("instagram")}
                            disabled={btnClick}
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
                            </p>                            <div 
                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                                    isDragging 
                                        ? 'border-yellow-400 bg-yellow-400/10' 
                                        : 'border-neutral-600'
                                }`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <div className="space-y-1 text-center">
                                    {selectedFile ? (
                                        // Preview area ketika file sudah dipilih
                                        <div className="space-y-3">
                                            {filePreview && (
                                                <img 
                                                    src={filePreview} 
                                                    alt="Preview" 
                                                    className="mx-auto h-32 w-32 object-cover rounded-lg border border-neutral-600"
                                                />
                                            )}
                                            <div className="text-sm text-green-400">
                                                <p className="font-medium">File terpilih:</p>
                                                <p className="text-neutral-300">{selectedFile.name}</p>
                                                <p className="text-neutral-400">
                                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setFilePreview(null);
                                                    setValue('bukti_transfer', null);
                                                    // Reset file input
                                                    const fileInput = document.getElementById('bukti_transfer');
                                                    if (fileInput) fileInput.value = '';
                                                }}
                                                className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                                            >
                                                Pilih file lain
                                            </button>
                                        </div>
                                    ) : (
                                        // Default upload area
                                        <>
                                            <svg className="mx-auto h-12 w-12 text-neutral-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <div className="flex text-sm text-neutral-400 justify-center">
                                                <label htmlFor="bukti_transfer" className="relative cursor-pointer bg-neutral-700 rounded-md font-medium text-yellow-400 hover:text-yellow-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-800 focus-within:ring-yellow-500 px-3 py-1">
                                                    <span>Unggah file</span>
                                                    <input 
                                                        id="bukti_transfer" 
                                                        name="bukti_transfer" 
                                                        type="file" 
                                                        className="sr-only" 
                                                        accept="image/*"
                                                        disabled={btnClick}
                                                        onChange={handleFileInputChange}
                                                    />
                                                </label>
                                                <p className="pl-1">atau tarik dan lepas</p>
                                            </div>
                                            <p className="text-xs text-neutral-500">
                                                PNG, JPG, GIF hingga 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        {success ? (
                            <>                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-100">
                                    <p>Pengajuan Coswalk Competition telah disimpan</p>
                                </div>
                            </>
                        ) : (
                            <>                                <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-0 absolute">
                                    <p>Pengajuan Coswalk Competition telah disimpan</p>
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
