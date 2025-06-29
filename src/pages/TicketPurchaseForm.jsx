// Ticket Purchase Form Page

// Import required libraries
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Pastikan Cookies diimpor

// Fungsi autentikasi yang realistis
const isAuthenticated = () => {
    const token = Cookies.get('token'); // Mengambil token dari Cookies
    // Di aplikasi nyata, Anda mungkin juga ingin memverifikasi token ini (misalnya, apakah belum kedaluwarsa)
    return !!token; // Mengembalikan true jika token ada, false jika tidak
};

const getAuthToken = async () => {
    const token = Cookies.get('token'); // Mengambil token dari Cookies
    return token; // Mengembalikan token yang sebenarnya atau undefined jika tidak ada
};

export default function TicketPurchaseForm() {
    // State for determining if submit button has been pressed
    const [btnClick, setBtnClick] = useState(false);
    // State for determining if component is loading (currently unused in render logic)
    const [load, setLoad] = useState(false);
    // State for determining if component has been selected (used for transition)
    const [selected, setSelected] = useState(true);
    // State for determining if submission was successful
    const [success, setSuccess] = useState(null);
    // State for determining if there's an error
    const [error, setError] = useState(null);
    // State for controlling the visibility of the transition element
    const [hide, setHide] = useState(false);
    
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
            setError('File tidak valid.');
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Ukuran file melebihi batas 10MB.');
            return;
        }

        setSelectedFile(file);
        // Set the value for 'bukti_transfer' in react-hook-form
        // This is crucial for validation to see that a file has been selected
        setValue('bukti_transfer', [file]); 
        
        // Create preview for image if it's an image file
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null); // Clear preview if not an image
        }
        setError(null); // Clear any previous file-related error
    };

    // Event handlers for drag and drop functionality
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

    // Event handler for file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    // Manual validation logic for the form fields
    const validateForm = (formData) => {
        const newErrors = {};

        if (!formData.nama_pembeli) {
            newErrors.nama_pembeli = "Field 'Nama Pembeli' harus terisi";
        }
        // Ensure transfer proof is selected. It must not be uploaded alone.
        if (!selectedFile) {
            newErrors.bukti_transfer = "Bukti transfer harus diupload";
        }

        // Return the first error message found, or null if no errors
        const firstErrorKey = Object.keys(newErrors)[0];
        return firstErrorKey ? newErrors[firstErrorKey] : null;
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue, // Used to programmatically set form values, especially for files
    } = useForm();

    // Effect for initial transition
    useEffect(() => {
        setTimeout(() => {
            setSelected(false);
            setLoad(true);
        }, 50);
    }, []);

    // Effect to populate form fields from cookies on component mount (if applicable)
    useEffect(() => {
        const nameFromCookie = getCookie('name');
        if (nameFromCookie) {
            setValue('nama_pembeli', nameFromCookie);
        }
    }, [setValue]);

    // Effect to hide the transition element after a delay
    useEffect(() => {
        setTimeout(() => {
            setHide(!hide)
        }, 1000);
    },[selected]);

    // Main function to submit ticket purchase registration
    const submitTicketPurchase = async (data) => {
        // --- VALIDASI DAN AUTENTIKASI AWAL ---
        // 1. Pastikan pengguna sudah login
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }

        // 2. Lakukan validasi form lokal. Ini memastikan bukti transfer tidak diupload sendiri
        const validationErrorMessage = validateForm(data);
        if (validationErrorMessage) {
            setError(validationErrorMessage);
            return;
        }

        setBtnClick(true); // Disable button to prevent multiple submissions
        setError(null); // Clear previous errors
        setSuccess(null); // Clear previous success messages

        try {
            // STEP 1: Submit Ticket form first
            console.log('Submitting ticket form...');
            const formPayload = {
                nama_pembeli: data.nama_pembeli,
            };

            const mainFormResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/ticket/new`,
                formPayload,
                {
                    headers: {
                        "x-auth-token": await getAuthToken(), // Get token here
                    },
                }
            );
            console.log('Ticket form submitted successfully:', mainFormResponse.data);

            // STEP 2: Upload transfer proof after successful ticket submission
            console.log('Uploading transfer proof...');
            
            if (!selectedFile) { // Should already be caught by validateForm, but as a safeguard
                setBtnClick(false);
                setError('Bukti transfer harus diupload.');
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
            formData.append('type', 'ticket'); 
            formData.append('transferProof', selectedFile); 

            const uploadResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/transfer-proof/uploadTransferProof`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            );

            console.log('Transfer proof uploaded successfully:', uploadResponse.data);

            // If both steps succeed
            setSuccess(true);
            setError(null);

        } catch (err) {
            console.error("Error during ticket purchase process:", err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            setSuccess(null); // Ensure success is null if any error occurs
            
            let errorMessage = 'Terjadi kesalahan saat memproses pembelian tiket. Silakan coba lagi.';
            
            // Handle 401 Unauthorized errors from either API call
            if (err.response && err.response.status === 401) {
                errorMessage = 'Sesi Anda telah berakhir atau Anda belum login. Silakan login kembali.';
                navigate('/login'); // Navigate to login page
            } else if (err.response?.data?.message) { // Check for JSON error message
                errorMessage = err.response.data.message;
            } else if (err.response?.data && typeof err.response.data === 'string') {
                const htmlError = err.response.data;
                if (htmlError.includes('Proof already exists with status')) {
                    errorMessage = 'Bukti transfer sudah pernah diupload sebelumnya dan sedang dalam proses pengecekan.';
                } else if (htmlError.includes('Email is required')) {
                    errorMessage = 'Email tidak ditemukan. Silakan login ulang.';
                } else if (htmlError.includes('Invalid file type')) {
                    errorMessage = 'Tipe file tidak valid. Harap upload gambar (PNG, JPG, GIF).';
                }
            } else if (err.message?.includes('Network Error')) {
                errorMessage = 'Koneksi jaringan terputus atau server tidak merespons.';
            } else if (err.response?.status === 500) {
                errorMessage = 'Gagal memproses. Terjadi kesalahan server internal. Silakan coba lagi.';
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setBtnClick(false);
            reset();
            // Reset file states
            setSelectedFile(null);
            setFilePreview(null);
            setValue('bukti_transfer', null); 
            const fileInput = document.getElementById('bukti_transfer');
            if (fileInput) fileInput.value = ''; 
        }
    };
    
    // Inlined SubmitButton component logic
    const InlinedSubmitButton = ({ btnClick }) => {
        return (
            <button
                type="submit"
                disabled={btnClick}
                className={`w-full py-2 px-4 rounded-xl text-neutral-800 font-semibold transition duration-300 ${
                    btnClick ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"
                }`}
            >
                {btnClick ? "Loading..." : "Submit"}
            </button>
        );
    };

    // Render component JSX
    return (
        <>
            {/* Transition Element */}
            <div
                className={`h-[200vh] md:h-[100vh] bg-yellow-300 -rotate-45 xl:rotate-45 w-[150vw] md:w-[100vw] transition duration-1000 absolute z-30 
                ${
                    selected
                        ? "scale-150 translate-x-0 -translate-y-0"
                        : "scale-0 -translate-x-full translate-y-full"
                }
                ${hide ? "hidden" : ""}
                `}
            ></div>
            {/* End Transition Element */}

            <div className="pt-28 min-h-screen mb-44">
                <div className="flex items-center justify-center mt-20 bg-neutral-800/80 text-sm xl:text-xl xl:w-2/6 mx-auto p-10 text-neutral-200 rounded-xl mb-44">
                    <form onSubmit={handleSubmit(submitTicketPurchase)} className="w-full">
                        <h1 className="text-2xl mb-10 text-center ">
                            Form Pembelian Tiket
                        </h1>
                        <label htmlFor="nama_pembeli" className="m-2 block">
                            Nama Pembeli
                        </label>
                        <input
                            {...register("nama_pembeli")}
                            disabled={btnClick}
                            type="text"
                            id="nama_pembeli"
                            placeholder="Nama Lengkap Pembeli"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
                        />
                        
                        {/* Upload Bukti Transfer Section */}
                        <div>
                            <label htmlFor="bukti_transfer" className="block m-2">
                                Upload Bukti Transfer
                            </label>
                            <p className="text-xs text-neutral-400 mt-2 mb-4 mx-2">
                                Contoh : 
                                <br />
                                Transfer biaya tiket sebesar Rp 30.000 per tiket <br />
                                ke: BCA: 1234567890 a.n. Bunkasai ISTTS<br />
                            </p>
                            <div 
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
                                        // Preview area when file is selected
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
                                                    setValue('bukti_transfer', null); // Clear hook-form value
                                                    // Reset file input element value
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

                        {/* Success and Error Messages */}
                        {success && (
                            <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-100">
                                <p>Pembelian tiket telah disimpan</p>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500 text-white font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-100">
                                <p> {error} </p>
                            </div>
                        )}

                        {/* Submit Button Component (Inlined) */}
                        <InlinedSubmitButton btnClick={btnClick} />
                    </form>
                </div>
            </div>
        </>
    );
}
