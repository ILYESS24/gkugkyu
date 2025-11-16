"use client";

export const dynamic = 'force-dynamic';

import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Integration from "@/components/marketing/integration";
import LanguageSupport from "@/components/marketing/lang-support";
import Pricing from "@/components/marketing/pricing";
import { PromptingIsAllYouNeed } from "@/components/prompting-hero";
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
        <div className="bg-black min-h-screen relative">
            <canvas id="canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
            <PromptingIsAllYouNeed />
            <Wrapper className="py-20 relative bg-black z-10">
                <Companies />
                <Features />
                <Analysis />
                <Integration />
                <Pricing />
                <LanguageSupport />
                <CTA />
            </Wrapper>
        </div>
    )
};

export default HomePage
