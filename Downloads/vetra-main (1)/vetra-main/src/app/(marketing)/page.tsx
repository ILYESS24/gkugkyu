import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Integration from "@/components/marketing/integration";
import LanguageSupport from "@/components/marketing/lang-support";
import Pricing from "@/components/marketing/pricing";
import { Hero } from "@/components/void-hero";

const HomePage = () => {
    return (
        <>
            <Hero 
                title="Transform your marketing with AI Precision"
                description="AI-powered automation and insights to maximize your campaigns and grow your brand."
                links={[
                    { name: "Home", href: "#" },
                    { name: "Features", href: "#features" },
                    { name: "Pricing", href: "#pricing" },
                    { name: "About", href: "#about" }
                ]}
            />
            <Wrapper className="py-20 relative">
                <Companies />
                <Features />
                <Analysis />
                <Integration />
                <Pricing />
                <LanguageSupport />
                <CTA />
            </Wrapper>
        </>
    )
};

export default HomePage
