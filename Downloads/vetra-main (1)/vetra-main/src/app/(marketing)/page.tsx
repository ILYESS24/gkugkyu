"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Star, Check, Sparkles, Lightbulb, Target, Palette, Monitor, Megaphone, PenTool, BarChart3, Code, Image, Video, FileText, Bot, Layers, Zap } from "lucide-react";
import { LogoCloud } from "@/components/logo-cloud-3";
import { motion } from "framer-motion";
import { Skiper19 } from "@/components/svg-follow-scroll";
import { MagicText } from "@/components/ui/magic-text";

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
            question: "What is AURION and how does it work?",
            answer: "AURION is an all-in-one AI platform that creates professional websites and applications using the latest AI models. Instead of switching between multiple tools, you can build your entire business in one place - from website creation and content generation to code editing and AI agent deployment."
        },
        {
            question: "What AI models does AURION use?",
            answer: "AURION leverages the most powerful and latest AI models available, including advanced language models for content generation, image generation models for visual content, video generation capabilities, and specialized code models for development assistance. We continuously update our models to ensure you have access to cutting-edge AI technology."
        },
        {
            question: "Can I edit my website or app code manually?",
            answer: "Yes! AURION includes a powerful AI-assisted code editor that allows you to manually modify your applications. The editor features AI code suggestions, auto-completion, and an intelligent assistant to help you make changes efficiently, even if you're not a coding expert."
        },
        {
            question: "What types of content can I create with AURION?",
            answer: "AURION enables you to create text content with AI-powered writing assistance, generate images using advanced AI models, create videos with AI video generation, and develop complete websites and applications. All content creation tools are integrated into one seamless platform."
        },
        {
            question: "What are AI agents and how can I use them?",
            answer: "AI agents in AURION are intelligent assistants that can automate tasks, handle customer interactions, manage workflows, and perform various business functions. You can deploy custom AI agents tailored to your specific needs, all without leaving the AURION platform."
        },
        {
            question: "Do I need coding experience to use AURION?",
            answer: "No coding experience is required! AURION's AI-powered interface allows you to create professional websites and applications through intuitive design tools. However, if you want to customize further, our AI-assisted code editor makes manual modifications accessible even for beginners."
        },
        {
            question: "What component libraries are available?",
            answer: "AURION includes extensive integrated component libraries covering UI/UX elements, design patterns, templates, and pre-built modules. These libraries allow for extensive customization and modification of your projects without starting from scratch, saving you time and ensuring professional results."
        },
        {
            question: "How is pricing structured?",
            answer: "AURION offers flexible pricing plans to suit different needs - from individual creators to growing businesses. Plans include access to all core features with varying limits on usage, AI model access, and support levels. Check our pricing section for detailed information."
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
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveNav(item.href)}
                                className={`px-4 py-2 rounded-full transition-all ${
                                    activeNav === item.href
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Get Started Button - Top Right */}
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                >
                    <span>Get Started</span>
                    <span className="inline-flex w-7 h-7 rounded-full bg-white text-gray-900 items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                    </span>
                </button>
            </div>

            {/* SVG Follow Scroll Effect */}
            <Skiper19 />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 px-6 z-10 bg-transparent">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div className="mb-8" {...fadeInUp}>
                        <h1 className="text-[clamp(3rem,8vw,5.5rem)] leading-[1.1] font-semibold text-gray-900 mb-2 text-center">
                            <span className="block text-center">Create your entire</span>
                            <span className="block text-center">business with</span>
                            <span className="block font-serif italic font-normal text-center">powerful AI</span>
                        </h1>
                    </motion.div>
                    <motion.div className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 text-center" {...fadeInUp}>
                        <p className="text-lg md:text-xl leading-relaxed text-center">
                            AURION is the all-in-one AI platform that creates professional websites, applications, content, and AI agents. Stop switching between tools - build everything you need in one place with the latest and most powerful AI models.
                        </p>
                    </motion.div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                        <button
                            onClick={() => router.push("/login")}
                            className="group flex items-center gap-0 bg-[#6C49F8] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                        >
                            <span className="px-2">Get Started</span>
                            <span className="inline-flex w-10 h-10 rounded-full bg-white items-center justify-center ml-2 transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight className="w-4 h-4 text-[#6C49F8]" />
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
                                <p className="text-sm text-gray-600">Trusted by 10,000+ creators</p>
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
                <div className="max-w-7xl mx-auto">
                    <motion.div className="text-center mb-16" {...fadeInUp}>
                        <div className="text-4xl md:text-6xl font-normal text-gray-900 mb-8">
                            <MagicText 
                                text="Everything you need to build your business powered by the latest AI models"
                                className="text-4xl md:text-6xl"
                                wordClassName="text-4xl md:text-6xl"
                            />
                        </div>
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
                            { value: "10K+", label: "Active Users" },
                            { value: "50K+", label: "Projects Created" },
                            { value: "99%", label: "Satisfaction Rate" },
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="text-[88px] leading-none font-light text-gray-900 mb-4 tracking-tight">
                                    {item.value}
                                </div>
                                <p className="text-lg text-gray-600">{item.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center" {...fadeInUp}>
                        <MagicText 
                            text="Everything you need in one powerful platform"
                            className="text-4xl md:text-6xl"
                            wordClassName="text-4xl md:text-6xl"
                        />
                    </motion.div>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                        {[
                            { name: "Website Builder", description: "Create professional websites with AI", color: "bg-[#F1E8FF]", Icon: Monitor, iconColor: "#8452CF" },
                            { name: "App Creator", description: "Build applications with latest AI models", color: "bg-[#FCE7EC]", Icon: Code, iconColor: "#D16B7B" },
                            { name: "Content Generation", description: "Text, images, and videos with AI", color: "bg-[#E6F0FF]", Icon: FileText, iconColor: "#3A6BC8" },
                            { name: "AI Agents", description: "Deploy intelligent automation agents", color: "bg-[#FFEFD9]", Icon: Bot, iconColor: "#E09549" },
                            { name: "Code Editor", description: "AI-assisted manual code editing", color: "bg-[#E7F6EA]", Icon: Code, iconColor: "#1D855C" },
                            { name: "Image Generator", description: "Create stunning visuals with AI", color: "bg-[#F3E7FF]", Icon: Image, iconColor: "#6F3AFF" },
                            { name: "Video Creator", description: "Generate professional videos", color: "bg-[#E0ECFF]", Icon: Video, iconColor: "#2E61B5" },
                            { name: "Component Library", description: "Extensive UI/UX components", color: "bg-[#DCF6E6]", Icon: Layers, iconColor: "#1B7A4F" },
                        ].map(({ Icon, ...service }, i) => (
                            <motion.div 
                                key={i} 
                                className={`${service.color} p-6 rounded-[28px] shadow-sm`}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl mb-4 flex items-center justify-center">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: service.iconColor }} />
                                </div>
                                <p className="font-normal text-gray-900 mb-1">{service.name}</p>
                                <p className="text-sm text-gray-600">{service.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div 
                        className="bg-[#0C0F1A] rounded-[32px] p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="text-3xl font-normal leading-snug">
                            <MagicText 
                                text="Stop switching between tools. Build everything in one place."
                                className="text-3xl"
                                wordClassName="text-3xl"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push("/login")}
                                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            >
                                <span>Start Building</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-gray-900 text-white items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </button>
                            <button 
                                onClick={() => router.push("/login")}
                                className="flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:bg-white/5 active:scale-95"
                            >
                                <span>See Features</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white text-gray-900 items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Mid-Section */}
                    <motion.div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_1fr] mb-6" {...fadeInUp}>
                        <motion.div 
                            className="rounded-[32px] overflow-hidden bg-[#181818] text-white p-10 flex flex-col justify-end min-h-[400px] relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
                            <div className="absolute inset-0 opacity-30 z-0">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
                            </div>
                            <div className="relative z-20">
                                <p className="text-2xl md:text-3xl font-normal leading-snug mb-8">
                                    AURION transformed how I build my business. I created my entire website, generated all content, and deployed AI agents - all in one platform. No more switching between tools!
                                </p>
                                <div className="text-sm">
                                    <p className="font-normal">Alex Chen</p>
                                    <p className="text-gray-400">Founder of TechFlow</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="rounded-[32px] bg-[#F4E181] p-10 flex flex-col justify-between text-gray-900"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] mb-6">FACTS & NUMBERS</p>
                            </div>
                            <div>
                                <div className="text-[72px] leading-none font-light text-gray-900 mb-4">91%</div>
                                <p className="text-sm text-gray-800">
                                    of users build their entire business on AURION.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Section */}
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...fadeInUp}>
                        <motion.div 
                            className="rounded-[32px] bg-[#181818] text-white p-10 flex flex-col gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">CUSTOMER STORIES</p>
                                <p className="text-2xl font-normal mb-6">AURION's all-in-one platform saved me weeks of work. I built my app, generated content, and launched - all without leaving the platform!</p>
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
                            className="rounded-[32px] bg-gray-50 p-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">CUSTOMER STORIES</p>
                            <p className="text-2xl text-gray-900 mb-6">
                                "The AI-powered code editor is incredible. Even as a beginner, I could customize my app exactly how I wanted. AURION makes professional development accessible to everyone."
                            </p>
                            <div className="text-sm text-gray-600">
                                <p className="text-gray-900 font-normal">Maria Rodriguez</p>
                                <p>Entrepreneur & Creator</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-transparent z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center" {...fadeInUp}>
                        <MagicText 
                            text="Choose the plan that fits your needs"
                            className="text-4xl md:text-6xl"
                            wordClassName="text-4xl md:text-6xl"
                        />
                    </motion.div>
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" {...fadeInUp}>
                        <motion.div 
                            className="bg-[#F4E181] rounded-2xl p-8"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-4">
                                <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-normal">Starter</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-6">Perfect for individuals and small projects. Get started with all core features.</p>
                            <h3 className="text-5xl font-normal text-gray-900 mb-8">
                                $29<span className="text-2xl text-gray-600 font-normal">/month</span>
                            </h3>
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors mb-8"
                            >
                                <span>Get Started</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-gray-900 text-white items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
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
                            <div className="mb-4">
                                <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-normal">Pro</span>
                            </div>
                            <p className="text-sm text-white mb-6">For growing businesses. Unlimited projects and advanced AI models.</p>
                            <h3 className="text-5xl font-normal mb-8">
                                $99<span className="text-2xl text-white/80 font-normal">/month</span>
                            </h3>
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors mb-8"
                            >
                                <span>Get Started</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-gray-900 text-white items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
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
                            text="Got questions? We've got answers"
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
                        className="rounded-3xl p-12 md:p-16 border border-gray-200 shadow-sm bg-white"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(232, 244, 248, 0.3) 0%, rgba(245, 240, 232, 0.3) 50%, rgba(255, 248, 231, 0.3) 100%)`,
                        }}
                        {...fadeInUp}
                    >
                        <div className="text-center">
                            <motion.div className="text-4xl md:text-5xl font-normal text-gray-900 mb-6" {...fadeInUp}>
                                <MagicText 
                                    text="Ready to build your entire business in one place?"
                                    className="text-4xl md:text-5xl"
                                    wordClassName="text-4xl md:text-5xl"
                                />
                            </motion.div>
                            <motion.div className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto" {...fadeInUp}>
                                <MagicText 
                                    text="Join thousands of creators who've stopped switching between tools. Create websites, apps, content, and AI agents - all powered by the latest AI models, all in one platform."
                                    className="text-lg"
                                    wordClassName="text-lg"
                                />
                            </motion.div>
                            <button
                                onClick={() => router.push("/login")}
                                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                            >
                                <span>Start Building Now</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white text-gray-900 items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
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
                                The all-in-one AI platform that creates professional websites, applications, content, and AI agents. Build your entire business in one place.
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
                                <li><a href="/docs" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                                <li><a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                                <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                                <li><a href="/support" className="text-gray-600 hover:text-gray-900">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-normal text-gray-900 mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="mailto:hello@aurion.ai" className="hover:text-gray-900">hello@aurion.ai</a></li>
                                <li><a href="/contact" className="hover:text-gray-900">Get in Touch</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">©2025 AURION. All Rights Reserved.</p>
                        <div className="flex gap-6 text-sm">
                            <a href="/style-guide" className="text-gray-600 hover:text-gray-900">Style Guide</a>
                            <a href="/licenses" className="text-gray-600 hover:text-gray-900">Licenses</a>
                            <a href="/changelog" className="text-gray-600 hover:text-gray-900">Changelog</a>
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
