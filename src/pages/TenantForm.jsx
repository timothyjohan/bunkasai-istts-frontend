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


  return(
    <>
      <div className="pt-28 min-h-screen">
        <div className={`${disagreeClick ? '-translate-x-full transition-all duration-300' : ''} ${load ? '-translate-x-0 transition-all duration-300' : 'translate-x-[100vw]'} flex items-center justify-center mt-20 bg-neutral-800/80 w-2/6 mx-auto p-10 text-neutral-200 rounded-xl`}>
          <div className="">
            <form>
              <h1 className="text-2xl mb-10 text-center">Form pendaftaran tenant</h1>
              <label htmlFor="nama_tenant" className="m-2">Nama tenant</label>
              <input type="text" id="nama_tenant" placeholder="Nama Tenant" className="w-full p-2 px-4 bg-neutral-700 rounded-xl" />
              <br /> <br />
              <label htmlFor="nm_cp" className="m-2">Nama contact person</label>
              <input type="text" id="nm_cp" placeholder="Nama contact person" className="w-full p-2 px-4 bg-neutral-700 rounded-xl" />
              <br /> <br />
              <label htmlFor="notel" className="m-2">Nomor telp</label>
              <input type="phone" id="notel" placeholder="contoh: 0812XXXXX" className="w-full p-2 px-4 bg-neutral-700 rounded-xl" />
              <br /><br />
              <label htmlFor="alamat" className="m-2">Alamat</label>
              <input type="address" id="alamat" placeholder="contoh: Jl. Ngagel Jaya Tengah No.73-77" className="w-full p-2 px-4 bg-neutral-700 rounded-xl mb-10" />
              <button type="submit" className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">Submit</button>
              

            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}
