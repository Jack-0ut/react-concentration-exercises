'use client'
import postEmail from '../api/email';
import React, { useEffect, useState } from 'react';

export default function Results() {

  async function handleSubmit(email: string) {
    console.log("Email submitted:", email);
    const result = await postEmail(email);
  }

  const [score, setScore] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Parse the score from the URL
    const params = new URLSearchParams(window.location.search);
    const scoreParam = params.get('score');
    const parsedScore = scoreParam ? parseFloat(scoreParam) : null;
    if (!isNaN(parsedScore)) {
      setScore(parsedScore);
    }
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email submitted: ${email}`);
    alert('Thank you for subscribing! You will receive updates soon.');
    handleSubmit(email);
  };

  if (score === null) {
    // Handle case when score is not provided in the URL
    return <div>Error: Score not found in URL</div>;
  }

  return (
    <div className="result-container flex flex-col items-center justify-center min-h-screen bg-gradient-radial from-warm-gray-200 to-cool-gray-300 text-cool-gray-800">
      {/* Logo and company name */}
      <div className="logo-container flex items-center justify-center mb-8">
      <img src="/icon.svg" alt="Company Logo" className="logo h-16" />
        <h1 className="company-name text-2xl font-bold">Maverkick</h1>
      </div>

      <div className="container mx-auto p-4 md:p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Your Score: {score}/100</h2>
        {score > 75 ? (
          <p className="text-lg">You're doing great! Keep it up!</p>
        ) : score > 50 ? (
          <p className="text-lg">Well done! You're making progress!</p>
        ) : score > 25 ? (
          <p className="text-lg">You're on the right track! Keep moving forward!</p>
        ) : (
          <p className="text-lg">Every step counts! Keep going!</p>
        )}
      </div>

      <div className="email-input-container flex flex-col items-center p-8 bg-blue-100 rounded-xl shadow-xl mt-8 max-w-md">
  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
    Stay updated with your progress:
  </h2>
  <p className="text-base mb-4 text-center text-gray-800">
    Get personalized tips, track your improvement, and receive exclusive challenges.
  </p>
  <form onSubmit={handleSubmitEmail} className="w-full">
    <div className="flex items-center justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="rounded-lg border border-gray-300 py-3 px-4 w-full text-center focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800 shadow-md"
        value={email}
        onChange={handleEmailChange}
      />
      <button
        type="submit"
        className="btn btn-blue ml-4 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold hover:from-blue-500 hover:to-blue-700 hover:text-white transition duration-300 shadow-md"
      >
        Subscribe
      </button>
    </div>
  </form>
</div>

    </div>
  );
}
