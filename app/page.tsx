import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserGreeting from "@/components/UserGreeting";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <UserGreeting />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28 text-center">
          <div className="inline-block mb-6 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 px-6 py-2 border border-[#0DAB83]/20">
            <span className="text-sm font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
              ✨ Trusted Digital Healthcare
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Smarter Healthcare with{" "}
            <span className="bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
              HealthNexus
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
            AI-powered symptom checking, medical insights, and doctor
            recommendations — designed to support better health decisions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a
              href="/disease-checker"
              className="group relative rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-8 py-4 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="relative z-10">Start Symptom Check →</span>
            </a>

            <a
              href="/doctors"
              className="rounded-full border-2 border-[#0DAB83] bg-white px-8 py-4 text-gray-800 font-semibold hover:bg-[#0DAB83]/10 hover:border-[#0DAB83] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Find Doctors
            </a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent mb-2">
                10k+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Verified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white/50 backdrop-blur-sm py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
                HealthNexus
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Symptom Analysis
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced AI to help understand your symptoms quickly and safely with personalized recommendations.
                </p>
              </div>

              <div className="group rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#117F9E] transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Verified Doctors
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find trusted healthcare professionals near you with verified credentials and reviews.
                </p>
              </div>

              <div className="group rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Privacy First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your health data is encrypted and secure with industry-leading protection standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="rounded-3xl bg-gradient-to-r from-[#0DAB83] to-[#117F9E] p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Join thousands of users who trust HealthNexus for their healthcare needs.
              </p>
              <a
                href="/disease-checker"
                className="inline-block rounded-full bg-white px-8 py-4 text-gray-900 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Now →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}