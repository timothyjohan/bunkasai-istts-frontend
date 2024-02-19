// Halaman ini merupakan halaman utama dari website Bunkasai

// Import beberapa package yang dibutuhkan
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { Carousel } from "flowbite-react";
import axios from "axios";

export default function Home() {
    // State untuk menentukan apakah komponen sedang dimuat
    const [load, setLoad] = useState(false);
    // mengambil state page dari redux store
    const page = useSelector((state) => state.page);
    // state untuk menyimpan data gambar
    const [images, setImages] = useState([]);

    // fungsi untuk mengambil data gambar dari API
    // data gambar akan disimpan di state images
    // cara kerja:
    // 1. fungsi fetchImage akan dijalankan saat komponen dipasang
    // 2. fungsi fetchImage akan mengambil data gambar dari API
    // 3. data gambar akan disimpan di state images
    // 4. state images akan digunakan untuk menampilkan gambar di carousel
    // 5. fungsi fetchImage akan dijalankan lagi setelah 5 detik
    const fetchImage = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/gallery`
        );
        setImages(request.data);
    };

    // useEffect yang akan dijalankan saat komponen dipasang
    useEffect(() => {
        fetchImage();
        setTimeout(() => {
            setLoad(true);
        }, 0);
    }, []);

    // mengembalikan JSX untuk render komponen
    return (
        <>
            <div className="lg:h-screen flex items-center justify-center bg-repeat ">
                <img
                    src="/banner.gif"
                    className={`h-full mx-auto opacity-75 ${
                        load
                            ? "scale-100 transition-all duration-300"
                            : "scale-0"
                    }`}
                />
            </div>

            <div className="video-container mx-auto bg-yellow aspect-w-16 aspect-h-9 my-44">
                <iframe
                    className="mx-auto w-5/6 lg:h-[80vh] sm:h-[37vh] object-cover"
                    src="https://www.youtube.com/embed/MLLEpXi_EE0?autoplay=1&mute=1&loop=1&playlist=MLLEpXi_EE0&si=1nvFBuOkHpIwi5h_"
                    title="BUNKASAI ISTTS 2023 - Kibou no Hono"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loop
                ></iframe>
            </div>


            <div className="min-h-screen mt-44 w-5/6 mx-auto text-neutral-200">
                <div className="grid grid-cols-2 my-80">
                    <div className="text-right mt-10">
                        <Fade bottom>
                            <h1 className="text-4xl font-semibold">
                                APA ITU BUNKASAI?
                            </h1>
                        </Fade>
                        <br />
                        <Fade bottom cascade>
                            <p className="text-lg">
                                Festival Budaya Jepang atau yang lebih dikenal
                                dengan Bunkasai (文化祭) merupakan salah satu
                                festival yang cukup terkenal dan biasanya
                                diadakan di sekolah atau perguruan tinggi di
                                Jepang untuk menunjukkan hasil kegiatan dari
                                sekolah atau perguruan tinggi terkait. Kegiatan
                                ini seringkali dijadikan ajang untuk menampilkan
                                dan memperkenalkan budaya-budaya yang ada di
                                Jepang sekaligus untuk menunjukkan minat serta
                                bakat yang berkaitan dengan budaya dari Jepang.
                            </p>
                        </Fade>
                    </div>
                    <Fade>
                        <div className=" w-4/5 h-96 ml-auto">
                            <Carousel b slideInterval={5000}>
                                {images.map((elements) => {
                                    return (
                                        <>
                                            <img
                                                src={`${elements.img}`}
                                                alt=""
                                            />
                                        </>
                                    );
                                })}
                            </Carousel>
                        </div>
                    </Fade>
                </div>
                <Fade bottom cascade>
                    <h1 className="text-center text-5xl font-semibold my-20 mb-80 animate-pulse">
                        INTRODUCING OUR CAST
                    </h1>
                </Fade>

                <div className="grid grid-cols-2 mb-44">
                    <Fade>
                        <div>
                            <img
                                className="opacity-90 max-h-[85%] "
                                src="/clariss-pose-1.png"
                                alt=""
                            />
                        </div>
                    </Fade>

                    <div className="text-right mt-20">
                        <Fade bottom>
                            <h1 className="text-4xl font-semibold">
                                MEET CLARISS
                            </h1>
                        </Fade>
                        <br />

                        <p>
                            <Fade bottom cascade>
                                <p className="text-lg">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Eligendi doloribus
                                    corrupti soluta quas quia possimus obcaecati
                                    reiciendis debitis veniam reprehenderit
                                    adipisci molestias dicta, quisquam, impedit,
                                    ex dolorem perspiciatis sed ipsum. lorem
                                </p>
                            </Fade>
                        </p>
                    </div>

                    <div className="text-left mt-20">
                        <Fade bottom>
                            <h1 className="text-4xl font-semibold">
                                MEET CLUE
                            </h1>
                        </Fade>
                        <br />
                        <Fade bottom cascade>
                            <p className="text-lg">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Eligendi doloribus corrupti
                                soluta quas quia possimus obcaecati reiciendis
                                debitis veniam reprehenderit adipisci molestias
                                dicta, quisquam, impedit, ex dolorem
                                perspiciatis sed ipsum. lorem
                            </p>
                        </Fade>
                    </div>

                    <Fade>
                        <div className="">
                            <img
                                className="opacity-90 max-h-[85%] "
                                src="/clue-pose-2.png"
                                alt=""
                            />
                        </div>
                    </Fade>
                </div>
                {/* <div>
          <Fade bottom cascade>
            <h1 className="text-center text-5xl font-semibold mb-96">SCHEDULE</h1>

          </Fade>
          
         
        </div> */}
            </div>
        </>
    );
}
