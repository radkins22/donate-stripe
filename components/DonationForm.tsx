'use client';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export function DonationForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
  
    setLoading(true);
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
      },
      redirect: "if_required",
    });
  
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
  
    if (paymentIntent && paymentIntent.status === "succeeded") {
      window.location.href = "/thank-you";
    } else {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? 'Processing...' : 'Donate'}
      </button>
    </form>
  );
}
