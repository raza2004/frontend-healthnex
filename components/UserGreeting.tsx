"use client";

import { useEffect, useState } from "react";

export default function UserGreeting() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setUserName(data.name || data.email?.split("@")[0] || "User");
          
          // Show the greeting after fetching user
          setIsVisible(true);
          
          // Auto-hide after 3 seconds
          const timer = setTimeout(() => {
            setIsVisible(false);
          }, 3000);
          
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (loading || !userName || !isVisible) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40 animate-fade-in" onClick={handleClose} />
      
      {/* Center popup */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
        <div className="bg-white border-2 border-[#0DAB83]/30 rounded-3xl shadow-2xl p-8 relative min-w-[320px]">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all duration-200"
            aria-label="Close greeting"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                Hi, {userName}! 👋
              </p>
              <p className="text-sm text-gray-500">Welcome to HealthNexus</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-3xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] animate-progress"></div>
          </div>
        </div>
      </div>
    </>
  );
}