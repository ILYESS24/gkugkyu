"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Star, Check, Sparkles, Lightbulb, Target, Palette, Monitor, Megaphone, PenTool, BarChart3 } from "lucide-react";
import { LogoCloud } from "@/components/logo-cloud-3";
import Image from "next/image";

const HomePage = () => {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeNav, setActiveNav] = useState("#home");

    const faqs = [
        {
            question: "What services does Awake Agency offer?",
            answer: "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance."
        },
        {
            question: "How long does a typical project take?",
            answer: "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance."
        },
        {
            question: "How is pricing structured at Awake Agency?",
            answer: "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance."
        },
        {
            question: "Do you offer ongoing support after project completion?",
            answer: "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance."
        },
        {
            question: "How often will I receive updates on my project?",
            answer: "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance."
        },
        {
            question: "How do I get started with Awake Agency?",
            answer: "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance."
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

    const heroAvatars = [
        { alt: "Creative Director", src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80" },
        { alt: "Product Designer", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
        { alt: "AI Engineer", src: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80" },
        { alt: "Brand Strategist", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    ];

    const navItems = [
        { label: "Home", href: "#home" },
        { label: "About us", href: "#about-us" },
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Team", href: "#team" },
        { label: "Pricing", href: "#pricing" },
        { label: "Awards", href: "#award" },
    ];

    return (
        <div className="min-h-screen w-full relative bg-white">
            {/* Gradient Background */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-yellow-50 via-white to-purple-50 opacity-50" />

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
                    onClick={() => router.push("/register")}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-gray-900 transition-colors"
                >
                    Get Started
                    <span className="inline-flex w-7 h-7 rounded-full bg-white text-gray-900 items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                    </span>
                </button>
            </div>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 px-6 z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="mb-8">
                        <p className="text-[clamp(3rem,8vw,5.5rem)] leading-[1.05] font-semibold text-gray-900">
                            Building bold brands with
                        </p>
                        <p
                            className="text-[clamp(3rem,8vw,5.5rem)] leading-[1.05] text-gray-900 italic font-normal"
                            style={{ fontFamily: "'Instrument Serif', serif" }}
                        >
                            thoughtful design
                        </p>
                    </div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        At Awake, we help small startups tackle the world's biggest challenges with tailored solutions, guiding you from strategy to success in a competitive market.
                    </p>
                    <div className="flex items-center justify-center gap-8">
                        <button
                            onClick={() => router.push("/login")}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#6C49F8] to-[#8A57FF] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:opacity-90 transition"
                        >
                            <span>Get Started</span>
                            <span className="inline-flex w-8 h-8 rounded-full bg-white text-gray-900 items-center justify-center">
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {heroAvatars.map((avatar, i) => (
                                    <img
                                        key={i}
                                        src={avatar.src}
                                        alt={avatar.alt}
                                        className="w-11 h-11 rounded-full border-2 border-white object-cover shadow"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                            </div>
                            <p className="text-sm text-gray-600">Trusted by 200+ clients</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Cloud Section */}
            <section className="w-full py-16 bg-white z-10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                    <p className="text-gray-600 text-xl font-normal">Loved by 100,000+ big and small brands around the world</p>
                </div>
                <div className="relative">
                    <LogoCloud
                        logos={brandLogos}
                        className="py-8"
                    />
                </div>
            </section>

            {/* About Us Section */}
            <section id="about-us" className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-8">
                            Crafting exceptional, well experienced & technology driven strategies to drive impactful results with
                        </h2>
                        <div className="flex items-center justify-center gap-6 text-gray-900 font-normal">
                            <div className="inline-flex items-center gap-3 rounded-full px-8 py-4 bg-[#F3E7FF] text-[#6F3AFF]">
                                <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#6F3AFF]">
                                    <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                                </span>
                                <span className="text-xl italic">Creativity</span>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full px-8 py-4 bg-[#E0ECFF] text-[#2E61B5]">
                                <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#2E61B5]">
                                    <Lightbulb className="w-6 h-6" strokeWidth={1.5} />
                                </span>
                                <span className="text-xl italic">Innovation</span>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full px-8 py-4 bg-[#DCF6E6] text-[#1B7A4F]">
                                <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#1B7A4F]">
                                    <Target className="w-6 h-6" strokeWidth={1.5} />
                                </span>
                                <span className="text-xl italic">Strategy</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { value: "+40", label: "Happy Clients" },
                            { value: "+15", label: "Years of experience" },
                            { value: "+12", label: "Awards won" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-[88px] leading-none font-light text-gray-900 mb-4 tracking-tight">
                                    {item.value}
                                </div>
                                <p className="text-lg text-gray-600">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center">
                        Where Innovation meets <span className="italic">excellence</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                        {[
                            { name: "Brand Strategy", color: "bg-[#F1E8FF]", Icon: Palette, iconColor: "#8452CF" },
                            { name: "Web Development", color: "bg-[#FCE7EC]", Icon: Monitor, iconColor: "#D16B7B" },
                            { name: "Digital Marketing", color: "bg-[#E6F0FF]", Icon: Megaphone, iconColor: "#3A6BC8" },
                            { name: "UI/UX Designing", color: "bg-[#FFEFD9]", Icon: PenTool, iconColor: "#E09549" },
                            { name: "Animation & Rendering", color: "bg-[#E7F6EA]", Icon: Sparkles, iconColor: "#1D855C" },
                        ].map(({ Icon, ...service }, i) => (
                            <div key={i} className={`${service.color} p-6 rounded-[28px] shadow-sm`}>
                                <div className="w-12 h-12 bg-white rounded-2xl mb-4 flex items-center justify-center">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: service.iconColor }} />
                                </div>
                                <p className="font-normal text-gray-900">{service.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#0C0F1A] rounded-[32px] p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white">
                        <div className="text-3xl font-normal leading-snug">
                            <div>Start Your Creative Journey with Us</div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push("/login")}
                                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                            >
                                <span>Get a Quote</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-gray-900 text-white items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </button>
                            <button className="flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                                <span>View Our Portfolio</span>
                                <span className="inline-flex w-7 h-7 rounded-full bg-white text-gray-900 items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section id="work" className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center">
                        How we transformed a small business's <span className="italic">online presence</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: "FlowBank", tags: ["UX Research", "Interface Design"] },
                            { name: "Academy.co", tags: ["Product Design", "Interaction Design"] },
                            { name: "Genome", tags: ["Brand identity design", "UX Research"] },
                            { name: "Hotto", tags: ["Visual Story telling", "Web & Mobile Design"] },
                        ].map((project, i) => (
                            <div key={i} className="bg-gray-100 rounded-2xl p-6">
                                <div className="w-full h-64 rounded-xl mb-4 overflow-hidden">
                                    <img 
                                        src={[
                                            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                                            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                                            "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
                                            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                                        ][i]}
                                        alt={project.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-normal text-gray-900 mb-4">{project.name}</h3>
                                <div className="flex gap-2">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center">
                        Meet the creative minds behind <span className="italic">our success</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Logan Dang", role: "Wordpress Developer" },
                            { name: "Ana Belić", role: "Social Media Specialist" },
                            { name: "Brian Hanley", role: "Product Designer" },
                            { name: "Darko Stanković", role: "UI Designer" },
                        ].map((member, i) => (
                            <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden">
                                <div className="w-full h-64 overflow-hidden">
                                    <img 
                                        src={[
                                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                                        ][i]}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-normal text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-gray-600 mb-4">{member.role}</p>
                                    <div className="flex gap-3">
                                        <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                            <span className="text-white text-xs">L</span>
                                        </a>
                                        <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                                            <span className="text-white text-xs">T</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_1fr] mb-14">
                        <div className="rounded-[32px] overflow-hidden bg-black text-white p-10 flex flex-col justify-end min-h-[360px]">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-300 mb-4">Customer Stories</p>
                            <p className="text-2xl md:text-3xl font-normal leading-snug mb-8">
                                Awake's expertise transformed my vision into success with usability, precision, and a deep understanding of my goals.
                            </p>
                            <div className="text-sm">
                                <p className="font-normal">Sarah Mitchell</p>
                                <p className="text-gray-400">CEO, Tech Solutions</p>
                            </div>
                        </div>

                        <div className="rounded-[32px] bg-[#F4E181] p-10 flex flex-col justify-between text-gray-900">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] mb-6">Facts & Numbers</p>
                                <p className="text-sm text-gray-800">
                                    clients recommend our design services.
                                </p>
                            </div>
                            <div className="text-[72px] leading-none font-light">91%</div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <div className="rounded-[32px] bg-[#181818] text-white p-10 flex flex-col gap-6">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Customer Stories</p>
                                <p className="text-2xl font-normal">Their creativity and attention to detail transformed our brand completely!</p>
                            </div>
                            <div className="rounded-2xl bg-white/10 border border-white/20 h-48 flex items-center justify-center overflow-hidden">
                                <img 
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80"
                                    alt="Client testimonial"
                                    className="w-full h-full object-cover opacity-50"
                                />
                            </div>
                        </div>

                        <div className="rounded-[32px] bg-gray-50 p-10">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Customer Stories</p>
                            <p className="text-2xl text-gray-900 mb-6">
                                “Awake Design Agency brought our ideas to life with exceptional creativity and precision, exceeding expectations.”
                            </p>
                            <div className="text-sm text-gray-600">
                                <p className="text-gray-900 font-normal">Sarah Mitchell</p>
                                <p>Marketing Head at TalentConnect</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center">
                        Pick the plan that fits your <span className="italic">needs</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#F4E181] rounded-2xl p-8">
                            <div className="mb-6">
                                <span className="px-4 py-2 bg-white/50 rounded-full text-sm text-gray-900">Basic Plan</span>
                            </div>
                            <h3 className="text-5xl font-normal text-gray-900 mb-8">
                                $2500<span className="text-2xl text-gray-600">/month</span>
                            </h3>
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors mb-8"
                            >
                                <span>Get Started</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                            <div>
                                <p className="text-sm text-gray-600 mb-4">Features</p>
                                <ul className="space-y-3">
                                    {["20+ design concepts", "3-5 day delivery", "Monthly revisions", "Dedicated support", "Source files"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-gray-900" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-[#1E3A5F] text-white rounded-2xl p-8">
                            <div className="mb-6">
                                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Pro Plan</span>
                            </div>
                            <h3 className="text-5xl font-normal mb-8">
                                $3500<span className="text-2xl text-gray-300">/month</span>
                            </h3>
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors mb-8"
                            >
                                <span>Get Started</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                            <div>
                                <p className="text-sm text-gray-300 mb-4">Features</p>
                                <ul className="space-y-3">
                                    {["Unlimited design concepts", "Priority delivery", "Bi-weekly revisions", "24/7 premium support", "Advanced analytics", "Custom integrations"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center">
                        Got questions?<br />We've got <span className="italic">answers</span>
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section id="award" className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-16 text-center">
                        Accolades and achievements celebration our <span className="italic">design excellence</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Webflow Awards", description: "Celebrated for cutting-edge interaction design and seamless user experiences.", year: "2025" },
                            { title: "Dribbble Awards", description: "Recognized for creative excellence and innovative design solutions", year: "2024" },
                            { title: "awwwards Awards", description: "Honored with the Best Website Design for creativity, usability, and innovation.", year: "2023" },
                        ].map((award, i) => (
                            <div key={i} className="bg-gray-100 p-8 rounded-2xl">
                                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500">
                                    <span className="text-white text-xl">🏆</span>
                                </div>
                                <h3 className="text-xl font-normal text-gray-900 mb-2">{award.title}</h3>
                                <p className="text-gray-600 mb-4">{award.description}</p>
                                <p className="text-gray-900 font-normal">{award.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-white z-10 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-4xl md:text-6xl font-normal text-gray-900 mb-6">
                        Innovative Solutions for <span className="italic">Your Brand</span>
                    </h3>
                    <p className="text-xl text-gray-600 mb-8">
                        Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your business unforgettable in every interaction.
                    </p>
                    <button
                        onClick={() => router.push("/login")}
                        className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-900 transition-colors mx-auto"
                    >
                        <span>Get a Free Proposal</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 px-6 z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold mb-4">Awake</div>
                            <p className="text-gray-600 mb-4">
                                Empowering businesses with innovative solutions. Let's create something amazing together.
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
                            <h4 className="font-normal text-gray-900 mb-4">Sitemap</h4>
                            <ul className="space-y-2">
                                <li><a href="#about-us" className="text-gray-600 hover:text-gray-900">About us</a></li>
                                <li><a href="#work" className="text-gray-600 hover:text-gray-900">Work</a></li>
                                <li><a href="#services" className="text-gray-600 hover:text-gray-900">Services</a></li>
                                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-normal text-gray-900 mb-4">Other Pages</h4>
                            <ul className="space-y-2">
                                <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                                <li><a href="/404" className="text-gray-600 hover:text-gray-900">Error 404</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-normal text-gray-900 mb-4">Contact Details</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>81 Rivington Street London EC2A 3AY</li>
                                <li><a href="mailto:hello@awake.agency" className="hover:text-gray-900">hello@awake.agency</a></li>
                                <li><a href="tel:01051923556" className="hover:text-gray-900">0105 192 3556</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">©2025 Awake. All Rights Reserved.</p>
                        <div className="flex gap-6 text-sm">
                            <a href="/style-guide" className="text-gray-600 hover:text-gray-900">Style Guide</a>
                            <a href="/licenses" className="text-gray-600 hover:text-gray-900">Licenses</a>
                            <a href="/changelog" className="text-gray-600 hover:text-gray-900">Changelog</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
