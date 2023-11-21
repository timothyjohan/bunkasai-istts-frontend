import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CompSelect(){
  const [btnClick, setBtnClick] = useState(false)
  const [load, setLoad] = useState(false)
  const [jsong, setJsong] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoad(true)
  },[])

  const accepted = () =>{
    setBtnClick(true);
    setLoad(false);
    setTimeout(() => {
      navigate("/")
    }, 200);
  }

  const jsongHover = ()=>{
    const word = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur omnis odit ullam minima in deleniti ad, laboriosam corrupti natus molestias veritatis repellendus, odio sit harum quis praesentium fugiat saepe aut."
    setJsong(word)
  }
  const jsongHovernt = ()=>{
    setJsong(null)
  }

  return(
    <>
      <div className="pt-28 min-h-screen">
        <div className={`${btnClick ? '-translate-x-full transition-all duration-300' : ''} ${load ? '-translate-x-0 transition-all duration-300' : 'translate-x-full'} flex items-center justify-center mt-20  w-4/6 mx-auto p-10 text-neutral-200 rounded-md grid grid-cols-2`}>
          <div className="text-center h-full mr-20 relative">
            <div onMouseEnter={jsongHover} onMouseLeave={jsongHovernt} className="bg-[url('/j-song.png')] z-0 bg-center bg-cover h-full flex flex-col justify-end transition-all hover:scale-110 rounded-md brightness-75 hover:brightness-50 hover:blur-sm shadow-xl relative">
              <p className="text-4xl mb-4 font-semibold blur-none ">J-SONG</p>
            </div>
            {
              jsong ? <p className="mx-5 -mt-80 z-10 relative text-left">{jsong}</p> : null
            }
            
          </div>
            
          <div className="text-center h-full ml-20">
            <img src="/coswalk.png" alt="" className="h-6/6"/>

          </div>
        </div>
      </div>
    </>
  )
}
