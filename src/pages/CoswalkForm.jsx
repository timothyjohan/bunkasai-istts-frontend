import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CoswalkForm(){
  const [btnClick, setBtnClick] = useState(false)
  const [load, setLoad] = useState(false)
  const [selected, setSelected] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const{register, handleSubmit, reset} = useForm()
  

  useEffect(()=>{
    setTimeout(()=>{
      setSelected(false)
      setLoad(true)

    }, 0)
  },[])

  const submitCoswalk = async data =>{
    console.log(data);
    if(!data.nama_peserta || !data.nama_panggung || !data.instagram){
      setSuccess(null)
      setError('Form tidak boleh ada yang kosong')
    }else{
      try {
        await axios.post(`http://localhost:3666/api/coswalk/new`, data)
        setSuccess(true)
        setError(null)
      } catch (error) {
        setSuccess(null)
        setError(error)
      }
    }

    reset()
  }

  return(
    <>  
      {/* Transition */}
      <div style={{height: '110vh'}} className={`bg-yellow-300 rotate-45 h-screen w-screen rounded-xl transition duration-1000 absolute z-30 ${selected ? 'scale-150 translate-x-0 -translate-y-0' : 'scale-0 -translate-x-full translate-y-full'}  `}>
      </div>
      {/*  */}

      <div className="pt-28 min-h-screen">

        <div className="flex items-center justify-center mt-20 bg-neutral-800/80 w-2/6 mx-auto p-10 text-neutral-200 rounded-xl">
          <form onSubmit={handleSubmit(submitCoswalk)}>
            <h1 className="text-2xl mb-10 text-center">Form pendaftaran Coswalk</h1>
            <label htmlFor="nama_peserta" className="m-2">Nama</label>
            <input {...register('nama_peserta')}  type="text" id="nama_peserta" placeholder="Nama peserta" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /> <br />
            <label htmlFor="nama_panggung" className="m-2">Nama panggung / Stage name</label>
            <input {...register('nama_panggung')} type="name" id="nama_panggung" placeholder="Nama panggung" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
            <br /><br />
            <label htmlFor="insta" className="m-2">Instagram</label>
            <input {...register('instagram')} type="title" id="insta" placeholder="contoh: @bunkasaiistts" className="w-full p-2 px-4 bg-neutral-700 rounded-xl transistion duration-300 focus:scale-[1.02]" />
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

            <button type="submit" className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">Submit</button>
            

          </form>
        </div>
      </div>
    </>
  )
}
