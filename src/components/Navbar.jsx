import { Link, useNavigate } from "react-router-dom";
import { changePage } from "../app/pageSlice";
import { useDispatch } from "react-redux";

export default function Navbar(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toHome = () =>{
        dispatch(changePage(0))
        navigate("/")
    }
    const toTenant = () =>{
        dispatch(changePage(1))
        navigate("/tenant-conf")
    }
    const toComp = () =>{
        dispatch(changePage(2))
        navigate("/competition-select")
    }
    
    return(
        <>
            <div className="fixed w-full z-20">
                <nav className="w-11/12 mx-auto p-2 mt-2 flex items-center justify-between ">
                    <div className="flex items-center">
                        <img src="bunkasai-logo.png" className="w-20 h-20 object-contain mx-5" />
                    </div>
                    <div className="flex items-center text-neutral-300">
                        <button onClick={toHome} className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className=" ">HOME</button>
                        </button>
                        <button onClick={toTenant} className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className=" ">TENANT</button>
                        </button>
                        <button onClick={toComp} className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className="">COMPETITION</button>
                        </button>

                        
                    </div>
                </nav>
                {/* <hr className="border-neutral-200 border-solid w-11/12 mx-auto " /> */}
            </div>

        </>
    )
}