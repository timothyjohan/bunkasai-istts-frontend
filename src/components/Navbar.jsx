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
                        <button className="mx-5 text-xl font-medium">HOME</button>
                        <button className="mx-5 text-xl font-medium">TENANT</button>
                        <button className="mx-5 text-xl font-medium">COMPETITION</button>
                        
                    </div>
                </nav>
                <hr className="border-black border-solid w-11/12 mx-auto" />
            </div>

        </>
    )
}