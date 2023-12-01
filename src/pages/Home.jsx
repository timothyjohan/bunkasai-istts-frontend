import { useEffect, useState } from "react"
import { Fade } from "react-reveal";

export default function Home(){
  const [load, setLoad] = useState(false)

  
  useEffect(()=>{
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
        <div className="grid grid-cols-2">

          <Fade>
            <div>
              <img className="opacity-90 max-h-[85%] " src="/clariss-pose-1.png" alt="" />
            </div>
          </Fade>

          <h1>
              <div className="text-right h-2/6 mt-20">
                <Fade bottom>
                  <h1 className="text-4xl font-semibold">MEET CLARISS</h1>

                </Fade>
                <br />
                
                <p>
                  <Fade bottom cascade>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem</p>
                    

                  </Fade>
                </p>
              </div>


          </h1>


          <div className="text-left mt-20">
            <Fade>
              <h1 className="text-4xl font-semibold">MEET CLUE</h1>

            </Fade>
            <br />
            <Fade bottom cascade>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem</p>

            </Fade>
          </div>

          <Fade>
            <div className="">
              <img className="opacity-90 max-h-[85%] " src="/clue-pose-2.png" alt="" />
            </div>

          </Fade>

        </div>
      </div>
    </>
  )
}
