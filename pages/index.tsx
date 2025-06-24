import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [amount, setAmount] = useState(5000); // default: $50
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

  const handleContinue = () => {
    router.push({
      pathname: '/donate',
      query: { amount, donationType },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <h1 className="text-2xl font-semibold text-center">Support Our Mission</h1>

        <div className="space-y-2">
          <label className="block font-medium">Choose amount:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          >
            <option value={2000}>$20</option>
            <option value={5000}>$50</option>
            <option value={10000}>$100</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Donation type:</label>
          <div className="flex gap-4">
            <button
              onClick={() => setDonationType('one-time')}
              className={`flex-1 px-4 py-2 rounded border ${
                donationType === 'one-time' ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => setDonationType('monthly')}
              className={`flex-1 px-4 py-2 rounded border ${
                donationType === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Continue to Donate
        </button>
      </div>
    </div>
  );
}
