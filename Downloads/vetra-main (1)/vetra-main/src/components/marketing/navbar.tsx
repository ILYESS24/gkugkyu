import { NAV_LINKS } from "@/constants";
import { NavBar } from "../ui/tubelight-navbar";
import { Home, DollarSign, Zap, Cpu, Plug, HelpCircle } from "lucide-react";

const Navbar = () => {
    const navItems = [
        { name: "Home", url: "/", icon: Home },
        { name: "Features", url: "#features", icon: Zap },
        { name: "Technology", url: "#technology", icon: Cpu },
        { name: "Integrations", url: "#integrations", icon: Plug },
        { name: "Pricing", url: "#pricing", icon: DollarSign },
        { name: "FAQ", url: "#faq", icon: HelpCircle },
    ];

    return <NavBar items={navItems} />;
};

export default Navbar
