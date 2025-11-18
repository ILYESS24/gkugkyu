"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, FileText, Calendar, X, Check } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/auth";
import { format } from "date-fns";

interface Subscription {
  id: string;
  plan: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  invoice_pdf?: string;
  hosted_invoice_url?: string;
}

export default function BillingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      await loadSubscription();
      await loadInvoices();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const loadSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription');
      const data = await response.json();
      setSubscription(data.subscription);
    } catch (error) {
      console.error('Load subscription error:', error);
    }
  };

  const loadInvoices = async () => {
    try {
      const response = await fetch('/api/stripe/invoices');
      const data = await response.json();
      setInvoices(data.invoices || []);
    } catch (error) {
      console.error('Load invoices error:', error);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? It will remain active until the end of the current billing period.')) {
      return;
    }

    setCanceling(true);
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      await loadSubscription();
    } catch (error: any) {
      console.error('Cancel subscription error:', error);
      alert(error.message || 'Failed to cancel subscription');
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const formatAmount = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Billing & Subscription</h1>

        {subscription ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-[#181818] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold capitalize">{subscription.plan}</p>
                    <p className="text-white/60 text-sm mt-1">
                      Status: <span className="capitalize">{subscription.status}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60">Current Period</span>
                    </div>
                    <p className="text-sm">
                      {format(new Date(subscription.current_period_start), 'MMM d, yyyy')} -{' '}
                      {format(new Date(subscription.current_period_end), 'MMM d, yyyy')}
                    </p>
                  </div>

                  {subscription.cancel_at_period_end && (
                    <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                      <p className="text-sm text-yellow-400">
                        Your subscription will cancel on{' '}
                        {format(new Date(subscription.current_period_end), 'MMM d, yyyy')}
                      </p>
                    </div>
                  )}

                  {!subscription.cancel_at_period_end && (
                    <Button
                      variant="destructive"
                      onClick={handleCancelSubscription}
                      disabled={canceling}
                      className="w-full"
                    >
                      {canceling ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Canceling...
                        </>
                      ) : (
                        'Cancel Subscription'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181818] border-gray-800">
              <CardHeader>
                <CardTitle>Upgrade Plan</CardTitle>
                <CardDescription className="text-white/60">
                  Get more features and capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push('/#pricing')}
                  className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
                >
                  View Plans
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-[#181818] border-gray-800 mb-8">
            <CardHeader>
              <CardTitle>No Active Subscription</CardTitle>
              <CardDescription className="text-white/60">
                Subscribe to unlock all features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push('/#pricing')}
                className="bg-[#2563EB] hover:bg-[#1d4ed8]"
              >
                View Plans
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="bg-[#181818] border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <p className="text-white/60">No invoices yet</p>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold">
                          {formatAmount(invoice.amount, invoice.currency)}
                        </p>
                        <p className="text-sm text-white/60">
                          {format(new Date(invoice.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {invoice.status === 'paid' ? (
                          <span className="flex items-center gap-1 text-green-400 text-sm">
                            <Check className="w-4 h-4" />
                            Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-400 text-sm">
                            <X className="w-4 h-4" />
                            {invoice.status}
                          </span>
                        )}
                      </div>
                    </div>
                    {invoice.hosted_invoice_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(invoice.hosted_invoice_url, '_blank')}
                      >
                        View Invoice
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

