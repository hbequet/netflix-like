import React, { useState } from 'react';
import SearchBar from "../movies/SearchBar.jsx";
import CartButton from "./CartButton.jsx";
import {NavLink, useNavigate} from 'react-router-dom';
import Button from "./Button.jsx";

function Navbar({movies, cartItems, onRemoveFromCart}) {
    const [isScrolled, setIsScrolled] = useState(false);
    let navigate = useNavigate();

    const isSet = localStorage.getItem('user') !== null;

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300
${
            isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <NavLink to="/">
                            <h1 className="text-primary text-3xl font-bold tracking-tight">
                                NETFLUX
                            </h1>
                        </NavLink>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <NavLink to="/"
                                         className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }
                                >Accueil </NavLink>
                            </li>
                            <li>
                                <NavLink to="/my-rentals"
                                         className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }
                                >Mes locations</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        <SearchBar movies={movies} />
                        {isSet && (
                            <CartButton cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
                        )}

                        <NavLink to={"/login"}>
                            {isSet && (
                                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
                                    <span className="text-sm font-bold">U</span>
                                </div>
                            ) || (
                                <Button className="w-20 h-10" onClick={() => navigate("/login")}>Connexion</Button>
                            )
                            }
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;