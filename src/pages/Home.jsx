import { useEffect, useState } from "react"

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

          <div className="">
            <img className="opacity-90 max-h-[95%] " src="/clariss-pose-1.png" alt="" />
          </div>

          <div className="text-right mt-20">
            <h1 className="text-4xl font-semibold">MEET CLARISS</h1>
            <br />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem</p>
          </div>


          <div className="text-left mt-20">
            <h1 className="text-4xl font-semibold">MEET CLUE</h1>
            <br />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi doloribus corrupti soluta quas quia possimus obcaecati reiciendis debitis veniam reprehenderit adipisci molestias dicta, quisquam, impedit, ex dolorem perspiciatis sed ipsum. lorem</p>
          </div>

          <div className="">
            <img className="opacity-90 max-h-[95%] " src="/clue-pose-2.png" alt="" />
          </div>

        </div>
      </div>
    </>
  )
}
