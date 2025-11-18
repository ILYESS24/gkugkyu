"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const plan = searchParams.get('plan') as 'basic' | 'starter' | 'pro' | null;
  const billingPeriod = (searchParams.get('billing') || 'monthly') as 'monthly' | 'yearly';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login?redirect=/checkout');
        return;
      }
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

  const handleCheckout = async () => {
    if (!plan) {
      setError('Please select a plan');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, billingPeriod }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const plans = {
    basic: {
      name: 'Basic',
      price: billingPeriod === 'yearly' ? '€100' : '€10',
      period: billingPeriod === 'yearly' ? '/year' : '/month',
      description: 'Perfect for trying out AURION',
      features: [
        'AI Website Builder (Basic)',
        'AI Content Generation (Limited)',
        'AI-Assisted Code Editor',
        'Component Library Access',
        '2 Projects',
        'Email Support',
      ],
    },
    starter: {
      name: 'Starter',
      price: billingPeriod === 'yearly' ? '$290' : '$29',
      period: billingPeriod === 'yearly' ? '/year' : '/month',
      description: 'Perfect for solo creators and small teams',
      features: [
        'Website & App Builder',
        'AI Content Generation',
        'AI-Assisted Code Editor',
        'Basic AI Agents',
        'Component Library Access',
        '5 Projects',
        'Community Support',
      ],
    },
    pro: {
      name: 'Pro',
      price: billingPeriod === 'yearly' ? '$990' : '$99',
      period: billingPeriod === 'yearly' ? '/year' : '/month',
      description: 'For serious builders',
      features: [
        'Everything in Starter',
        'Unlimited Projects',
        'Advanced AI Models',
        'Custom AI Agents',
        'Priority Support',
        'API Access',
        'Advanced Analytics',
        'Team Collaboration',
      ],
    },
  };

  const selectedPlan = plan ? plans[plan] : null;

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Invalid plan selected</p>
          <Button onClick={() => router.push('/#pricing')}>Go to Pricing</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070F] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push('/#pricing')}
          className="mb-8 text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-[#181818] border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedPlan.name} Plan</CardTitle>
              <CardDescription className="text-white/60">
                {selectedPlan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">{selectedPlan.price}</span>
                  <span className="text-xl text-white/60 ml-2">{selectedPlan.period}</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-sm text-green-400 mt-2">Save 20% with annual billing</p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {selectedPlan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Subscribe to ${selectedPlan.name}`
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#181818] border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                  <span className="text-white/80">{selectedPlan.name} Plan</span>
                  <span className="font-semibold">{selectedPlan.price}{selectedPlan.period}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-semibold">{selectedPlan.price}{selectedPlan.period}</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">{selectedPlan.price}{selectedPlan.period}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-white/80">
                  🔒 Secure payment powered by Stripe. Your subscription will automatically renew unless canceled.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

