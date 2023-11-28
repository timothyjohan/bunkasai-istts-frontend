import { useEffect } from "react";
import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function TenantForm(){
  const [disagreeClick, setDisagreeClick] = useState(false)
  const [btnClick, setBtnClick] = useState(false)

  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const{register, handleSubmit, reset} = useForm()
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setTimeout(()=>{
      setLoad(true)

    }, 0)
  },[])

  const submitTenant = async data =>{
    setBtnClick(true)
    if(!data.nama_tenant || !data.nama_cp || !data.telp || !data.alamat){
      setSuccess(null)
      setError('Form tidak boleh ada yang kosong')
    }else{
      try {
        await axios.post(`http://localhost:3666/api/tenants/new`, data)
        setSuccess(true)
        setError(null)
      } catch (error) {
        setSuccess(null)
        setError(error)
      }
    }
    setBtnClick(false)
    reset()
  }

  return(
    <>
      <div className="pt-28 min-h-screen">
        <div className={`${disagreeClick ? '-translate-x-full transition-all duration-300' : ''} ${load ? '-translate-x-0 transition-all duration-300' : 'translate-x-[100vw]'} flex items-center justify-center mt-20 bg-neutral-800/80 w-2/6 mx-auto p-10 text-neutral-200 rounded-xl`}>
          <div className="">
            <form onSubmit={handleSubmit(submitTenant)}>
              <h1 className="text-2xl mb-10 text-center">Form pendaftaran tenant</h1>
              <label htmlFor="nama_tenant" className="m-2">Nama tenant</label>
              <input {...register('nama_tenant')} type="text" id="nama_tenant" placeholder="Nama Tenant" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
              <br /> <br />
              <label htmlFor="nm_cp" className="m-2">Nama contact person</label>
              <input {...register('nama_cp')} type="text" id="nm_cp" placeholder="Nama contact person" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
              <br /> <br />
              <label htmlFor="notel" className="m-2">Nomor telp</label>
              <input {...register('telp')} type="phone" id="notel" placeholder="contoh: 0812XXXXX" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
              <br /><br />
              <label htmlFor="alamat" className="m-2">Alamat</label>
              <input {...register('alamat')} type="address" id="alamat" placeholder="contoh: Jl. Ngagel Jaya Tengah No.73-77" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02] mb-10 " />
              {
                success ? 
                <>
                  <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition duration-400 scale-100">
                    <p >Pengajuan tenant telah disimpan</p>
                  </div>
                </>
                :
                <>
                  <div className="bg-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition  duration-400 scale-0 absolute">
                    <p >Pengajuan tenant telah disimpan</p>
                  </div>
                </>
              }
              {
                error ? 
                <>
                  <div className="text-green-300 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
                    <p> {error} </p>
                  </div>
                </>
                :
                <>
                  <div className="text-green-300 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-0 absolute">
                    <p> {error} </p>
                  </div>
                </>
                
              }

              {
                btnClick ? 
                  <button type="submit" disabled className="w-full py-2 rounded-xl font-bold transition-all text-violet-500 bg-green-400"><img src="loading.png"className="h-6 mx-auto transition-all animate-spin" alt="" /></button>
                  :
                  <button type="submit" className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">Submit</button>
              }

            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}
