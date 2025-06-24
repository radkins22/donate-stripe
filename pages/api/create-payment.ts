import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { donationType, amount } = req.body;

  // 🚨 Log incoming request
  console.log('📨 Received request body:', { donationType, amount });

  // 🛡️ Validate amount
  if (typeof amount !== 'number' || amount < 50) {
    console.warn('⚠️ Invalid amount received:', amount);
    return res.status(400).json({ error: 'Invalid donation amount. Must be at least 50 (50 cents).' });
  }

  try {
    if (donationType === 'one-time') {
      console.log('💳 Creating one-time payment intent...');

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      console.log('✅ PaymentIntent created:', paymentIntent.id);

      return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }

    if (donationType === 'monthly') {
      const priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
      console.log('🔁 Creating monthly subscription...');
      console.log('📦 Price ID:', priceId);

      if (!priceId) {
        console.error('❌ STRIPE_MONTHLY_PRICE_ID is missing in environment variables');
        return res.status(500).json({ error: 'Missing Stripe price ID for subscription' });
      }

      const customer = await stripe.customers.create();
      console.log('👤 Customer created:', customer.id);

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      console.log('🔁 Subscription created:', subscription.id);

      let clientSecret: string | null | undefined;
      const invoice = subscription.latest_invoice;

      if (
        invoice &&
        typeof invoice !== 'string' &&
        invoice.payment_intent &&
        typeof invoice.payment_intent !== 'string'
      ) {
        clientSecret = invoice.payment_intent.client_secret;
      }

      if (!clientSecret) {
        console.error('❌ Could not retrieve client secret from subscription.invoice.payment_intent');
        return res.status(500).json({ error: 'Could not retrieve client secret from subscription.' });
      }

      console.log('✅ Subscription client secret retrieved:', clientSecret);

      return res.status(200).json({ clientSecret });
    }

    console.warn('⚠️ Invalid donationType:', donationType);
    return res.status(400).json({ error: 'Invalid donation type' });
  } catch (err) {
    console.error('💥 Stripe error:', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Stripe error' });
  }
}
