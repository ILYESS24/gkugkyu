import { NAV_LINKS } from "@/constants";
import { NavBar } from "../ui/tubelight-navbar";
import { Home, DollarSign, Zap, BookOpen, Mail } from "lucide-react";

const Navbar = () => {
    const navItems = [
        { name: "Home", url: "/", icon: Home },
        { name: "Pricing", url: "#pricing", icon: DollarSign },
        { name: "Features", url: "#features", icon: Zap },
        { name: "Blog", url: "#blog", icon: BookOpen },
        { name: "Contact", url: "#contact", icon: Mail },
    ];

    return <NavBar items={navItems} />;
};

export default Navbar
