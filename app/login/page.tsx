"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonDisabled = useMemo(() => {
    return email.trim().length === 0 || password.length === 0 || loading;
  }, [email, password, loading]);

const gradientBackground = "linear-gradient(135deg, #E0F7F1 0%, #A8E6D7 30%, #70D4BD 70%, #0DAB83 100%)";

  const login = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    // ✅ validations (same spirit as your old project)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error || "Login failed");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="h-screen flex flex-row relative" style={{ background: gradientBackground }}>
  <Toaster position="top-right" reverseOrder={false} />

  {/* Left card */}
  <div className="w-[45vw] flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm h-auto rounded-[40px] p-16 m-4 shadow-2xl">
    <h2 className="text-3xl xl:text-4xl font-bold mb-2 bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
      Sign In
    </h2>
    <p className="text-gray-600 mb-6">Welcome back to HealthNexus</p>

    <form onSubmit={login} className="w-full">
      {/* Email */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="bg-[#F3F3F3] p-2 xl:p-3 mt-4 xl:py-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-[#0DAB83] transition-all"
      />

      {/* Password */}
      <div className="relative mt-4">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="bg-[#F3F3F3] p-2 xl:p-3 xl:py-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-[#117F9E] transition-all"
        />
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword((s) => !s)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={buttonDisabled}
        className={`rounded-full py-3 xl:py-4 mt-8 w-full font-bold text-lg transition-all duration-200 ${
          buttonDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-[#0DAB83] to-[#117F9E] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
        }`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>

    <p className="text-xs mt-4 text-gray-500 text-center">
      By clicking this button, you agree with our Terms and Conditions.
    </p>

    {/* Signup redirect line */}
    <h5 className="text-center mt-8 text-gray-700">
      Don&apos;t have an account?
      <span className="font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent ml-1 hover:underline cursor-pointer">
        <Link href="/signup">Sign Up</Link>
      </span>
    </h5>
  </div>

  {/* Right logo with backdrop */}
  <div className="items-center w-[50vw] justify-center flex relative">
    {/* Backdrop circle for logo visibility */}
    <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
    
    <Image
      src="/logo.svg"
      alt="Logo"
      priority
      width={0}
      height={0}
      className="w-auto h-auto drop-shadow-2xl relative z-10"
    />
  </div>
</div>
  );
}
