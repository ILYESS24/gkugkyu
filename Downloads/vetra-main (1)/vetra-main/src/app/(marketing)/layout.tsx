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
            {/* Gradient Background - Vives couleurs sur les côtés */}
            <div 
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #D4E8F0 0%, #F0E8D8 50%, #FFE8C4 100%)
                    `,
                }}
            />
            {/* Additional soft glow effects */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 50%, rgba(212, 232, 240, 0.6) 0%, transparent 60%),
                        radial-gradient(circle at 80% 50%, rgba(255, 232, 196, 0.6) 0%, transparent 60%)
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
