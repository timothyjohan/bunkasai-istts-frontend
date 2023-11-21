import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Template(){
    return(
        <>
            <Navbar />
            <div className="pt-24 w-5/6 mx-auto">
                <Outlet/>

            </div>
        </>
    )
}