"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegAddressCard } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { Button } from "../ui/button";
import { JubarexContext, JubarexContextType } from "@/app/context";
import { useContext } from "react";

type PropTypes = {
    mobile?: boolean;
};

const NavigationLinks = ({ mobile = false }: PropTypes) => {
    const { logout } = useContext(JubarexContext) as JubarexContextType;

    const pathname = usePathname();

    const iconSize = mobile ? 20 : 24;
    const textSize = mobile ? "text-xs" : "text-sm";

    return (
        <ul className="nav-links">
            <Link
                href="/"
                className={`nav-link ${
                    pathname === "/" && "selected-nav-link"
                }`}
            >
                <FaHouse size={iconSize} />
                <p className={textSize}>Home</p>
            </Link>
            <Link
                href="/posts"
                className={`nav-link ${
                    pathname === "/posts" && "selected-nav-link"
                }`}
            >
                <FaRegAddressCard size={iconSize} />
                <p className={textSize}>Posts</p>
            </Link>
            <Link
                href="/artefacts"
                className={`nav-link ${
                    pathname === "/categories" && "selected-nav-link"
                }`}
            >
                <TbCategoryFilled size={iconSize} />
                <p className={textSize}>Artefacts</p>
            </Link>
            {/* <Link
                href="/about"
                className={`nav-link ${
                    pathname === "/about" && "selected-nav-link"
                }`}
            >
                <FaRegAddressCard size={iconSize} />
                <p className={textSize}>About</p>
            </Link> */}
           

            {/* <Button onClick={logout} className={textSize}>
                <IoMdContact size={iconSize} /> Logout
            </Button> */}
        </ul>
    );
};

export default NavigationLinks;
