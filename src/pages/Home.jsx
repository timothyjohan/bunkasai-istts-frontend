import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { Carousel } from "flowbite-react";
import axios from "axios";

export default function Home(){
  const [load, setLoad] = useState(false)
  const page = useSelector((state)=>state.page)
  const [images, setImages] = useState([])

  const fetchImage = async () =>{
    const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery`)
    setImages(request.data)
  }

  
  useEffect(()=>{
    fetchImage()
    setTimeout(() => {
      setLoad(true)
    }, 0);
  },[])


  return(
    <>
      <div className="h-screen flex items-center justify-center bg-repeat">
        <img src="/banner.gif" className={`h-full mx-auto opacity-75 ${load ? 'scale-100 transition-all duration-300' : 'scale-0'}`} />
      </div>

      <div className="min-h-screen mt-44 w-5/6 mx-auto text-neutral-200">
      <div className="grid grid-cols-2 my-80">
          
          <div className="text-right mt-10">
            <Fade bottom>
              <h1 className="text-4xl font-semibold">APA ITU BUNKASAI?</h1>

            </Fade>
            <br />
            <Fade bottom cascade>
              <p className="text-lg">Festival Budaya Jepang atau yang lebih dikenal dengan Bunkasai (文化祭) merupakan salah satu festival yang cukup terkenal dan biasanya diadakan di sekolah atau perguruan tinggi di Jepang untuk menunjukkan hasil kegiatan dari sekolah atau perguruan tinggi terkait. Kegiatan ini seringkali dijadikan ajang untuk  menampilkan dan memperkenalkan budaya-budaya yang ada di Jepang sekaligus untuk menunjukkan minat serta bakat yang berkaitan dengan budaya dari Jepang.</p>

            </Fade>

          </div>
          <Fade>
            <div className=" w-4/5 h-96 ml-auto">
            <Carousel slideInterval={5000} >
                {
                  images.map((elements)=>{
                    return(
                      <>
                        <img src={`${elements.img}`} alt="" />
                      </>
                    )
                  })
                }
            </Carousel>
            </div>
            
          </Fade>
      </div>
        <Fade bottom cascade>
          <h1 className="text-center text-5xl font-semibold my-20 mb-80 animate-pulse">INTRODUCING OUR CAST</h1>
        </Fade>


        <div className="grid grid-cols-2 mb-44">
          <Fade>
            <div>
              <img className="opacity-90 max-h-[85%] " src="/clariss-pose-1.png" alt="" />
            </div>
          </Fade>

            <div className="text-right mt-20">
              <Fade bottom>
                <h1 className="text-4xl font-semibold">MEET CLARISS</h1>

              </Fade>
              <br />
              
              <p>
                <Fade bottom cascade>
                  <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem</p>
                </Fade>
              </p>
            </div>


          <div className="text-left mt-20">
            <Fade bottom>
              <h1 className="text-4xl font-semibold">MEET CLUE</h1>
            </Fade>
            <br />
            <Fade bottom cascade>
              <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem</p>
            </Fade>
          </div>

          <Fade>
            <div className="">
              <img className="opacity-90 max-h-[85%] " src="/clue-pose-2.png" alt="" />
            </div>
          </Fade>


        </div>
        <div>
          <Fade bottom cascade>
            <h1 className="text-center text-5xl font-semibold mb-96">SCHEDULE</h1>

          </Fade>
          
         
        </div>
      </div>
    </>
  )
}
