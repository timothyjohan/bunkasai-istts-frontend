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
    
    </>
  )
}
