"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Star, Check, Sparkles, Lightbulb, Target, Palette, Monitor, Megaphone, PenTool, BarChart3, Code, Image, Video, FileText, Bot, Layers, Zap } from "lucide-react";
import { LogoCloud } from "@/components/logo-cloud-3";
import { motion } from "framer-motion";
import { Skiper19 } from "@/components/svg-follow-scroll";
import { MagicText } from "@/components/ui/magic-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";

// Animation variants for scroll animations
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
};

const HomePage = () => {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeNav, setActiveNav] = useState("#home");

    const faqs = [
        {
            question: "How much time will AURION save me?",
            answer: "20+ hours per week. Everything in one place instead of switching between 10+ tools."
        },
        {
            question: "Can AURION replace all my tools?",
            answer: "Yes. Website builders, content tools, code editors, AI generators—all consolidated. Most users cancel 5-8 subscriptions in their first week."
        },
        {
            question: "What if I'm not technical?",
            answer: "No problem. Describe what you want, AI builds it. Many non-technical founders have built $50K+/month apps."
        },
        {
            question: "How powerful are the AI models?",
            answer: "We use GPT-4, Claude, and specialized models for code, images, and video. Always updated to the latest."
        },
        {
            question: "What happens if I cancel?",
            answer: "You own everything. Export all your code, content, and projects at any time. No lock-in."
        },
        {
            question: "How does AURION compare to separate tools?",
            answer: "Separate tools: 10+ subscriptions ($200-500/month), constant switching, scattered files. AURION: one platform, one price, 20+ hours saved weekly."
        },
        {
            question: "Can I use AURION for client work?",
            answer: "Yes. Many agencies deliver projects 3x faster. Pro plan includes team collaboration and unlimited projects."
        },
        {
            question: "Is there a free trial?",
            answer: "Yes. Start building immediately. 30-day money-back guarantee if we don't save you time and money."
        }
    ];

    const brandLogos = [
        { alt: "OpenAI" },
        { alt: "Anthropic" },
        { alt: "Google DeepMind" },
        { alt: "Hugging Face" },
        { alt: "Midjourney" },
        { alt: "Stability AI" },
        { alt: "Cohere" },
        { alt: "Perplexity" },
        { alt: "Character.AI" },
        { alt: "Replicate" },
    ];


    const navItems = [
        { label: "Home", href: "#home" },
        { label: "About us", href: "#about-us" },
        { label: "Services", href: "#services" },
        { label: "Pricing", href: "#pricing" },
    ];

    return (
        <div className="min-h-screen w-full relative bg-white">

            {/* Logo AURION - Top Left */}
            <div className="fixed top-6 left-6 z-50">
                <div className="text-2xl font-bold text-gray-900">AURION</div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-4">
                <div className="inline-flex items-center bg-gradient-to-r from-[#DAEEF4] via-[#F2F7FC] to-[#FBF0DB] rounded-full p-1 shadow-lg border border-white/70">
                    <div className="flex items-center gap-1 bg-white/70 backdrop-blur rounded-full px-2 py-1 text-sm text-gray-600">
                        <NavigationMenu className="flex-1">
                            <NavigationMenuList className="space-x-0">
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.href}>
                                        <NavigationMenuLink
                                            href={item.href}
                                            onClick={() => setActiveNav(item.href)}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "rounded-full px-4 py-2 text-sm transition-all bg-transparent text-gray-600 hover:text-gray-900",
                                                activeNav === item.href && "bg-white text-gray-900 shadow-sm"
                                            )}
                                        >
                                            {item.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </nav>

            {/* Get Started Button - Top Right */}
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center gap-3 bg-[#212121] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-black"
                >
                    <span>Let's Collaborate</span>
                    <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                        <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                    </span>
                </button>
            </div>

            {/* SVG Follow Scroll Effect */}
            <Skiper19 />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 px-6 z-10 bg-transparent">
                <div className="max-w-5xl mx-auto relative">
                    <GlowingEffect disabled={false} proximity={100} spread={40} blur={20} borderWidth={1} />
                    <motion.div className="mb-8" {...fadeInUp}>
                        <h1 className="text-[clamp(3rem,8vw,5.5rem)] leading-[1.1] font-bold text-gray-900 mb-2 text-left">
                            <span className="block text-left">Build everything</span>
                            <span className="block font-serif italic font-normal lowercase text-left">in one place</span>
                        </h1>
                    </motion.div>
                    <motion.div className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 text-left" {...fadeInUp}>
                        <p className="text-lg md:text-xl leading-relaxed text-left">
                            Websites, apps, content, AI agents. <strong className="text-gray-900">All powered by advanced AI.</strong>
                        </p>
                    </motion.div>
                    <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                        <button
                            onClick={() => router.push("/login")}
                            className="inline-flex items-center gap-3 bg-[#212121] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-black"
                        >
                            <span>Let's Collaborate</span>
                            <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                                <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                            </span>
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                                ].map((src, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                                    >
                                        <img src={src} alt={`Client ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">
                                    <strong className="text-gray-900">10,000+ creators</strong> building faster
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Cloud Section */}
            <section className="w-full py-16 bg-transparent z-10 relative overflow-hidden">
                <motion.div className="max-w-7xl mx-auto px-6 text-center mb-12" {...fadeInUp}>
                    <MagicText 
                        text="Powered by the world's most advanced AI models"
                        className="text-gray-600 text-xl font-normal"
                        wordClassName="text-xl"
                    />
                </motion.div>
                <div className="relative">
                    <LogoCloud
                        logos={brandLogos}
                        className="py-8"
                    />
                </div>
            </section>

            {/* About Us Section */}
            <section id="about-us" className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-7xl mx-auto relative">
                    <GlowingEffect disabled={false} proximity={150} spread={30} blur={15} borderWidth={1} />
                    <motion.div className="text-center mb-16" {...fadeInUp}>
                        <div className="text-4xl md:text-6xl font-normal text-gray-900 mb-6">
                            <MagicText 
                                text="Replace 10+ tools. Save 20+ hours per week."
                                className="text-4xl md:text-6xl"
                                wordClassName="text-4xl md:text-6xl"
                            />
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            <strong className="text-gray-900">Everything you need to build your business—powered by AI.</strong>
                        </p>
                        <motion.div className="flex items-center justify-center gap-6 text-gray-900 font-normal flex-wrap" {...fadeInUp}>
                            <div className="inline-flex items-center gap-3 rounded-full px-8 py-4 bg-[#F3E7FF] text-[#6F3AFF]">
                                <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#6F3AFF]">
                                    <Zap className="w-6 h-6" strokeWidth={1.5} />
                                </span>
                                <span className="text-xl italic">All-in-One</span>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full px-8 py-4 bg-[#E0ECFF] text-[#2E61B5]">
                                <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#2E61B5]">
                                    <Bot className="w-6 h-6" strokeWidth={1.5} />
                                </span>
                                <span className="text-xl italic">AI-Powered</span>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full px-8 py-4 bg-[#DCF6E6] text-[#1B7A4F]">
                                <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#1B7A4F]">
                                    <Layers className="w-6 h-6" strokeWidth={1.5} />
                                </span>
                                <span className="text-xl italic">Integrated</span>
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" {...fadeInUp}>
                        {[
                            { value: "10K+", label: "Active Creators", sublabel: "Building daily" },
                            { value: "50K+", label: "Projects Launched", sublabel: "In 2024 alone" },
                            { value: "91%", label: "Save 20+ Hours/Week", sublabel: "Average time saved" },
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="text-[88px] leading-none font-light text-gray-900 mb-2 tracking-tight">
                                    {item.value}
                                </div>
                                <p className="text-lg font-medium text-gray-900 mb-1">{item.label}</p>
                                <p className="text-sm text-gray-500">{(item as any).sublabel}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-7xl mx-auto relative">
                    <GlowingEffect disabled={false} proximity={150} spread={35} blur={20} borderWidth={2} />
                    <motion.div className="text-4xl md:text-6xl font-normal text-gray-900 mb-8 text-center" {...fadeInUp}>
                        <MagicText 
                            text="8 tools. One platform."
                            className="text-4xl md:text-6xl"
                            wordClassName="text-4xl md:text-6xl"
                        />
                    </motion.div>
                    <motion.p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto" {...fadeInUp}>
                        <strong className="text-gray-900">Everything you need to build your business.</strong>
                    </motion.p>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                        {[
                            { name: "AI Website Builder", description: "Launch sites in minutes", benefit: "Save 40+ hours", color: "bg-[#F1E8FF]", Icon: Monitor, iconColor: "#8452CF" },
                            { name: "App Creator", description: "Build apps with AI", benefit: "Ship 10x faster", color: "bg-[#FCE7EC]", Icon: Code, iconColor: "#D16B7B" },
                            { name: "AI Content Studio", description: "Generate text, images, videos", benefit: "50+ pieces/day", color: "bg-[#E6F0FF]", Icon: FileText, iconColor: "#3A6BC8" },
                            { name: "AI Agents", description: "Automate your business", benefit: "Work 24/7", color: "bg-[#FFEFD9]", Icon: Bot, iconColor: "#E09549" },
                            { name: "Smart Code Editor", description: "AI-powered coding", benefit: "Code like a pro", color: "bg-[#E7F6EA]", Icon: Code, iconColor: "#1D855C" },
                            { name: "AI Image Generator", description: "Create visuals instantly", benefit: "No design skills", color: "bg-[#F3E7FF]", Icon: Image, iconColor: "#6F3AFF" },
                            { name: "AI Video Creator", description: "Generate videos fast", benefit: "Pro videos in minutes", color: "bg-[#E0ECFF]", Icon: Video, iconColor: "#2E61B5" },
                            { name: "Component Library", description: "10,000+ UI components", benefit: "Build faster", color: "bg-[#DCF6E6]", Icon: Layers, iconColor: "#1B7A4F" },
                        ].map(({ Icon, ...service }, i) => (
                            <motion.div 
                                key={i} 
                                className={`${service.color} p-6 rounded-[28px] shadow-sm relative`}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            >
                                <GlowingEffect disabled={false} proximity={60} spread={20} blur={12} borderWidth={1} />
                                <div className="w-12 h-12 bg-white rounded-2xl mb-4 flex items-center justify-center">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: service.iconColor }} />
                                </div>
                                <p className="font-semibold text-gray-900 mb-1">{service.name}</p>
                                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{service.description}</p>
                                <p className="text-xs font-medium text-gray-500">✓ {(service as any).benefit}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div 
                        className="bg-[#0C0F1A] rounded-[32px] p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <GlowingEffect disabled={false} proximity={100} spread={50} blur={25} borderWidth={2} />
                        <div className="text-3xl font-normal leading-snug">
                            <MagicText 
                                text="Stop wasting 20+ hours per week switching tools."
                                className="text-3xl"
                                wordClassName="text-3xl"
                            />
                            <p className="text-lg text-white/80 mt-4">
                                Join thousands who've <strong>reclaimed their time.</strong>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push("/login")}
                                className="inline-flex items-center gap-3 bg-[#212121] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-black"
                            >
                                <span>Let's Collaborate</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                                    <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-6xl mx-auto relative">
                    <GlowingEffect disabled={false} proximity={120} spread={30} blur={18} borderWidth={2} />
                    {/* Mid-Section */}
                    <motion.div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_1fr] mb-6" {...fadeInUp}>
                        <motion.div 
                            className="rounded-[32px] overflow-hidden bg-[#181818] text-white p-10 flex flex-col justify-end min-h-[400px] relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <GlowingEffect disabled={false} proximity={80} spread={25} blur={15} borderWidth={1.5} variant="white" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
                            <div className="absolute inset-0 opacity-30 z-0">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
                            </div>
                            <div className="relative z-20">
                                <p className="text-2xl md:text-3xl font-normal leading-snug mb-6">
                                    "AURION replaced 8 tools. Built my SaaS in 3 days instead of 3 months."
                                </p>
                                <div className="text-sm">
                                    <p className="font-semibold text-white">Alex Chen</p>
                                    <p className="text-gray-300">Founder • $2M ARR</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="rounded-[32px] bg-[#F4E181] p-10 flex flex-col justify-between text-gray-900 relative"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <GlowingEffect disabled={false} proximity={80} spread={25} blur={15} borderWidth={1.5} />
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] mb-6">FACTS & NUMBERS</p>
                            </div>
                            <div>
                                <div className="text-[72px] leading-none font-light text-gray-900 mb-4">$2.4M</div>
                                <p className="text-sm text-gray-800 font-medium">
                                    Average revenue generated by AURION users in their first year.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Section */}
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...fadeInUp}>
                        <motion.div 
                            className="rounded-[32px] bg-[#181818] text-white p-10 flex flex-col gap-6 relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <GlowingEffect disabled={false} proximity={80} spread={25} blur={15} borderWidth={1.5} variant="white" />
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">SUCCESS STORY</p>
                                <p className="text-2xl font-normal mb-6">"Canceled 6 subscriptions. Saved $300/month. Built MVP in 48 hours."</p>
                                <div className="text-sm text-gray-300 mt-4">
                                    <p className="font-semibold text-white">Sarah Martinez</p>
                                    <p>Indie Hacker • 50K+ users</p>
                                </div>
                            </div>
                            <div className="rounded-2xl bg-white/10 border border-white/20 h-48 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-blue-200 via-yellow-200 to-orange-200 relative">
                                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400 rounded-full"></div>
                                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-yellow-300 rounded-full"></div>
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-orange-300 rounded-full"></div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="rounded-[32px] bg-gray-50 p-10 relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <GlowingEffect disabled={false} proximity={80} spread={25} blur={15} borderWidth={1.5} />
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">TRANSFORMATION</p>
                            <p className="text-2xl text-gray-900 mb-6">
                                "Zero coding. Built $50K/month app in 2 weeks. This is the future."
                            </p>
                            <div className="text-sm text-gray-600">
                                <p className="text-gray-900 font-semibold">Maria Rodriguez</p>
                                <p className="text-gray-500">Solo Founder • 200K+ downloads</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-7xl mx-auto relative">
                    <GlowingEffect disabled={false} proximity={150} spread={40} blur={20} borderWidth={1} />
                    <motion.div className="text-4xl md:text-6xl font-normal text-gray-900 mb-8 text-center" {...fadeInUp}>
                        <MagicText 
                            text="One platform. One price."
                            className="text-4xl md:text-6xl"
                            wordClassName="text-4xl md:text-6xl"
                        />
                    </motion.div>
                    <motion.p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto" {...fadeInUp}>
                        <strong className="text-gray-900">Replaces 10+ tools at a fraction of the cost.</strong>
                    </motion.p>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" {...fadeInUp}>
                        <motion.div 
                            className="bg-white border-2 border-gray-200 rounded-2xl p-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-semibold">Basic</span>
                                <span className="text-xs text-gray-500">Perfect Start</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-6 font-medium"><strong className="text-gray-900">€10/month.</strong> Perfect start.</p>
                            <div className="mb-4">
                                <h3 className="text-5xl font-normal text-gray-900 inline">
                                    €10<span className="text-2xl text-gray-600 font-normal">/month</span>
                                </h3>
                                <p className="text-sm text-gray-500 mt-2">Or €100/year (save 17%)</p>
                            </div>
                            <button
                                onClick={() => router.push(`/checkout?plan=basic&billing=monthly`)}
                                className="w-full inline-flex items-center justify-center gap-3 bg-[#212121] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-black mb-8"
                            >
                                <span>Subscribe Now</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                                    <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                                </span>
                            </button>
                            <div>
                                <p className="text-sm text-gray-900 mb-4 font-normal">Features</p>
                                <ul className="space-y-3">
                                    {["AI Website Builder (Basic)", "AI Content Generation (Limited)", "AI-Assisted Code Editor", "Component Library Access", "2 Projects", "Email Support"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-gray-900" />
                                            <span className="text-gray-700 font-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="bg-[#F4E181] rounded-2xl p-8"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold">Starter</span>
                                <span className="text-xs text-gray-500">Most Popular</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-6 font-medium"><strong className="text-gray-900">$29/month.</strong> Replaces $200+/month in tools.</p>
                            <div className="mb-4">
                                <h3 className="text-5xl font-normal text-gray-900 inline">
                                    $29<span className="text-2xl text-gray-600 font-normal">/month</span>
                                </h3>
                                <p className="text-sm text-gray-500 mt-2">Save $170+/month vs. separate tools</p>
                            </div>
                            <button
                                onClick={() => router.push(`/checkout?plan=starter&billing=monthly`)}
                                className="w-full inline-flex items-center justify-center gap-3 bg-[#212121] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-black mb-8"
                            >
                                <span>Subscribe Now</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                                    <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                                </span>
                            </button>
                            <div>
                                <p className="text-sm text-gray-900 mb-4 font-normal">Features</p>
                                <ul className="space-y-3">
                                    {["Website & App Builder", "AI Content Generation (Text, Image, Video)", "AI-Assisted Code Editor", "Basic AI Agents", "Component Library Access", "5 Projects", "Community Support"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-gray-900" />
                                            <span className="text-gray-700 font-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="bg-[#2563EB] text-white rounded-2xl p-8"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="px-4 py-2 bg-white text-[#2563EB] rounded-full text-sm font-semibold">Pro</span>
                                <span className="text-xs text-white/90 bg-white/20 px-3 py-1 rounded-full">Best Value</span>
                            </div>
                            <p className="text-sm text-white/90 mb-6 font-medium"><strong className="text-white">$99/month.</strong> Replaces $500+/month in tools.</p>
                            <div className="mb-4">
                                <h3 className="text-5xl font-normal mb-2 inline">
                                    $99<span className="text-2xl text-white/80 font-normal">/month</span>
                                </h3>
                                <p className="text-sm text-white/80 mt-2">Save $400+/month vs. enterprise tools</p>
                            </div>
                            <button
                                onClick={() => router.push(`/checkout?plan=pro&billing=monthly`)}
                                className="w-full inline-flex items-center justify-center gap-3 bg-[#212121] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-black mb-8"
                            >
                                <span>Subscribe Now</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                                    <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                                </span>
                            </button>
                            <div>
                                <p className="text-sm text-white mb-4 font-normal">Features</p>
                                <ul className="space-y-3">
                                    {["Everything in Starter", "Unlimited Projects", "Advanced AI Models Access", "Custom AI Agents", "Priority Support", "API Access", "Advanced Analytics", "Team Collaboration"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-white" />
                                            <span className="text-white font-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center" {...fadeInUp}>
                        <MagicText 
                            text="Questions?"
                            className="text-4xl md:text-6xl"
                            wordClassName="text-4xl md:text-6xl"
                        />
                    </motion.div>
                    <motion.div className="space-y-4" {...fadeInUp}>
                        {faqs.map((faq, i) => (
                            <motion.div 
                                key={i} 
                                className="border border-gray-200 rounded-xl overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-normal text-gray-900">{faq.question}</span>
                                    <ArrowUpRight
                                        className={`w-5 h-5 text-gray-600 transition-transform ${openFaq === i ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {openFaq === i && (
                                    <div className="p-6 pt-0 text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        className="rounded-3xl p-12 md:p-16 border border-gray-200 shadow-sm bg-white relative"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(232, 244, 248, 0.3) 0%, rgba(245, 240, 232, 0.3) 50%, rgba(255, 248, 231, 0.3) 100%)`,
                        }}
                        {...fadeInUp}
                    >
                        <GlowingEffect disabled={false} proximity={100} spread={45} blur={25} borderWidth={2} />
                        <div className="text-center">
                            <motion.div className="text-4xl md:text-5xl font-normal text-gray-900 mb-6" {...fadeInUp}>
                                <MagicText 
                                    text="Stop paying for 10+ tools."
                                    className="text-4xl md:text-5xl"
                                    wordClassName="text-4xl md:text-5xl"
                                />
                            </motion.div>
                            <motion.div className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto" {...fadeInUp}>
                                <p>
                                    <strong className="text-gray-900">Join 10,000+ creators</strong> who've reclaimed 20+ hours per week. <strong className="text-gray-700">All in one platform. One price.</strong>
                                </p>
                            </motion.div>
                            <button
                                onClick={() => router.push("/login")}
                                className="inline-flex items-center gap-3 bg-[#212121] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-black"
                            >
                                <span>Let's Collaborate</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white items-center justify-center flex-shrink-0">
                                    <ArrowUpRight className="w-4 h-4 text-[#212121]" />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-transparent border-t border-gray-200 py-12 px-6 z-10 relative w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold mb-4">AURION</div>
                            <p className="text-gray-600 mb-4">
                                Build your entire business in one place. Powered by AI.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <span className="text-white text-xs">f</span>
                                </a>
                                <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <span className="text-white text-xs">t</span>
                                </a>
                                <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <span className="text-white text-xs">in</span>
                                </a>
                                <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <span className="text-white text-xs">ig</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-normal text-gray-900 mb-4">Platform</h4>
                            <ul className="space-y-2">
                                <li><a href="#about-us" className="text-gray-600 hover:text-gray-900">About AURION</a></li>
                                <li><a href="#services" className="text-gray-600 hover:text-gray-900">Features</a></li>
                                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                                <li><a href="/login" className="text-gray-600 hover:text-gray-900">Get Started</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-normal text-gray-900 mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="/about" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                                <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                                <li><a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-normal text-gray-900 mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                                <li><a href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                                <li><a href="/cgv" className="text-gray-600 hover:text-gray-900">CGV</a></li>
                                <li><a href="/cookies" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
                                <li><a href="/legal" className="text-gray-600 hover:text-gray-900">Legal Notice</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">©2025 AURION. All Rights Reserved.</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</a>
                            <a href="/terms" className="text-gray-600 hover:text-gray-900">Terms</a>
                            <a href="/legal" className="text-gray-600 hover:text-gray-900">Legal</a>
                            <a href="/cookies" className="text-gray-600 hover:text-gray-900">Cookies</a>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-12 pt-8 border-t border-gray-200">
                    <div className="text-[clamp(6rem,15vw,12rem)] font-black text-center tracking-tight text-black w-full">
                        AURION
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
