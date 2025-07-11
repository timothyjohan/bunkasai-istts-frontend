// Coswalk Competition Registration Form Page

// Import required libraries
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Joi and joiResolver imports are removed as they cannot be resolved in this environment.
// import Joi from "joi";
// import { joiResolver } from "@hookform/resolvers/joi";

// Mocking authUtils functions as they cannot be resolved in this environment.
// In a real application, these would be properly imported from "../utils/authUtils".
const isAuthenticated = () => {
    // In a real app, this would check if a user is logged in
    return true; // Always return true for this demo
};

const getAuthToken = async () => {
    // In a real app, this would fetch the actual auth token
    return "dummy-auth-token-123"; // Return a dummy token for this demo
};

// SubmitButton component's logic is inlined directly.
// In a real application, this would be imported from "../components/SubmitButton".

export default function CoswalkForm() { // Renamed from JsongForm to CoswalkForm
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

        if (!formData.nama_peserta) {
            newErrors.nama_peserta = "Field 'Nama peserta' harus terisi";
        }
        if (!formData.nama_panggung) {
            newErrors.nama_panggung = "Field 'Nama panggung/Stage name' harus terisi";
        }
        if (!formData.instagram || !/^@/.test(formData.instagram)) {
            newErrors.instagram = "Field 'Instagram' harus diawali dengan '@'";
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

    // Effect to populate form fields from cookies on component mount
    useEffect(() => {
        const nameFromCookie = getCookie('name');
        
        if (nameFromCookie) {
            setValue('nama_peserta', nameFromCookie);
        }
    }, [setValue]);

    // Effect to hide the transition element after a delay
    useEffect(() => {
        setTimeout(() => {
            setHide(!hide)
        }, 1000);
    },[selected]);

    // Main function to submit Coswalk registration
    const submitCoswalk = async (data) => {
      // Manual validation before proceeding
      const validationErrorMessage = validateForm(data);
      if (validationErrorMessage) {
        setError(validationErrorMessage);
        return;
      }

      if (!isAuthenticated()) {
        navigate("/login");
        return;
      }
      setBtnClick(true); // Disable button to prevent multiple submissions
      setError(null); // Clear previous errors
      setSuccess(null); // Clear previous success messages

      try {
        const userEmail = getCookie('email');
        if (!userEmail) {
          setBtnClick(false);
          setError('Email tidak ditemukan. Silakan login ulang.');
          return;
        }

        

        // STEP 2: Submit Coswalk form (skip payment)
        const formPayload = {
          nama_peserta: data.nama_peserta,
          nama_panggung: data.nama_panggung,
          instagram: data.instagram,
          // Optionally add reference to uploaded proof if needed
        };

        // Ambil token dari cookie
        const token = getCookie('token');
        const mainFormResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/coswalk/new`,
          formPayload,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('type', 'coswalk');
        formData.append('transferProof', selectedFile);

        // Upload the transfer proof image
        // const uploadResponse = await axios.post(
        //   `${import.meta.env.VITE_API_URL}/api/transfer-proof/uploadTransferProof`,
        //   formData,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   }
        // );
        
        setSuccess(true);
        setError(null);
      } catch (err) {
        setSuccess(null);
        let errorMessage = 'Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi.';
        if (err.response?.data && typeof err.response.data === 'string') {
          const htmlError = err.response.data;
          if (htmlError.includes('Proof already exists with status')) {
            errorMessage = 'Bukti transfer sudah pernah diupload sebelumnya dan sedang dalam proses pengecekan.';
          } else if (htmlError.includes('Email is required')) {
            errorMessage = 'Email tidak ditemukan. Silakan login ulang.';
          } else if (htmlError.includes('Invalid file type')) {
            errorMessage = 'Tipe file tidak valid. Harap upload gambar (PNG, JPG, GIF).';
          }
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
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
                    <form onSubmit={handleSubmit(submitCoswalk)} className="w-full"> {/* Added w-full for better responsiveness */}
                        <h1 className="text-2xl mb-10 text-center ">
                            Form pendaftaran Coswalk
                        </h1>
                        <label htmlFor="nama_peserta" className="m-2 block"> {/* Added block for better spacing */}
                            Nama peserta
                        </label>
                        <input
                            {...register("nama_peserta")}
                            disabled={btnClick}
                            type="text"
                            id="nama_peserta"
                            placeholder="Nama peserta"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
                        />
                        
                        <label htmlFor="nama_panggung" className="m-2 block">
                            Nama panggung / Stage name
                        </label>
                        <input
                            {...register("nama_panggung")}
                            disabled={btnClick}
                            type="text"
                            id="nama_panggung"
                            placeholder="Nama panggung"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
                        />
                        
                        <label htmlFor="instagram" className="m-2 block"> {/* Changed id to instagram from insta */}
                            Instagram
                        </label>
                        <input
                            {...register("instagram")}
                            disabled={btnClick}
                            type="text"
                            id="instagram"
                            placeholder="contoh: @bunkasaiistts"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
                        />
                        
                        {/* Removed Lagu and Link fields as per Coswalk form requirements */}
                        {/* <label htmlFor="lagu" className="m-2 block">
                            Judul dan asal lagu
                        </label>
                        <input
                            {...register("lagu")}
                            disabled={btnClick}
                            type="text"
                            id="lagu"
                            placeholder="contoh: Unravel - Tokyo Ghoul"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
                        />
                        
                        <label htmlFor="link" className="m-2 block">
                            Link lagu / instrument
                        </label>
                        <input
                            {...register("link")}
                            disabled={btnClick}
                            type="url"
                            id="link"
                            placeholder="contoh: https://youtu.be/5c8MGs_8ngg?si=ZDHI9kSidmGkwbxN"
                            className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
                        /> */}
                        

                        {/* Success and Error Messages */}
                        {success && (
                            <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-100">
                                <p>Pengajuan Coswalk Competition telah disimpan</p>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500 text-white font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-100"> {/* Changed background to red for error */}
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
