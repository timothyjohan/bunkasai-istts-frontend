import { Link, useNavigate, useLocation } from "react-router-dom";
import { changePage } from "../app/pageSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import NavLinkButton from "./NavLinkButton";
import DropdownItemButton from "./DropdownItemButton";
import MobileMenuItemButton from "./MobileMenuItemButton";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [showMenu, setShowMenu] = useState(false);
    const [showMenuTransition, setShowMenuTransition] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Function to check token status
    const checkTokenStatus = () => {
        const token = Cookies.get('token');
        setHasToken(!!token);
    };

    // Check token on component mount and when location changes
    useEffect(() => {
        checkTokenStatus();
        
        // Create custom event listener for token changes
        const handleTokenChange = () => {
            checkTokenStatus();
        };

        // Listen for storage events (in case token is changed in another tab)
        window.addEventListener('storage', handleTokenChange);
        
        // Custom event for token updates
        window.addEventListener('tokenUpdated', handleTokenChange);

        return () => {
            window.removeEventListener('storage', handleTokenChange);
            window.removeEventListener('tokenUpdated', handleTokenChange);
        };
    }, [location]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const toHome = () => {
        dispatch(changePage(0));
        navigate("/");
        setShowMenu(false);
    };
    const toTenant = () => {
        dispatch(changePage(1));
        navigate("/tenant-conf");
        setShowMenu(false);
    };
    // const toComp = () => {
    //     dispatch(changePage(2));
    //     navigate("/competition-select");
    //     setShowMenu(false);
    // };

    const toLogin = () => {
        dispatch(changePage(3));
        navigate("/login");
        setShowMenu(false);
    }

    const toTicket = () => {
        dispatch(changePage(4));
        navigate("/buy-ticket");
        setShowMenu(false);
    }
    
    const toProfile = () => {
        // Profile functionality placeholder
        setShowProfileDropdown(false);
        navigate("/profile");
    }
    
    const handleLogout = () => {
        Cookies.remove('token');
        setHasToken(false);
        // Dispatch custom event to inform other components
        window.dispatchEvent(new Event('tokenUpdated'));
        navigate('/');
        setShowProfileDropdown(false);
    }

    useEffect(()=>{
        setShowMenuTransition(showMenu)
    },[showMenu])

    // Check token status before rendering to ensure latest state
    useEffect(() => {
        checkTokenStatus();
    }, []);

    return (
        <>
            <div className="fixed w-full z-50 bg-neutral-800/80">
            <nav className="w-11/12 mx-auto pb-2 mt-2 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="bunkasai-logo.png"
                        className="xl:w-20 xl:h-20 w-16 h-16 object-contain mx-5"
                        alt="Logo"
                    />
                </div>
                <div className="hidden md:flex items-center text-neutral-300">
                    <NavLinkButton onClick={toHome} text="HOME" />
                    <NavLinkButton onClick={toTenant} text="TENANT" />
                    <NavLinkButton onClick={toComp} text="COMPETITION" />
                    {/* <NavLinkButton onClick={toTicket} text="TICKET" /> */}
                    {hasToken ? (
                        <div className="relative mx-5">
                            <div 
                                className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer transition-all hover:scale-110"
                                onClick={toggleProfileDropdown}
                            >
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-neutral-700 rounded-md shadow-lg py-1 z-50">
                                    <DropdownItemButton onClick={toProfile} text="PROFILE" />
                                    <DropdownItemButton onClick={handleLogout} text="LOGOUT" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLinkButton onClick={toLogin} text="LOGIN" />
                    )}
                </div>
                <div className="md:hidden z-50">
                    <img
                        src="/burger_menu.png"
                        className={`w-10 h-10 mr-4 cursor-pointer opacity-60 transition-all transform ${showMenu ? 'rotate-90' : 'rotate-0'}`}
                        alt="Menu"
                        onClick={toggleMenu}
                    />
                </div>
            </nav>
            {/* Dropdown menu */}
            {showMenu && (
                <div className={`md:hidden ${showMenuTransition ? 'opacity-100': 'opacity-0' } mt-0 absolute top-16 right-0 w-full text-neutral-100 bg-neutral-800/95 shadow-md rounded-xl transition-opacity duration-300 z-50`}>
                    <MobileMenuItemButton
                        onClick={toHome}
                        text="HOME"
                        className="border-b border-neutral-500"
                    />
                    <MobileMenuItemButton
                        onClick={toTenant}
                        text="TENANT"
                        className="border-b border-neutral-500"
                    />
                    {/* <MobileMenuItemButton
                        onClick={toComp}
                        text="COMPETITION"
                    /> */}
                    {/* <MobileMenuItemButton
                        onClick={toTicket}
                        text="TICKET"
                    /> */}
                    {hasToken ? (
                        <>
                            <MobileMenuItemButton
                                onClick={toProfile}
                                text="PROFILE"
                                className="border-t border-neutral-500"
                            />
                            <MobileMenuItemButton
                                onClick={handleLogout}
                                text="LOGOUT"
                            />
                        </>
                    ) : (
                        <MobileMenuItemButton
                            onClick={toLogin}
                            text="LOGIN"
                            className="border-t border-neutral-500"
                        />
                    )}
                </div>
            )}
            <div 
                className={`bg-neutral-800 opacity-0 transition-all duration-700 blur-xl  ${showMenu ? 'h-screen w-full mx-auto opacity-80' : ''}  z-10`}
                onClick={()=>setShowMenu(false)}
            >
            </div>
        </div>
        </>
    );
}
