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
    // State untuk menyimpan teks hover untuk jsong
    const [jsong, setJsong] = useState(null);
    // State untuk menyimpan teks hover untuk coswalk
    const [coswalk, setCoswalk] = useState(null);
    // Fungsi untuk navigasi antar halaman
    const navigate = useNavigate();
    // Mengambil state page dari redux store
    const page = useSelector((state) => state.page);

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        console.log(page);
        setLoad(true);
        setSelected(false);
    }, []);

    // Fungsi yang dijalankan saat mouse hover ke jsong
    const jsongHover = () => {
        const word =
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur omnis odit ullam minima in deleniti ad, laboriosam corrupti natus molestias veritatis repellendus, odio sit harum quis praesentium fugiat saepe aut.";
        setJsong(word);
    };
    // Fungsi yang dijalankan saat mouse hover ke coswalk
    const coswalkHover = () => {
        const word =
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur omnis odit ullam minima in deleniti ad, laboriosam corrupti natus molestias veritatis repellendus, odio sit harum quis praesentium fugiat saepe aut.";
        setCoswalk(word);
    };
    // Fungsi yang dijalankan saat mouse tidak lagi hover ke jsong
    const jsongHovernt = () => {
        setJsong(null);
    };
    // Fungsi yang dijalankan saat mouse tidak lagi hover ke coswalk
    const coswalkHovernt = () => {
        setCoswalk(null);
    };

    // Fungsi untuk navigasi ke halaman jsong-form
    const toJsong = () => {
        setSelected(true);
        setTimeout(() => {
            navigate("/jsong-form");
        }, 900);
    };
    // Fungsi untuk navigasi ke halaman coswalk-form
    const toCoswalk = () => {
        setSelected(true);
        setTimeout(() => {
            navigate("/coswalk-form");
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

            <div className="pt-28 min-h-screen">
                <h1 className="text-4xl text-center text-neutral-200 font-semibold ">
                    Pendaftaran Lomba
                </h1>
                <div
                    className={`${
                        load
                            ? "xl:-translate-x-0 transition-all duration-300"
                            : "xl:translate-x-full"
                    } flex items-center justify-center mt-16 w-4/6 mx-auto p-10 text-neutral-200 rounded-md grid xl:grid-cols-2 lg:grid:cols-1 gap-y-24 `}
                >
                    <div
                        className="text-center h-[50vh] w-[50vh] relative mx-auto "
                        onClick={toJsong}
                    >
                        <div
                            onMouseEnter={jsongHover}
                            onMouseLeave={jsongHovernt}
                            className={`bg-[url('/j-song.png')] h-4/6 w-4/6 mx-auto xl:h-full xl:w-full z-0 bg-center bg-cover flex flex-col justify-end transition-all ${
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
                            className={`text-justify xl: xl:-mt-80 z-10 w-4/6 xl:w-5/6 -mt-52 mx-auto relative text-left transition duration-500 ${
                                jsong
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-90"
                            }`}
                        >
                            {jsong}
                        </p>
                    </div>

                    <div
                        className="text-center h-[50vh] w-[50vh] mx-auto xl:mt-0 -mt-28"
                        onClick={toCoswalk}
                    >
                        <div
                            onMouseEnter={coswalkHover}
                            onMouseLeave={coswalkHovernt}
                            className={`bg-[url('/coswalk.png')] h-4/6 w-4/6 mx-auto xl:h-full xl:w-full z-0 bg-center bg-cover flex flex-col justify-end transition-all ${
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
                            className={`text-justify xl: xl:-mt-80 z-10 w-4/6 xl:w-5/6 -mt-52 mx-auto z-10 relative text-left transition duration-500 ${
                                coswalk
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-90"
                            }`}
                        >
                            {coswalk}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
