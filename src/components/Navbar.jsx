import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <>
            <div className="fixed w-full">
                <nav className="w-11/12 mx-auto p-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="istts.png" className="w-20 h-20 object-contain mx-5" />
                        <img src="nippongo.png" className="w-20 h-20 object-contain" />
                    </div>
                    <div className="flex items-center">
                        <Link to={"/"} className="mx-5 text-xl font-medium transition-all hover:scale-110">
                            <button className=" ">HOME</button>
                        </Link>
                        <Link to={"/tenant-conf"} className="mx-5 text-xl font-medium transition-all hover:scale-110">
                            <button className=" ">TENANT</button>
                        </Link>
                        <Link to={"/competition-select"} className="mx-5 text-xl font-medium transition-all hover:scale-110">
                            <button className="">COMPETITION</button>
                        </Link>

                        
                    </div>
                </nav>
                <hr className="border-black border-solid w-11/12 mx-auto" />
            </div>

        </>
    )
}