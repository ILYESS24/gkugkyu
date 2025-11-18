import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Stripe Price IDs - Replace with your actual Stripe Price IDs
export const STRIPE_PRICES = {
  basic: {
    monthly: process.env.STRIPE_BASIC_PRICE_ID || 'price_basic_monthly',
    yearly: process.env.STRIPE_BASIC_YEARLY_PRICE_ID || 'price_basic_yearly',
  },
  starter: {
    monthly: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter_monthly',
    yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID || 'price_starter_yearly',
  },
  pro: {
    monthly: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_pro_yearly',
  },
} as const;

export type PlanType = 'basic' | 'starter' | 'pro';
export type BillingPeriod = 'monthly' | 'yearly';

