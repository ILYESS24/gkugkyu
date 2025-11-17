"use client";

import Footer from "@/components/marketing/footer";
import React from 'react';

interface Props {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen w-full relative bg-white">
            {/* Gradient Background - Applied globally */}
            <div 
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #E8F4F8 0%, #F5F0E8 50%, #FFF8E7 100%)
                    `,
                    opacity: 0.4,
                }}
            />
            {/* Additional soft glow effects */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 50%, rgba(232, 244, 248, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 50%, rgba(255, 248, 231, 0.3) 0%, transparent 50%)
                    `,
                }}
            />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
        </div>
    );
};

export default MarketingLayout
