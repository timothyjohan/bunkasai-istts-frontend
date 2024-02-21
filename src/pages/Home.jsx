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
            <div className="xl:h-screen flex items-center justify-center bg-repeat pt-28 xl:pt-20 ">
                <img
                    src="https://cdn.discordapp.com/attachments/1169649196882743334/1209767825841979422/banner.gif?ex=65e81f16&is=65d5aa16&hm=cfbf63841200c9e96fd18ec70a334bf6b10ef459ec1943b14f8e8c48840d9ba4&"
                    className={`h-full xl:mx-auto opacity-75 ${
                        load
                            ? "scale-100 transition-all duration-300"
                            : "scale-0"
                    }`}
                />
            </div>

            <div className="video-container mx-auto bg-yellow aspect-w-16 aspect-h-9 my-20 md:my-36 xl:my-44">
                <iframe
                    className="mx-auto w-full xl:h-[80vh] lg:h-[50vh] md:h-[50vh] h-[28vh] object-cover"
                    src="https://www.youtube.com/embed/MLLEpXi_EE0?autoplay=1&mute=1&loop=1&playlist=MLLEpXi_EE0&si=1nvFBuOkHpIwi5h_"
                    title="BUNKASAI ISTTS 2023 - Kibou no Hono"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loop
                ></iframe>
            </div>


            <div className="min-h-screen mt-10 md:mt-44 w-11/12 mx-auto text-neutral-200">
    <div className="grid grid-cols-1 md:grid-cols-2 my-10 md:my-80">
        <div className="text-center md:text-right mt-10">
            <Fade bottom>
                <h1 className="text-4xl md:text-5xl font-semibold xl:text-left xl:w-5/6 xl:mx-auto md:text-left md:w-5/6 md:mx-auto">
                    APA ITU BUNKASAI?
                </h1>
            </Fade>
            <br />
            <Fade bottom cascade>
                <div>
                    <p className="text-lg text-justify w-5/6 mx-auto ">
                        Festival Budaya Jepang atau yang lebih dikenal dengan Bunkasai (文化祭) merupakan salah satu festival yang cukup terkenal dan biasanya diadakan di sekolah atau perguruan tinggi di Jepang untuk menunjukkan hasil kegiatan dari sekolah 
                    </p>

                </div>
            </Fade>
        </div>
        <Fade>
            <div className="w-full xl:w-5/6 h-96 mt-[-4rem] mx-auto xl:ml-auto">
                <Carousel b slideInterval={5000}>
                    {images.map((elements) => {
                        return (
                            <img
                                key={elements.id}
                                src={`${elements.img}`}
                                alt=""
                            />
                        );
                    })}
                </Carousel>
            </div>
        </Fade>
    </div>
    <Fade bottom cascade>
        <div className="text-center my-10 md:my-20 mb-20 md:mb-80 animate-pulse">
            <h1 className="text-5xl font-semibold">
                INTRODUCING OUR CAST
            </h1>
        </div>
    </Fade>

    <div className="grid grid-cols-1 md:grid-cols-2">
        <Fade>
            <div>
                <img
                    className="opacity-90 max-h-[85%] "
                    src="/clariss-pose-1.png"
                    alt=""
                />
            </div>
        </Fade>

        <div className="text-center text-justify md:text-right xl:mt-10 mb-44 w-5/6 mx-auto">
            <Fade bottom>
                <h1 className="text-4xl text-center xl:text-right md:text-5xl font-semibold mx-auto -mt-10">
                    MEET CLARISS
                </h1>
            </Fade>
            <br />

            <p>
                <Fade bottom cascade>
                    <div>
                        <p className="text-lg">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem
                        </p>

                    </div>
                </Fade>
            </p>
        </div>

        

        <Fade>
            <div className="text-center md:text-left mx-auto">
                <img
                    className="opacity-90 max-h-[85%] "
                    src="/clue-pose-2.png"
                    alt=""
                />
            </div>
        </Fade>

        <div className="text-center md:text-left xl:mt-10 mb-44 w-5/6 mx-auto">
            <Fade bottom>
                <h1 className="text-4xl md:text-5xl font-semibold">
                    MEET CLUE
                </h1>
            </Fade>
            <br />
            <Fade bottom cascade>
                <div>
                    <p className="text-lg text-justify ">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem
                    </p>

                </div>
            </Fade>
        </div>

    </div>
</div>
        </>
    );
}
