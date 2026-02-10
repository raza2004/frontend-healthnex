"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// Separate component that uses useSearchParams
function VerifyEmailContent() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError("No verification token provided");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setError(data?.error || "Invalid/expired token");
          toast.error(data?.error || "Verification failed");
          return;
        }

        setVerified(true);
        toast.success("Email verified successfully!");
      } catch (e: any) {
        setError("Network error");
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const gradientBackground = "linear-gradient(135deg, #0DAB83 0%, #117F9E 100%)";

  return (
    <div className="h-screen flex flex-row relative" style={{ background: gradientBackground }}>
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Left card */}
      <div className="w-[45vw] flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm h-auto rounded-[40px] p-16 m-4 shadow-2xl">
        <h2 className="text-3xl xl:text-4xl font-bold mb-2 bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
          Email Verification
        </h2>
        <p className="text-gray-600 mb-8">Verifying your HealthNexus account</p>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0DAB83] border-r-transparent mb-4"></div>
            <p className="text-gray-700 text-lg">Verifying your email...</p>
          </div>
        )}

        {/* Success State */}
        {!loading && verified && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 flex items-center justify-center">
              <span className="text-5xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Email Verified Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your account has been verified. You can now sign in to HealthNexus.
            </p>
            <Link 
              href="/login" 
              className="inline-block rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-8 py-3 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Go to Sign In →
            </Link>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-5xl">❌</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Verification Failed
            </h3>
            <p className="text-red-600 mb-6 font-semibold">
              {error}
            </p>
            <p className="text-gray-600 mb-6 text-sm">
              The verification link may have expired or is invalid.
              Please try signing up again.
            </p>
            <Link 
              href="/signup" 
              className="inline-block rounded-full border-2 border-[#0DAB83] bg-white px-8 py-3 text-gray-800 font-bold hover:bg-[#0DAB83]/10 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Back to Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Right logo with backdrop */}
      <div className="items-center w-[50vw] justify-center flex relative">
        {/* Backdrop circle for logo visibility */}
        <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
        
        <Image
          src="/logo.svg"
          alt="Logo"
          priority
          width={600}
          height={600}
          className="w-auto h-auto drop-shadow-2xl relative z-10"
        />
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0DAB83] border-r-transparent mb-4"></div>
          <p className="text-gray-700 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}