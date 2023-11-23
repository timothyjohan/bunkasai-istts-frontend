import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CompSelect(){
  const [btnClick, setBtnClick] = useState(false)
  const [load, setLoad] = useState(false)
  const [jsong, setJsong] = useState(null)
  const [coswalk, setCoswalk] = useState(null)
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
  const coswalkHover = ()=>{
    const word = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur omnis odit ullam minima in deleniti ad, laboriosam corrupti natus molestias veritatis repellendus, odio sit harum quis praesentium fugiat saepe aut."
    setCoswalk(word)
  }
  const jsongHovernt = ()=>{
    setJsong(null)
  }
  const coswalkHovernt = ()=>{
    setCoswalk(null)
  }

  return(
    <>  
      <div className="pt-28 min-h-screen">
        <div className={`${load ? '-translate-x-0 transition-all duration-300' : 'translate-x-full'} flex items-center justify-center mt-20  w-4/6 mx-auto p-10 text-neutral-200 rounded-md grid grid-cols-2`}>
          <div className="text-center h-full mr-20 relative ">
            <div style={{height: "55vh"}} onMouseEnter={jsongHover} onMouseLeave={jsongHovernt} className={`bg-[url('/j-song.png')] z-0 bg-center bg-cover flex flex-col justify-end transition-all ${jsong ? 'scale-110 brightness-50 blur-sm' : '' }  rounded-md brightness-75  shadow-xl relative`}>
              <p className="text-4xl mb-4 font-semibold blur-none ">J-SONG</p>
            </div>
            <p onMouseEnter={jsongHover} className={`mx-5 -mt-80 z-10 relative text-left transition duration-500 ${jsong ? 'opacity-100 scale-100' : 'opacity-0 scale-90' }`}>{jsong}</p>
            
          </div>
            
          <div className="text-center h-full ml-20">
          <div style={{height: "55vh"}} onMouseEnter={coswalkHover} onMouseLeave={coswalkHovernt} className={`bg-[url('/coswalk.png')] z-0 bg-center bg-cover flex flex-col justify-end transition-all ${coswalk ? 'scale-110 brightness-50 blur-sm' : '' }  rounded-md brightness-75 shadow-xl relative`}>
                <p className="text-4xl mb-4 font-semibold blur-none">COSWALK</p>
            </div>
            <p onMouseEnter={coswalkHover} className={`mx-5 -mt-80 z-10 relative text-left transition duration-500 ${coswalk ? 'opacity-100 scale-100' : 'opacity-0 scale-90' }`}>{coswalk}</p>

          </div>
          
        </div>
      </div>
    </>
  )
}
