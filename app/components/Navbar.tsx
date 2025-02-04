"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiListUl, BiX } from "react-icons/bi";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const categoriesRef = useRef<HTMLLIElement>(null);
    const profileRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                categoriesRef.current && !categoriesRef.current.contains(event.target as Node)
            ) {
                setCategoriesOpen(false);
            }
            if (
                profileRef.current && !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 ${styles.navbar}`}>
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/assets/images/FreshParisLOGO.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        className="cursor-pointer"
                    />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl"
                >
                    {menuOpen ? <BiX /> : <BiListUl />}
                </button>

                {/* Navigation Menu */}
                <nav
                    id="navbar"
                    className={`absolute md:static bg-white md:flex md:items-center md:space-x-6 transition-all duration-300 ${
                        menuOpen ? "top-16 left-0 w-full shadow-md" : "hidden md:flex"
                    }`}
                >
                    <ul className="md:flex space-y-4 md:space-y-0 md:space-x-6 text-gray-700 ">
                        <li>
                            <Link href="/" className="navbar-link sidebar-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="navbar-link sidebar-link">
                                About Us
                            </Link>
                        </li>

                        {/* Categories Dropdown */}
                        <li
                            ref={categoriesRef}
                            className="relative group navbar-link sidebar-link"
                            onMouseEnter={() => setCategoriesOpen(true)}
                            onMouseLeave={() => setCategoriesOpen(false)}
                        >
                            <button className="navbar-link sidebar-link">Categories</button>
                            {categoriesOpen && (
                                <ul className="absolute left-0 top-full bg-white shadow-md p-2 space-y-2 flex-col w-40 hidden group-hover:flex z-50">
                                    <li>
                                        <Link href="/equipements" className="hover:text-blue-500">
                                            Equipements
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/green-spaces" className="hover:text-blue-500">
                                            Green Spaces
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/fontaines" className="hover:text-blue-500">
                                            Fountains
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Profile Dropdown */}
                        <li
                            ref={profileRef}
                            className="relative navbar-link sidebar-link"
                            onMouseEnter={() => setProfileOpen(true)}
                            onMouseLeave={() => setProfileOpen(false)}
                        >
                            <button className="navbar-link sidebar-link flex items-center space-x-2">
                                <Image
                                    src="/assets/images/users/user1.jpg"
                                    alt="User"
                                    width={31}
                                    height={31}
                                    className="rounded-full"
                                />
                                <span>Nour El Imen</span>
                            </button>
                            {profileOpen && (
                                <ul  className="absolute left-0 top-8 bg-white shadow-md p-2 space-y-2 hidden group-hover:flex flex-col w-40">
                                    <li>
                                        <Link href="/profile" className="hover:text-blue-500">
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/balance" className="hover:text-blue-500">
                                            My Balance
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/inbox" className="hover:text-blue-500">
                                            Inbox
                                        </Link>
                                    </li>
                                    <li className="border-t"></li>
                                    <li>
                                        <Link href="/settings" className="hover:text-blue-500">
                                            Account Settings
                                        </Link>
                                    </li>
                                    <li className="border-t"></li>
                                    <li>
                                        <Link href="/logout" className="hover:text-red-500">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
