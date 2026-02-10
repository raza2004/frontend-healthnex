"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    })();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image 
            src="/logo.svg" 
            alt="Logo"  
            priority
            width={0}
            height={0}
            className="w-auto h-14 transition-transform group-hover:scale-105"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-gray-800 font-semibold text-[16px] tracking-wide hover:text-[#0DAB83] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#0DAB83] after:to-[#117F9E] after:transition-all hover:after:w-full"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            Home
          </Link>
          <Link 
            href="/disease-checker" 
            className="text-gray-800 font-semibold text-[16px] tracking-wide hover:text-[#0DAB83] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#0DAB83] after:to-[#117F9E] after:transition-all hover:after:w-full"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            Symptom Checker
          </Link>
          <Link 
            href="/doctors" 
            className="text-gray-800 font-semibold text-[16px] tracking-wide hover:text-[#0DAB83] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#0DAB83] after:to-[#117F9E] after:transition-all hover:after:w-full"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            Doctors
          </Link>
          <Link 
            href="/history" 
            className="text-gray-800 font-semibold text-[16px] tracking-wide hover:text-[#0DAB83] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#0DAB83] after:to-[#117F9E] after:transition-all hover:after:w-full"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            History
          </Link>
          <Link 
            href="/about" 
            className="text-gray-800 font-semibold text-[16px] tracking-wide hover:text-[#0DAB83] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#0DAB83] after:to-[#117F9E] after:transition-all hover:after:w-full"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/disease-checker"
            className="rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-6 py-2.5 text-white font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            Check Symptoms
          </Link>

         {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-full border-2 text-gray-700 border-gray-300 px-6 py-2.5 text-sm font-bold"
              >
                Login
              </Link>
             
            </>
          ) : (
            <button
              onClick={logout}
              className="rounded-full border-2 cursor-pointer border-gray-300 px-6 py-2.5 font-bold text-sm text-gray-700 hover:border-[#0DAB83] hover:text-[#0DAB83] transition-all duration-200" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}