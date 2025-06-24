export default function ThankYouPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
        <div className="bg-white p-6 rounded-xl shadow text-center max-w-md w-full space-y-4">
          <h1 className="text-3xl font-bold text-green-600">Thank you! 🎉</h1>
          <p className="text-gray-700">Your donation has been successfully received.</p>
          <a
            href="/"
            className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
  