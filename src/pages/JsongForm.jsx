import { useEffect } from "react";
import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function JsongForm(){
  const [btnClick, setBtnClick] = useState(false)
  const [load, setLoad] = useState(false)
  const [selected, setSelected] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const{register, handleSubmit, reset, formState} = useForm()


  useEffect(()=>{
    setTimeout(()=>{
      setSelected(false)
      setLoad(true)

    }, 0)
  },[])

  const submitCoswalk = async data =>{
    setBtnClick(true)
    if(!data.nama_peserta || !data.telp || !data.nama_panggung || !data.lagu || !data.link){
      setSuccess(null)
      setError('Form tidak boleh ada yang kosong')
    }else{
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/jsong/new`, data)
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
      {/* Transition */}
      <div style={{height: '110vh'}} className={`bg-yellow-300 rotate-45 h-screen w-screen transition duration-1000 absolute z-30 ${selected ? 'scale-150 translate-x-0 -translate-y-0' : 'scale-0 -translate-x-full translate-y-full'}  `}>
      </div>
      {/*  */}

      <div className="pt-28 min-h-screen">

        <div className="flex items-center justify-center mt-20 bg-neutral-800/80 w-2/6 mx-auto p-10 text-neutral-200 rounded-xl">
          <form onSubmit={handleSubmit(submitCoswalk)}>
            <h1 className="text-2xl mb-10 text-center ">Form pendaftaran J-Song</h1>
            <label htmlFor="nama_tenant" className="m-2">Nama</label>
            <input {...register('nama_peserta')} type="text" id="nama_tenant" placeholder="Nama peserta" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /> <br />
            <label htmlFor="notel" className="m-2">Nomor telp</label>
            <input {...register('telp')} type="phone" id="notel" placeholder="contoh: 0812XXXXX" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /> <br />
            <label htmlFor="nama_panggung" className="m-2">Nama panggung / Stage name</label>
            <input {...register('nama_panggung')} type="name" id="nama_panggung" placeholder="Nama panggung" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /><br />
            <label htmlFor="lagu" className="m-2">Judul dan asal lagu</label>
            <input {...register('lagu')} type="title" id="lagu" placeholder="contoh: Unravel - Tokyo Ghoul" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /><br />
            <label htmlFor="link" className="m-2">Link lagu / instrument (optional)</label>
            <input {...register('link')} type="title" id="link" placeholder="contoh: https://youtu.be/5c8MGs_8ngg?si=ZDHI9kSidmGkwbxN" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /><br />

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
                  <div className="text-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
                    <p> {error} </p>
                  </div>
                </>
                :
                <>
                  <div className="text-green-400 text-neutral-700 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-0 absolute">
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
    </>
  )
}
