import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function TenantConf(){
  const [btnClick, setBtnClick] = useState(false)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoad(true)
  },[])

  const accepted = () =>{
    setBtnClick(true);
    setLoad(false);
    setTimeout(() => {
      navigate("/")
    }, 500);
    
  }

  return(
    <>
      <div className="pt-28 min-h-screen">
        <div className={`${btnClick ? 'scale-0 transition-all duration-300' : ''} ${load ? 'scale-100 transition-all duration-300' : 'scale-0'} flex items-center justify-center mt-20 bg-neutral-800 w-4/6 mx-auto p-10 text-neutral-200 rounded-md`}>
          <div className="text-center">
            <h1 className="text-2xl mb-10">Syarat dan ketentuan</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ex a nihil beatae reiciendis doloribus cupiditate explicabo quasi deserunt quisquam impedit non corrupti modi ipsum facere sed architecto? Laudantium, facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi iure placeat accusantium sint repellendus, explicabo ducimus maiores culpa vero. Expedita a ut commodi vitae eveniet nobis esse iure, ducimus facilis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, eos delectus incidunt earum cumque nostrum voluptatibus necessitatibus alias quod, nobis aliquam? Illo aliquam eos ex nesciunt neque esse harum fugiat?</p>
            <button onClick={accepted} className="mt-5 bg-neutral-700 py-1.5 px-10 text-xl rounded-xl hover:text-violet-500 hover:bg-green-400 hover:font-bold transition-all hover:scale-110 shadow-xl">Agree</button>

          </div>
          
        </div>
      </div>
    </>
  )
}
