"use client";

export const dynamic = 'force-dynamic';

import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { AnomalousMatterHero } from "@/components/anomalous-matter-hero";
import { AIChatInput } from "@/components/ui/ai-chat-input";
import { Globe } from "@/components/ui/globe";
import { Pricing } from "@/components/pricing";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { BentoGridShowcase } from "@/components/bento-product-features";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { Features } from "@/components/features-8";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import IntegrationsSection from "@/components/integrations-section";
import PinkyNewsletter from "@/components/pinky-newsletter";
import { useEffect } from "react";
import { renderCanvas } from "@/components/canvas-effect";

const HomePage = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const timer = setTimeout(() => {
            renderCanvas();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-black min-h-screen relative overflow-x-hidden">
            <canvas id="canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
            
            {/* ========== HERO SECTION ========== */}
            <section className="relative w-full h-screen z-[1] flex items-center justify-center">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <GooeyText 
                        texts={["PROMPTING", "IS ALL", "YOU NEED"]}
                        morphTime={1}
                        cooldownTime={0.25}
                        className="w-full"
                        textClassName="text-white"
                    />
                </div>
            </section>

            {/* ========== TRANSITION VISUAL ========== */}
            <AnomalousMatterHero 
                title="The Future of AI Interaction"
                subtitle="Experience the power of intelligent prompting."
                description="AURION transforms how you interact with artificial intelligence. Our advanced prompting system adapts to your needs, learns from your patterns, and delivers results that exceed expectations. Discover a new dimension of digital intelligence."
            />

            {/* ========== FEATURES - BENTO GRID ========== */}
            <section id="features" className="relative w-full min-h-screen z-[2] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Powerful Features
                        </h2>
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                            AURION combines cutting-edge AI technology with intuitive design. From seamless integrations to real-time analytics, every feature is crafted to enhance your productivity and streamline your workflow. Experience the difference that intelligent automation makes.
                        </p>
                    </div>
                    <BentoGridShowcase
                        integration={
                            <Card className="h-full bg-black/50 border-white/10 text-white relative">
                                <GlowingEffect disabled={false} variant="default" proximity={50} spread={30} />
                                <CardHeader>
                                    <CardTitle>Integration</CardTitle>
                                    <CardDescription className="text-white/70">
                                        Seamless connections
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">
                                        Connect with your favorite tools and services effortlessly.
                                    </p>
                                </CardContent>
                            </Card>
                        }
                        trackers={
                            <Card className="h-full bg-black/50 border-white/10 text-white relative">
                                <GlowingEffect disabled={false} variant="default" proximity={50} spread={30} />
                                <CardHeader>
                                    <CardTitle>Trackers</CardTitle>
                                    <CardDescription className="text-white/70">
                                        Monitor everything
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">
                                        Real-time tracking and analytics.
                                    </p>
                                </CardContent>
                            </Card>
                        }
                        statistic={
                            <Card className="h-full bg-black/50 border-white/10 text-white relative">
                                <GlowingEffect disabled={false} variant="default" proximity={50} spread={30} />
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                    <CardDescription className="text-white/70">
                                        Data insights
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">
                                        Powerful analytics at your fingertips.
                                    </p>
                                </CardContent>
                            </Card>
                        }
                        focus={
                            <Card className="h-full bg-black/50 border-white/10 text-white relative">
                                <GlowingEffect disabled={false} variant="default" proximity={50} spread={30} />
                                <CardHeader>
                                    <CardTitle>Focus</CardTitle>
                                    <CardDescription className="text-white/70">
                                        Stay productive
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">
                                        Minimize distractions, maximize output.
                                    </p>
                                </CardContent>
                            </Card>
                        }
                        productivity={
                            <Card className="h-full bg-black/50 border-white/10 text-white relative">
                                <GlowingEffect disabled={false} variant="default" proximity={50} spread={30} />
                                <CardHeader>
                                    <CardTitle>Productivity</CardTitle>
                                    <CardDescription className="text-white/70">
                                        Work smarter
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">
                                        Boost your efficiency with smart tools.
                                    </p>
                                </CardContent>
                            </Card>
                        }
                        shortcuts={
                            <Card className="h-full bg-black/50 border-white/10 text-white relative">
                                <GlowingEffect disabled={false} variant="default" proximity={50} spread={30} />
                                <CardHeader>
                                    <CardTitle>Shortcuts</CardTitle>
                                    <CardDescription className="text-white/70">
                                        Quick actions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80">
                                        Access everything you need with keyboard shortcuts and quick actions.
                                    </p>
                                </CardContent>
                            </Card>
                        }
                    />
                </div>
            </section>

            {/* ========== FEATURES DETAILS ========== */}
            <section className="relative w-full min-h-screen z-[3] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Advanced Capabilities
                        </h2>
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                            Unlock the full potential of AI with our comprehensive suite of features. From customizable workflows to powerful analytics, AURION provides everything you need to stay ahead. Built for professionals who demand excellence.
                        </p>
                    </div>
                    <Features />
                </div>
            </section>

            {/* ========== ARCHITECTURE & TECHNOLOGY ========== */}
            <section id="technology" className="relative w-full min-h-screen z-[4] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Built for Scale
                        </h2>
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-4">
                            AURION's architecture is engineered for enterprise-grade performance. Our distributed system ensures 99.9% uptime, handles millions of requests per second, and scales automatically to meet your growing needs. Built on modern cloud infrastructure with redundancy at every layer.
                        </p>
                        <p className="text-base text-white/60 max-w-2xl mx-auto">
                            From microservices architecture to real-time data processing, every component is optimized for speed, security, and scalability. Experience the power of infrastructure that grows with you.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <CpuArchitecture 
                            width="100%"
                            height="500"
                            text="AURION"
                            showCpuConnections={true}
                            animateText={true}
                            animateLines={true}
                            animateMarkers={true}
                            className="text-white"
                        />
                    </div>
                </div>
            </section>

            {/* ========== GLOBAL REACH ========== */}
            <section className="relative w-full min-h-screen z-[5] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Deployable Everywhere
                        </h2>
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-4">
                            AURION is built for global scale. Our infrastructure spans across continents, ensuring low latency and high availability wherever you are. Whether you're in New York, Tokyo, London, or anywhere in between, experience the same lightning-fast performance.
                        </p>
                        <p className="text-base text-white/60 max-w-2xl mx-auto">
                            Trusted by teams worldwide, from startups to Fortune 500 companies. Join thousands of users who rely on AURION for their daily operations.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Globe />
                    </div>
                </div>
            </section>

            {/* ========== BRAND MOMENT - AURION ========== */}
            <section className="relative w-full min-h-screen z-[6] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                            The future of AI-powered productivity. Built for those who refuse to settle for ordinary.
                        </p>
                    </div>
                    <div className="relative w-full h-[600px] flex items-center justify-center">
                        <SparklesCore
                            background="transparent"
                            minSize={0.6}
                            maxSize={1.4}
                            particleDensity={120}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white z-10">
                                AURION
                            </h1>
                        </div>
                    </div>
                    <div className="text-center mt-12 space-y-2">
                        <p className="text-base text-white/60 max-w-xl mx-auto">
                            Where intelligence meets innovation. Where possibilities become reality.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== INTEGRATIONS ========== */}
            <section id="integrations" className="relative w-full min-h-screen z-[7] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Seamless Integrations
                        </h2>
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                            AURION integrates effortlessly with the tools you already use. Connect with GitHub for version control, Slack for team communication, Notion for documentation, and dozens of other platforms. No workflow disruption, just enhanced productivity.
                        </p>
                        <p className="text-base text-white/60 max-w-2xl mx-auto">
                            Our API-first approach ensures that AURION fits perfectly into your existing tech stack, making adoption seamless and immediate.
                        </p>
                    </div>
                    <IntegrationsSection />
                </div>
            </section>

            {/* ========== FAQ / SUPPORT ========== */}
            <section id="faq" className="relative w-full min-h-screen z-[8] flex flex-col items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white">
                            Got Questions?
                        </h2>
                        <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
                            Our AI assistant is here to help. Ask anything about AURION's features, pricing, integrations, or how to get started. Get instant, accurate answers powered by our advanced language model.
                        </p>
                        <p className="text-base text-white/60 max-w-xl">
                            Whether you're curious about our architecture, deployment options, or best practices, we've got you covered.
                        </p>
                    </div>
                    <AIChatInput />
                </div>
            </section>

            {/* ========== PRICING ========== */}
            <section id="pricing" className="relative w-full min-h-screen z-[9] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                            Choose the perfect plan for your needs. All plans include access to AURION's core features, priority support, and regular updates. Start with our Starter plan and scale as you grow, or go straight to Professional for advanced features.
                        </p>
                        <p className="text-base text-white/60 max-w-2xl mx-auto">
                            Enterprise customers get custom solutions tailored to their specific requirements, including dedicated account management and SLA guarantees.
                        </p>
                    </div>
                    <Pricing
                        title="Simple, Transparent Pricing"
                        description="Choose the plan that works for you\nAll plans include access to our platform, advanced AI capabilities, and dedicated support."
                        plans={[
                            {
                                name: "Starter",
                                price: "29",
                                yearlyPrice: "24",
                                period: "month",
                                features: [
                                    "Access to platform",
                                    "Basic lead generation",
                                    "Email support",
                                    "Up to 100 leads/month",
                                ],
                                description: "Perfect for getting started",
                                buttonText: "Get Started",
                                href: "#",
                                isPopular: false,
                            },
                            {
                                name: "Professional",
                                price: "99",
                                yearlyPrice: "79",
                                period: "month",
                                features: [
                                    "Everything in Starter",
                                    "Advanced lead generation",
                                    "Priority support",
                                    "Up to 1,000 leads/month",
                                    "Analytics dashboard",
                                ],
                                description: "Best for growing businesses",
                                buttonText: "Get Started",
                                href: "#",
                                isPopular: true,
                            },
                            {
                                name: "Enterprise",
                                price: "299",
                                yearlyPrice: "239",
                                period: "month",
                                features: [
                                    "Everything in Professional",
                                    "Unlimited leads",
                                    "Dedicated account manager",
                                    "Custom integrations",
                                    "Advanced analytics",
                                ],
                                description: "For large organizations",
                                buttonText: "Contact Sales",
                                href: "#",
                                isPopular: false,
                            },
                        ]}
                    />
                </div>
            </section>

            {/* ========== BRAND REINFORCEMENT ========== */}
            <section className="relative w-full min-h-[500px] z-[10] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                            Experience the power of intelligent automation. Transform your workflow with AURION.
                        </p>
                    </div>
                    <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center">
                        <TextHoverEffect text="AURION" duration={0.3} />
                    </div>
                    <div className="text-center mt-12 space-y-2">
                        <p className="text-base text-white/60 max-w-xl mx-auto">
                            The future of AI-powered productivity is here. Join thousands of professionals who have already made the switch.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== NEWSLETTER CTA ========== */}
            <section className="relative w-full min-h-[500px] z-[11] flex items-center justify-center py-20 sm:py-32 bg-transparent">
                <GlowingEffect disabled={false} variant="white" proximity={100} spread={30} />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Stay Ahead of the Curve
                        </h2>
                        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
                            Join our community and get exclusive access to product updates, AI insights, productivity tips, and early access to new features. Be the first to know when we launch something exciting.
                        </p>
                        <p className="text-base text-white/60 max-w-2xl mx-auto">
                            No spam, just valuable content delivered straight to your inbox. Unsubscribe anytime.
                        </p>
                    </div>
                    <PinkyNewsletter />
                </div>
            </section>
        </div>
    )
};

export default HomePage
