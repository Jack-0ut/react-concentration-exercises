// pages/index.js

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen text-black text-center p-12">
      {/* Logo and Company Name */}
      <div className="absolute top-0 left-0 flex items-center p-6">
        {/* Logo at the top left */}
        <div className="mr-4">
          <Link href="/">
            <Image src="/icon.svg" alt="Maverkick Logo" width={96} height={96} />
          </Link>
        </div>
        {/* Company Name with Google Font */}
        <div className="font-bold text-xl">Maverkick</div>
      </div>
      {/* Main Content */}
      <div>
        <h1 className="text-5xl font-bold mb-6">Test Your Concentration</h1>
        <p className="text-2xl mb-8">Spend those 8 minutes, and know how good you are</p>
        <Link href="/test"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full uppercase tracking-wider hover:bg-blue-100 transition duration-300">
            Start Your Test
        </Link>
      </div>
    </div>
  );
}
