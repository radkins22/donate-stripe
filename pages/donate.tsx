import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { DonationForm } from '@/components/DonationForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DonatePage() {
  const router = useRouter();
  const { amount, donationType } = router.query;
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!amount || !donationType) return;

    fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donationType, amount: Number(amount) }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [amount, donationType]);

  return clientSecret ? (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <div className="max-w-md mx-auto mt-10">
        <DonationForm />
      </div>
    </Elements>
  ) : (
    <p className="text-center mt-10">Loading...</p>
  );
}
