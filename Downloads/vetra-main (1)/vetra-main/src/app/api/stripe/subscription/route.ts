import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase-server-api';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    const { user } = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!subscription) {
      return NextResponse.json({ subscription: null });
    }

    // Get latest invoice
    const { data: latestInvoice } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'paid')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({
      subscription: {
        ...subscription,
        latestInvoice,
      },
    });
  } catch (error: any) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get subscription' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { user } = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 400 });
    }

    // Cancel subscription at period end
    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: true } as any)
      .eq('user_id', user.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}

