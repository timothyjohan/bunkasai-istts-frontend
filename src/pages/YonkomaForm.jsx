// Yonkoma Competition Registration Form Page

// Import required libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function YonkomaForm() {
  // State for UI control and transitions
  const [btnClick, setBtnClick] = useState(false);
  const [load, setLoad] = useState(false);
  const [selected, setSelected] = useState(true);
  const [hide, setHide] = useState(false);

  // State for submission status
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // State for drag and drop and file management
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const navigate = useNavigate();

  // React Hook Form setup
  const { register, handleSubmit, reset, setValue } = useForm();

  // Function to get value from a cookie by its name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // --- File Handling Logic ---

  // Handles the selection of a file (from input or drag-drop)
  const handleFileSelect = (file) => {
    if (!file || !file.name) {
      setError("File tidak valid.");
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file melebihi batas 10MB.");
      return;
    }

    // Check file type (allow images)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Tipe file tidak valid. Harap unggah file gambar (JPG, PNG, GIF)."
      );
      return;
    }

    setSelectedFile(file);
    // Set the value for 'bukti_transfer' in react-hook-form for validation
    setValue("bukti_transfer", [file]);

    // Create a preview for the image file
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    setError(null); // Clear any previous file-related error
  };

  // Drag and drop event handlers
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

  // File input change handler
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // --- Form Validation and Submission ---

  // Manual validation for the form fields
  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.nama_peserta) {
      newErrors.nama_peserta = "Field 'Nama peserta' harus terisi";
    }
    if (!formData.telp || !/^[0-9]{10,}$/.test(formData.telp)) {
      newErrors.telp =
        "Field 'No Telepon' harus berupa angka dan minimal 10 digit";
    }
    if (!selectedFile) {
      newErrors.bukti_transfer = "Bukti transfer harus diupload";
    }
    const firstErrorKey = Object.keys(newErrors)[0];
    return firstErrorKey ? newErrors[firstErrorKey] : null;
  };

  // Main function to submit Yonkoma registration
  const submitYonkoma = async (data) => {
    const validationErrorMessage = validateForm(data);
    if (validationErrorMessage) {
      setError(validationErrorMessage);
      return;
    }

    setBtnClick(true);
    setError(null);
    setSuccess(null);

    try {
      const userEmail = getCookie("email");
      if (!userEmail) {
        throw new Error("Email tidak ditemukan. Silakan login ulang.");
      }

      // Step 1: Submit main form data (name and phone)
      const formPayload = {
        nama_peserta: data.nama_peserta,
        telp: data.telp,
      };

      // TODO: Replace with your actual Yonkoma submission endpoint
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/yonkoma/new`,
        formPayload,
        {
          headers: { "x-auth-token": getCookie("token") },
        }
      );

      // Step 2: Upload transfer proof
      const proofFormData = new FormData();
      proofFormData.append("email", userEmail);
      proofFormData.append("type", "yonkoma"); // Set type to 'yonkoma'
      proofFormData.append("transferProof", selectedFile);

      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/api/transfer-proof/uploadTransferProof`,
        proofFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess("Pendaftaran Lomba Yonkoma berhasil!");
      reset();
      setSelectedFile(null);
      setFilePreview(null);
      setValue("bukti_transfer", null);
      const fileInput = document.getElementById("bukti_transfer");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat mendaftar.";
      setError(errorMessage);
      console.error("Yonkoma submission failed:", err);
    } finally {
      setBtnClick(false);
    }
  };

  // --- Effects ---

  // Effect for initial page load transition
  useEffect(() => {
    setTimeout(() => {
      setSelected(false);
      setLoad(true);
    }, 50);
  }, []);

  // Effect to auto-fill form from cookies
  useEffect(() => {
    const nameFromCookie = getCookie("name");
    const phoneFromCookie = getCookie("phone");
    if (nameFromCookie) setValue("nama_peserta", nameFromCookie);
    if (phoneFromCookie) setValue("telp", phoneFromCookie);
  }, [setValue]);

  // Effect to hide the transition element after it runs
  useEffect(() => {
    setTimeout(() => {
      setHide(!hide);
    }, 1000);
  }, [selected]);

  // --- Render ---

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

      <div className="pt-28 min-h-screen mb-44">
        <div className="flex items-center justify-center mt-20 bg-neutral-800/80 text-sm xl:text-xl xl:w-2/6 mx-auto p-10 text-neutral-200 rounded-xl mb-44">
          <form onSubmit={handleSubmit(submitYonkoma)} className="w-full">
            <h1 className="text-2xl mb-10 text-center">
              Form Pendaftaran Yonkoma
            </h1>

            {/* Name Input */}
            <label htmlFor="nama_peserta" className="m-2 block">
              Nama Peserta
            </label>
            <input
              {...register("nama_peserta")}
              disabled={btnClick}
              type="text"
              id="nama_peserta"
              placeholder="Nama sesuai identitas"
              className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
            />

            {/* Phone Input */}
            <label htmlFor="telp" className="m-2 block">
              Nomor Telepon
            </label>
            <input
              {...register("telp")}
              disabled={btnClick}
              type="tel"
              id="telp"
              placeholder="contoh: 0812XXXXX"
              className="w-full p-2 px-4 bg-neutral-700 rounded-xl transition duration-300 focus:scale-[1.02] mb-4"
            />

            {/* File Upload Section */}
            <div>
              <label htmlFor="bukti_transfer" className="block m-2">
                Upload Bukti Transfer
              </label>
              <p className="text-xs text-neutral-400 mt-2 mb-4 mx-2">
                Contoh :
                <br />
                Transfer biaya pendaftaran sebesar Rp 20.000
                <br />
                ke: BCA: 7881139344 a.n. Valerie Tandyo
              </p>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                  isDragging
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-neutral-600"
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
                          className="mx-auto h-32 w-auto object-contain rounded-lg"
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
                          setValue("bukti_transfer", null);
                          const fileInput =
                            document.getElementById("bukti_transfer");
                          if (fileInput) fileInput.value = "";
                        }}
                        className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                      >
                        Pilih file lain
                      </button>
                    </div>
                  ) : (
                    // Default upload area
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-neutral-500"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <div className="flex text-sm text-neutral-400 justify-center">
                        <label
                          htmlFor="bukti_transfer"
                          className="relative cursor-pointer bg-neutral-700 rounded-md font-medium text-yellow-400 hover:text-yellow-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-800 focus-within:ring-yellow-500 px-3 py-1"
                        >
                          <span>Unggah file</span>
                          <input
                            id="bukti_transfer"
                            name="bukti_transfer"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png,image/gif"
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
              <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl">
                <p>{success}</p>
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white font-semibold py-2 px-4 mb-8 rounded-xl">
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={btnClick}
              className={`w-full py-2 px-4 rounded-xl text-neutral-800 font-semibold transition duration-300 ${
                btnClick
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-300"
              }`}
            >
              {btnClick ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
