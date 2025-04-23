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
          src="/banner.gif"
          className={`h-full xl:mx-auto opacity-75 ${
            load ? "scale-100 transition-all duration-300" : "scale-0"
          }`}
        />
      </div>

      <div className="video-container mx-auto bg-yellow aspect-w-16 aspect-h-9 my-20 md:my-36 xl:my-44">
        <iframe
          className="mx-auto w-full xl:h-[80vh] lg:h-[50vh] md:h-[50vh] h-[28vh] object-cover"
          src="https://www.youtube-nocookie.com/embed/MLLEpXi_EE0?autoplay=1&mute=1&loop=1&playlist=MLLEpXi_EE0&si=1nvFBuOkHpIwi5h_"
          title="BUNKASAI ISTTS 2023 - Kibou no Hono"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loop
        ></iframe>
        {}
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
                  Festival Budaya Jepang atau yang lebih dikenal dengan Bunkasai
                  (文化祭) merupakan salah satu festival yang cukup terkenal dan
                  biasanya diadakan di sekolah atau perguruan tinggi di Jepang
                  untuk menunjukkan hasil kegiatan dari sekolah
                </p>
              </div>
            </Fade>
          </div>
          <Fade>
            <div className="w-full xl:w-5/6 h-96 mt-[-4rem] mx-auto xl:ml-auto">
              <Carousel slideInterval={5000}>
                {images.map((elements, key) => {
                  return <img key={key} src={`${elements.img}`} alt="" />;
                })}
              </Carousel>
            </div>
          </Fade>
        </div>
        <Fade bottom cascade>
          <div className="w-11/12 mx-auto my-20 md:my-44 mb-32 md:mb-60 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-20 items-center">
            {/* Kolom kiri: Google Maps */}
            <Fade left>
              <div className="h-[400px] rounded-xl overflow-hidden border border-white shadow-lg">
                <iframe
                  title="Lokasi ISTTS"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.555771876901!2d112.75602017499985!3d-7.291275192716183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbb476048727%3A0x5f5f7cf736ae643e!2sInstitut%20Sains%20dan%20Teknologi%20Terpadu%20Surabaya%20(ISTTS)!5e0!3m2!1sen!2sid!4v1745413161622!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Fade>

            {/* Kolom kanan: Deskripsi kampus dan event */}
            <Fade right>
              <div className="text-left text-neutral-200">
                <h2 className="text-4xl font-semibold mb-4">Kampus Kami</h2>
                <p className="text-lg mb-6 text-justify">
                  Institut Sains dan Teknologi Terpadu Surabaya (ISTTS) menjadi
                  rumah bagi BUNKASAI—festival budaya Jepang yang penuh warna,
                  kreativitas, dan semangat komunitas. Di sinilah para penggemar
                  anime, cosplayer, seniman, dan pecinta budaya Jepang berkumpul
                  untuk merayakan mimpi dan inspirasi dalam suasana yang hangat
                  dan inklusif. Dengan lokasi yang strategis di tengah kota
                  Surabaya, ISTTS bukan hanya tempat belajar, tapi juga tempat
                  lahirnya pengalaman yang tak terlupakan.
                </p>
                <a
                  href="https://istts.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Visit Us!
                </a>
              </div>
            </Fade>
          </div>
        </Fade>

        <Fade bottom cascade>
          <div className="text-center my-10 md:my-20 mb-20 md:mb-80 animate-pulse">
            <h1 className="text-5xl font-semibold">INTRODUCING OUR CAST</h1>
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

            <Fade bottom cascade>
              <div>
                <p className="text-lg">
                  Clariss adalah penjaga mimpi yang hanya muncul saat festival.
                  Katanya, ia berasal dari dunia yang terlupakan—tempat di mana
                  imajinasi belum sempat jadi nyata. Dalam hiruk-pikuk cosplay
                  dan lampion, ia hadir membawa semangat dan cerita baru bagi
                  siapa pun yang masih percaya pada keajaiban.
                </p>
              </div>
            </Fade>
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
              <h1 className="text-4xl md:text-5xl font-semibold">MEET CLUE</h1>
            </Fade>
            <br />
            <Fade bottom cascade>
              <div>
                <p className="text-lg">
                  Clue adalah sahabat setia Clariss—penjelajah waktu yang gemar
                  mencari potongan kisah dari masa lalu dan masa depan. Ia
                  sering muncul tiba-tiba, membawa benda aneh yang memicu rasa
                  penasaran. Bagi Clue, setiap festival adalah teka-teki, dan
                  setiap orang di dalamnya adalah petunjuk untuk cerita yang
                  belum selesai.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}
