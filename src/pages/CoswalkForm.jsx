import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CoswalkForm(){
  const [btnClick, setBtnClick] = useState(false)
  const [load, setLoad] = useState(false)
  const [selected, setSelected] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setSelected(false)
      setLoad(true)

    }, 0)
  },[])

  return(
    <>  
      {/* Transition */}
      <div style={{height: '110vh'}} className={`bg-yellow-300 rotate-45 h-screen w-screen transition duration-1000 absolute z-30 ${selected ? 'scale-150 translate-x-0 -translate-y-0' : 'scale-0 -translate-x-full translate-y-full'}  `}>
      </div>
      {/*  */}

      <div className="pt-28 min-h-screen">

        <div className="flex items-center justify-center mt-20 bg-neutral-800/80 w-2/6 mx-auto p-10 text-neutral-200 rounded-xl">
          <form>
            <h1 className="text-2xl mb-10 text-center">Form pendaftaran Coswalk</h1>
            <label htmlFor="nama_tenant" className="m-2">Nama</label>
            <input type="text" id="nama_tenant" placeholder="Nama peserta" className="w-full p-2 px-4 bg-neutral-700 rounded-xl" />
            <br /> <br />
            <label htmlFor="nama_panggung" className="m-2">Nama panggung / Stage name</label>
            <input type="name" id="nama_panggung" placeholder="Nama panggung" className="w-full p-2 px-4 bg-neutral-700 rounded-xl" />
            <br /><br />
            <label htmlFor="insta" className="m-2">Instagram</label>
            <input type="title" id="insta" placeholder="contoh: @bunkasaiistts" className="w-full p-2 px-4 bg-neutral-700 rounded-xl" />
            <br /><br />
            <button type="submit" className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">Submit</button>
            

          </form>
        </div>
      </div>
    </>
  )
}
