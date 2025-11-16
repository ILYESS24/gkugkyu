"use client";

import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import React from 'react';

interface Props {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <main className="mx-auto w-full z-40 relative bg-black">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout
