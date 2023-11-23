import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TenantForm(){
  const [disagreeClick, setDisagreeClick] = useState(false)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setTimeout(()=>{
      setLoad(true)

    }, 0)
  },[])

  const disagree = () =>{
    setDisagreeClick(true);
    setLoad(false);
    setTimeout(() => {
      navigate("/")
    }, 200);
    
  }

  return(
    <>
      <div className="pt-28 min-h-screen">
        <div className={`${disagreeClick ? '-translate-x-full transition-all duration-300' : ''} ${load ? '-translate-x-0 transition-all duration-300' : 'translate-x-full'} flex items-center justify-center mt-20 bg-neutral-800 w-4/6 mx-auto p-10 text-neutral-200 rounded-md`}>
          <div className="text-center">
            <h1 className="text-2xl mb-10">Form pendaftaran tenant</h1>
            <input type="text" placeholder="Nama Tenant" className="w-full p-2" />
            
          </div>
          
        </div>
      </div>
    </>
  )
}
