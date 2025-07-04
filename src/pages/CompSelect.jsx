// Halaman ini merupakan halaman pemilihan lomba

// Import beberapa package yang dibutuhkan
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Komponen CompSelect
export default function CompSelect() {
  // State untuk menentukan apakah komponen telah dipilih
  const [selected, setSelected] = useState(false);
  // State untuk menentukan apakah komponen sedang dimuat
  const [load, setLoad] = useState(false);
  // State untuk menyimpan teks hover untuk setiap lomba
  const [jsong, setJsong] = useState(null);
  const [coswalk, setCoswalk] = useState(null);
  const [yonkoma, setYonkoma] = useState(null);
  const [cosplay, setCosplay] = useState(null);
  // Fungsi untuk navigasi antar halaman
  const navigate = useNavigate();
  // Mengambil state page dari redux store
  const page = useSelector((state) => state.page);

  // useEffect yang akan dijalankan saat komponen dipasang
  useEffect(() => {
    setLoad(true);
    setSelected(false);
  }, []);

  // --- Hover Handlers ---
  const jsongHover = () => {
    const word =
      "J-Song adalah ajang unjuk bakat menyanyi lagu-lagu berbahasa Jepang, dari anime hingga J-Pop favoritmu! Tunjukkan suara terbaikmu di panggung dan rasakan serunya jadi bintang di tengah festival. Siapa tahu, kamu jadi idola berikutnya!";
    setJsong(word);
  };
  const coswalkHover = () => {
    const word =
      "Coswalk adalah ajang bagi para cosplayer untuk tampil penuh gaya di atas runway! Tunjukkan kostummu, perankan karaktermu, dan buat penonton terpukau di setiap langkahmu. Di sini, kamu bukan cuma cosplay—kamu jadi bintang!";
    setCoswalk(word);
  };
  const yonkomaHover = () => {
    const word =
        "Yonkoma adalah kompetisi membuat komik 4 panel! Tuangkan ide ceritamu dalam empat kotak singkat, dari yang lucu hingga yang menyentuh. Tunjukkan bakat komikusmu dan hibur semua orang dengan karyamu!";
    setYonkoma(word);
  };
  const cosplayHover = () => {
    const word =
        "Cosplay Competition adalah panggung utama untuk para cosplayer! Tampilkan detail kostum terbaikmu, beraksi layaknya karakter aslimu, dan bersaing untuk jadi yang terbaik. Ini adalah kesempatanmu untuk bersinar!";
    setCosplay(word);
  };

  // --- Mouse Leave Handlers ---
  const jsongHovernt = () => setJsong(null);
  const coswalkHovernt = () => setCoswalk(null);
  const yonkomaHovernt = () => setYonkoma(null);
  const cosplayHovernt = () => setCosplay(null);

  // --- Navigation Functions ---
  const toJsong = () => {
    setSelected(true);
    setTimeout(() => {
      navigate("/jsong-form");
    }, 900);
  };
  const toCoswalk = () => {
    setSelected(true);
    setTimeout(() => {
      navigate("/coswalk-form");
    }, 900);
  };
   const toYonkoma = () => {
    setSelected(true);
    setTimeout(() => {
      navigate("/yonkoma-form");
    }, 900);
  };
   const toCosplay = () => {
    setSelected(true);
    setTimeout(() => {
      navigate("/cosplay-competition-form");
    }, 900);
  };

  return (
    <>
      <div
        // style={{ height: "110vh" }}
        className={`h-[200vh] md:h-[100vh] bg-yellow-300 -rotate-45 xl:rotate-45 w-[150vw] md:w-[100vw] transition duration-1000 absolute z-30 ${
          selected
            ? "scale-150 scale-0 translate-x-0 -translate-y-0"
            : "scale-0 translate-x-full -translate-y-full"
        }  `}
      ></div>

      <div className="pt-28 min-h-screen mb-44">
        <h1 className="text-4xl text-center text-neutral-200 font-semibold ">
          Pendaftaran Lomba
        </h1>
        {/* The grid now contains four items and will wrap to 2x2 on large screens */}
        <div
          className={`${
            load
              ? "xl:-translate-x-0 transition-all duration-300"
              : "xl:translate-x-full"
          } flex items-center justify-center mt-16 w-4/6 mx-auto p-10 text-neutral-200 rounded-md grid xl:grid-cols-2 lg:grid:cols-1 gap-x-16 gap-y-24 `}
        >
          {/* Card 1: J-SONG */}
          <div
            className="text-center h-[50vh] w-[50vh] relative mx-auto "
            onClick={toJsong}
          >
            <div
              onMouseEnter={jsongHover}
              onMouseLeave={jsongHovernt}
              // TODO: Replace with your actual image path, e.g., /j-song.png
              className={`bg-[url('/j-song.png')] h-full w-full mx-auto z-0 bg-center bg-cover flex flex-col justify-end transition-all ${
                jsong ? "scale-110 brightness-50 blur-sm" : ""
              }  rounded-md brightness-75  shadow-xl relative`}
            >
              <p className="text-4xl mb-4 font-semibold blur-none text-neutral-100">
                J-SONG
              </p>
            </div>
            <p
              onMouseEnter={jsongHover}
              onMouseLeave={jsongHovernt}
              className={`text-justify xl:-mt-80 z-10 w-5/6 -mt-52 mx-auto relative text-left transition duration-500 ${
                jsong ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {jsong}
            </p>
          </div>

          {/* Card 2: COSWALK */}
          <div
            className="text-center h-[50vh] w-[50vh] relative mx-auto"
            onClick={toCoswalk}
          >
            <div
              onMouseEnter={coswalkHover}
              onMouseLeave={coswalkHovernt}
              // TODO: Replace with your actual image path, e.g., /coswalk.png
              className={`bg-[url('/coswalk.png')] h-full w-full mx-auto z-0 bg-center bg-cover flex flex-col justify-end transition-all ${
                coswalk ? "scale-110 brightness-50 blur-sm" : ""
              }  rounded-md brightness-75 shadow-xl relative`}
            >
              <p className="text-4xl mb-4 font-semibold blur-none text-neutral-100">
                COSWALK
              </p>
            </div>
            <p
              onMouseEnter={coswalkHover}
              onMouseLeave={coswalkHovernt}
              className={`text-justify xl:-mt-80 z-10 w-5/6 -mt-52 mx-auto z-10 relative text-left transition duration-500 ${
                coswalk ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {coswalk}
            </p>
          </div>

          {/* Card 3: YONKOMA */}
          <div
            className="text-center h-[50vh] w-[50vh] relative mx-auto"
            onClick={toYonkoma}
          >
            <div
              onMouseEnter={yonkomaHover}
              onMouseLeave={yonkomaHovernt}
              // TODO: Replace with your actual image path, e.g., /yonkoma.png
              className={`bg-[url('/yonkoma.jpg')] h-full w-full mx-auto z-0 bg-center bg-contain flex flex-col justify-end transition-all ${
                yonkoma ? "scale-110 brightness-50 blur-sm" : ""
              }  rounded-md brightness-75 shadow-xl relative`}
            >
              <p className="text-4xl mb-4 font-semibold blur-none text-neutral-500">
                YONKOMA
              </p>
            </div>
            <p
              onMouseEnter={yonkomaHover}
              onMouseLeave={yonkomaHovernt}
              className={`text-justify xl:-mt-80 z-10 w-5/6 -mt-52 mx-auto z-10 relative text-left transition duration-500 ${
                yonkoma ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {yonkoma}
            </p>
          </div>

          {/* Card 4: COSPLAY COMPETITION */}
          <div
            className="text-center h-[50vh] w-[50vh] relative mx-auto"
            onClick={toCosplay}
          >
            <div
              onMouseEnter={cosplayHover}
              onMouseLeave={cosplayHovernt}
              // TODO: Replace with your actual image path, e.g., /cosplay-competition.png
              className={`bg-[url('/coscomp.jpg')] h-full w-full mx-auto z-0 bg-center bg-cover flex flex-col justify-end transition-all ${
                cosplay ? "scale-110 brightness-50 blur-sm" : ""
              }  rounded-md brightness-75 shadow-xl relative`}
            >
              <p className="text-4xl mb-4 font-semibold blur-none text-neutral-100">
                COSPLAY COMP
              </p>
            </div>
            <p
              onMouseEnter={cosplayHover}
              onMouseLeave={cosplayHovernt}
              className={`text-justify xl:-mt-80 z-10 w-5/6 -mt-52 mx-auto z-10 relative text-left transition duration-500 ${
                cosplay ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {cosplay}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
