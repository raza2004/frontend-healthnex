"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Your Name",
      role: "Full Stack Developer",
      contribution: "Backend Development, AI Integration",
      emoji: "👨‍💻",
    },
    {
      name: "Team Member 2",
      role: "Frontend Developer",
      contribution: "UI/UX Design, React Development",
      emoji: "👩‍💻",
    },
    {
      name: "Team Member 3",
      role: "ML Engineer",
      contribution: "Disease Prediction Model, Data Processing",
      emoji: "🤖",
    },
  ];

  const technologies = [
    { name: "Next.js", icon: "⚛️", category: "Frontend" },
    { name: "Flask", icon: "🐍", category: "Backend" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "Machine Learning", icon: "🤖", category: "AI/ML" },
    { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
    { name: "Scikit-learn", icon: "📊", category: "ML Library" },
  ];

  const features = [
    {
      title: "AI-Powered Symptom Analysis",
      description: "Machine learning model trained on medical datasets to predict potential diseases based on symptoms",
      icon: "🤖",
    },
    {
      title: "Doctor Recommendations",
      description: "Find verified healthcare professionals in your city based on predicted conditions",
      icon: "👨‍⚕️",
    },
    {
      title: "Search History",
      description: "Track your previous symptom checks and maintain your health records",
      icon: "📋",
    },
    {
      title: "User Authentication",
      description: "Secure login and registration system to protect your medical data",
      icon: "🔐",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block mb-6 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 px-6 py-2 border border-[#0DAB83]/20">
              <span className="text-sm font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
                🎓 Final Year Project 2025-2026
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
                HealthNexus
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              An AI-powered healthcare platform designed to help users identify potential health conditions 
              and connect with healthcare professionals - developed as our Final Year Project.
            </p>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Project Overview
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">HealthNexus</strong> is a comprehensive healthcare platform that leverages 
                  artificial intelligence and machine learning to provide preliminary health assessments based on user-reported symptoms. 
                  Our goal is to make healthcare more accessible and help users make informed decisions about their health.
                </p>
                <p>
                  The system uses a trained machine learning model to analyze symptoms and predict potential diseases, 
                  while also connecting users with verified doctors in their area. This bridges the gap between 
                  self-diagnosis and professional medical consultation.
                </p>
                <p className="text-sm italic text-gray-600">
                  <strong>Disclaimer:</strong> This is an educational project developed for academic purposes. 
                  It should not replace professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Key Features
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Technologies Used
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl hover:border-[#117F9E] transition-all duration-300 group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-600">{tech.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Final Year Students - Computer Science Department
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300"
                >
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Project Stats */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="bg-gradient-to-r from-[#0DAB83] to-[#117F9E] rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                Project Statistics
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                <div>
                  <div className="text-4xl font-bold mb-2">6+</div>
                  <div className="text-white/90">Months of Development</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">10+</div>
                  <div className="text-white/90">Technologies Used</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-white/90">Diseases Detected</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1000+</div>
                  <div className="text-white/90">Lines of Code</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Acknowledgments
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We would like to express our gratitude to our project supervisor, 
                the Computer Science Department faculty, and our university for providing 
                us with the opportunity and resources to develop this project. Special thanks 
                to all the open-source communities whose tools and libraries made this possible.
              </p>
              <div className="inline-block rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 px-6 py-3 border border-[#0DAB83]/20">
                <p className="text-sm font-semibold text-gray-900">
                  🎓 FEDERAL URDU UNIVERSITY OF ARTS, SCIENCES AND TECHNOLOGY - Class of 2022
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try HealthNexus Today
            </h2>
            <p className="text-gray-600 mb-8">
              Experience our AI-powered symptom checker and get personalized health insights
            </p>
            
            <a
              href="/disease-checker"
              className="inline-block rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Check Your Symptoms Now →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}