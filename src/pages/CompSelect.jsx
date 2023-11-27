import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CompSelect(){
  const [selected, setSelected] = useState(false)
  const [load, setLoad] = useState(false)
  const [jsong, setJsong] = useState(null)
  const [coswalk, setCoswalk] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoad(true)
    setSelected(false)
  },[])


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

  const toJsong = ()=>{
    setSelected(true)
    setTimeout(()=>{
      navigate('/jsong-form')

    }, 900)
    // navigate("/jsong-form")
  }

  return(
    <>
      <div style={{height: '110vh'}} className={`bg-yellow-300 rotate-45 h-screen w-screen transition duration-1000 absolute z-30 ${selected ? 'scale-150 translate-x-0 -translate-y-0' : 'scale-0 translate-x-full -translate-y-full'}  `}>
      </div>

      <div className="pt-28 min-h-screen">
        <h1 className="text-4xl text-center text-neutral-200 font-semibold">Pendaftaran Lomba</h1>
        <div className={`${load ? '-translate-x-0 transition-all duration-300' : 'translate-x-full'} flex items-center justify-center mt-16  w-4/6 mx-auto p-10 text-neutral-200 rounded-md grid grid-cols-2`}>

          <div className="text-center h-full mr-20 relative " onClick={toJsong}>
            <div style={{height: "55vh"}} onMouseEnter={jsongHover} onMouseLeave={jsongHovernt} className={`bg-[url('/j-song.png')] z-0 bg-center bg-cover flex flex-col justify-end transition-all ${jsong ? 'scale-110 brightness-50 blur-sm' : '' }  rounded-md brightness-75  shadow-xl relative`}>
              <p className="text-4xl mb-4 font-semibold blur-none text-neutral-100">J-SONG</p>
            </div>
            <p onMouseEnter={jsongHover} onMouseLeave={jsongHovernt} className={`mx-5 -mt-80 z-10 relative text-left transition duration-500 ${jsong ? 'opacity-100 scale-100' : 'opacity-0 scale-90' }`}>{jsong}</p>
            
          </div>
            
          <div className="text-center h-full ml-20">
            <div style={{height: "55vh"}} onMouseEnter={coswalkHover} onMouseLeave={coswalkHovernt} className={`bg-[url('/coswalk.png')] z-0 bg-center bg-cover flex flex-col justify-end transition-all ${coswalk ? 'scale-110 brightness-50 blur-sm' : '' }  rounded-md brightness-75 shadow-xl relative`}>
                <p className="text-4xl mb-4 font-semibold blur-none text-neutral-100">COSWALK</p>
            </div>
            <p onMouseEnter={coswalkHover} onMouseLeave={coswalkHovernt} className={`mx-5 -mt-80 z-10 relative text-left transition duration-500 ${coswalk ? 'opacity-100 scale-100' : 'opacity-0 scale-90' }`}>{coswalk}</p>

          </div>
          
        </div>
      </div>
    </>
  )
}
