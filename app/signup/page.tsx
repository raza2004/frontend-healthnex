"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const ok =
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.password.length > 0;
    setButtonDisabled(!ok || loading);
  }, [form, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const isPasswordValid = form.password.length >= 6;

    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!isPasswordValid) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse errors
      }

      if (!res.ok) {
        toast.error(data?.error || "Signup failed. Please try again.");
        return;
      }

      toast.success("Verification email sent!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated gradient with new colors
const gradientBackground = "linear-gradient(135deg, #E0F7F1 0%, #A8E6D7 30%, #70D4BD 70%, #0DAB83 100%)";

  return (
    <div className="h-screen flex flex-row" style={{ background: gradientBackground }}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Left Card */}
      <div className="w-[45vw] flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm h-auto rounded-[40px] p-16 m-4 shadow-2xl">
        <h2 className="text-2xl xl:text-4xl font-bold mb-2 bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
          Sign Up
        </h2>
        <p className="text-gray-600 mb-6">Create your HealthNexus account</p>

        <form onSubmit={onSignup} className="w-full flex flex-col items-center">
          {/* Full Name */}
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="bg-[#F3F3F3] p-2 py-3 xl:p-3 xl:py-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-[#0DAB83] transition-all"
          />

          {/* Email */}
          <input
            id="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="bg-[#F3F3F3] p-2 xl:p-3 xl:py-4 mt-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-[#0DAB83] transition-all"
          />

          {/* Password */}
          <div className="relative mt-4 w-full">
            <input
              id="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-[#F3F3F3] p-2 xl:p-3 xl:py-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-[#117F9E] transition-all pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={buttonDisabled}
            className={`rounded-full py-3 xl:py-4 mt-8 w-full font-bold text-lg transition-all duration-200 ${
              buttonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#0DAB83] to-[#117F9E] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs mt-4 text-gray-500 text-center">
          By signing up, you agree to our Terms and Conditions.
        </p>

        <h5 className="text-center mt-8 text-gray-700">
          Already have an account?
          <span className="font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent ml-1 hover:underline cursor-pointer">
            <Link href="/login">Sign In</Link>
          </span>
        </h5>
      </div>

      {/* Right Side Logo */}
      <div className="items-center w-[50vw] justify-center flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          priority
          width={600}
          height={600}
          className="w-auto h-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
}