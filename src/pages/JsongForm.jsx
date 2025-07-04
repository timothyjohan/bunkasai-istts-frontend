// J-Song Competition Registration Form Page

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

export default function JsongForm() {
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
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Function to handle file selection
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

    setSelectedFile(file);
    // Set the value for 'bukti_transfer' in react-hook-form
    // This is crucial for validation to see that a file has been selected
    setValue("bukti_transfer", [file]);

    // Create preview for image if it's an image file
    if (file && file.type.startsWith("image/")) {
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
    if (!formData.telp || !/^[0-9]{10,}$/.test(formData.telp)) {
      newErrors.telp =
        "Field 'No Telpon' invalid, harus berupa angka dan minimal 10 digit";
    }
    if (!formData.nama_panggung) {
      newErrors.nama_panggung = "Field 'Nama panggung/Stage name' harus terisi";
    }
    if (!formData.lagu || !/.*-.*/.test(formData.lagu)) {
      newErrors.lagu =
        "Field 'Judul dan asal lagu' diisi dengan format <judul> - <asal>";
    }
    if (!formData.link) {
      newErrors.link = `Isi field 'link' dengan "-" jika tidak ada`;
    }
    if (!selectedFile) {
      // Check selectedFile state directly for file existence
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
    // formState: { errors }, // Removed as Joi resolver is not used
  } = useForm(); // Removed resolver option

  // Effect for initial transition
  useEffect(() => {
    setTimeout(() => {
      setSelected(false);
      setLoad(true);
    }, 50);
  }, []);

  // Effect to populate form fields from cookies on component mount
  useEffect(() => {
    const nameFromCookie = getCookie("name");
    const phoneFromCookie = getCookie("phone");

    if (nameFromCookie) {
      setValue("nama_peserta", nameFromCookie);
    }

    if (phoneFromCookie) {
      setValue("telp", phoneFromCookie);
    }
  }, [setValue]);

  // Effect to hide the transition element after a delay
  useEffect(() => {
    setTimeout(() => {
      setHide(!hide);
    }, 1000);
  }, [selected]);

  // Main function to submit J-Song registration
  const submitJsong = async (data) => {
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
      // STEP 1: Upload transfer proof
      console.log("Uploading transfer proof...");

      // Ensure file exists for upload
      if (!selectedFile) {
        // Check the state variable directly for the file
        setBtnClick(false);
        setError("Bukti transfer harus diupload.");
        return;
      }

      // Validate file name (redundant with selectedFile check but good for explicit error)
      if (!selectedFile.name) {
        setBtnClick(false);
        setError("File tidak valid. Silakan pilih file lagi.");
        return;
      }

      const userEmail = getCookie("email");
      if (!userEmail) {
        setBtnClick(false);
        setError("Email tidak ditemukan. Silakan login ulang.");
        return;
      }

      // STEP 2: Submit J-Song form after successful image upload
      try {
        // Construct the form data payload, excluding the file which was uploaded separately
        const formPayload = {
          nama_peserta: data.nama_peserta,
          telp: data.telp,
          nama_panggung: data.nama_panggung,
          lagu: data.lagu,
          link: data.link,
          // Note: bukti_transfer is not sent here as it's already uploaded.
        };

        const mainFormResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/jsong/new`,
          formPayload,
          {
            headers: {
              "x-auth-token": getCookie("token"),
            },
          }
        );
        console.log(
          "J-Song form submitted successfully:",
          mainFormResponse.data
        );

        const formData = new FormData();
        formData.append("email", userEmail);
        formData.append("type", "jsong");
        formData.append("transferProof", selectedFile); // Use selectedFile directly

        // Upload the transfer proof image
        const uploadResponse = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/api/transfer-proof/uploadTransferProof`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for FormData
            },
          }
        );

        console.log(
          "Transfer proof uploaded successfully:",
          uploadResponse.data
        );
        setSuccess(true);
        setError(null);
      } catch (formError) {
        console.error(
          "J-Song form submission failed:",
          formError.response?.data || formError.message
        );
        setSuccess(null);
        setError(
          formError.response?.data?.message ||
            formError.message ||
            "Terjadi kesalahan saat submit form J-Song."
        );
      } finally {
        setBtnClick(false);
        reset();
        // Reset file states
        setSelectedFile(null);
        setFilePreview(null);
        setValue("bukti_transfer", null);
        const fileInput = document.getElementById("bukti_transfer");
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
      console.error("General error in submitJsong:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      setBtnClick(false);

      let errorMessage =
        "Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi.";

      // Attempt to parse HTML error response for better messages
      if (err.response?.data && typeof err.response.data === "string") {
        const htmlError = err.response.data;
        if (htmlError.includes("Proof already exists with status")) {
          errorMessage =
            "Bukti transfer sudah pernah diupload sebelumnya dan sedang dalam proses pengecekan.";
        } else if (htmlError.includes("Email is required")) {
          errorMessage = "Email tidak ditemukan. Silakan login ulang.";
        } else if (htmlError.includes("Invalid file type")) {
          errorMessage =
            "Tipe file tidak valid. Harap upload gambar (PNG, JPG, GIF).";
        }
      } else if (err.response?.data?.message) {
        // Check for JSON error message
        errorMessage = err.response.data.message;
      } else if (err.message?.includes("Network Error")) {
        errorMessage = "Koneksi jaringan terputus atau server tidak merespons.";
      } else if (err.response?.status === 500) {
        errorMessage =
          "Gagal memproses. Terjadi kesalahan server internal. Silakan coba lagi.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  // Inlined SubmitButton component logic
  const InlinedSubmitButton = ({ btnClick }) => {
    return (
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
          <form onSubmit={handleSubmit(submitJsong)} className="w-full">
            {" "}
            {/* Added w-full for better responsiveness */}
            <h1 className="text-2xl mb-10 text-center ">
              Form pendaftaran J-Song
            </h1>
            <label htmlFor="nama_peserta" className="m-2 block">
              {" "}
              {/* Added block for better spacing */}
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
            <label htmlFor="telp" className="m-2 block">
              Nomor telp
            </label>
            <input
              {...register("telp")}
              disabled={btnClick}
              type="tel"
              id="telp"
              placeholder="contoh: 0812XXXXX"
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
            <label htmlFor="lagu" className="m-2 block">
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
            />
            {/* Upload Bukti Transfer Section */}
            <div>
              <label htmlFor="bukti_transfer" className="block m-2">
                Upload Bukti Transfer
              </label>
              <p className="text-xs text-neutral-400 mt-2 mb-4 mx-2">
                Contoh :
                <br />
                Transfer biaya pendaftaran sebesar Rp 20.000 <br />
                ke: BCA: 7881139344 a.n. Valerie Tandyono
                <br />
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
                          setValue("bukti_transfer", null); // Clear hook-form value
                          // Reset file input element value
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
                <p>Pengajuan J-Song Competition telah disimpan</p>
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white font-semibold py-2 px-4 mb-8 rounded-xl transition duration-400 scale-100">
                {" "}
                {/* Changed background to red for error */}
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
