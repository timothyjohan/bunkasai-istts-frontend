import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
            <div className="bg-neutral-900 pb-5 text-neutral-300">
                <footer className="grid grid-cols-1 md:grid-cols-2 pt-10">
                    <div className="w-11/12 mx-auto border-r border-solid border-neutral-500 mt-10 md:mt-0 md:border-0 md:pr-10">
                        <h1 className="text-xl mb-3 md:mb-5">Contact Person</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full my-5 md:w-4/6">
                            <p>Maria Theresa: +62 821-5223-4714</p>
                            <p>Christopher: +62 857-9194-9799</p>
                            <p>Calysta: +62 857-0629-2939</p>
                        </div>
                        <h1 className="font-bold">2025 &copy; BUNKASAI ISTTS</h1>
                    </div>
                    <div className="w-11/12 mx-auto mt-10 md:mt-0 md:border-0 md:pl-10">
                        <div className="flex flex-col md:flex-row md:justify-end">
                            <div className="mb-5 md:mb-0 md:mr-5">
                                <a href="https://instagram.com/bunkasaiistts" className="flex items-center" target="_blank">
                                    <img src="/instagram-logo.png" alt="" className="w-5 h-5 brightness-75" />
                                    <p className="mx-2">@bunkasaiistts</p>
                                </a>
                            </div>
                            <div className=" text-right">
                                <p className="mb-5">Jl. Ngagel Jaya Tengah No.73-77 · 0821-2290-7788</p>
                                <p className="mb-5">Surabaya, Jawa Timur, Indonesia</p>
                                <Link to={"/feedback-form"}><p className="mt-5 md:mt-0">Feedback</p></Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}