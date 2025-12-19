import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Snowfall from '../components/Snowfall';

const Landing = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const features = [
    { title: "Lightning Fast", desc: "Recharge completed in under 10 seconds" },
    { title: "Bank-Level Security", desc: "256-bit SSL encryption for all transactions" },
    { title: "Best Prices", desc: "Guaranteed lowest prices with instant cashback" },
    { title: "All Operators", desc: "Airtel, Jio, Vi, BSNL - all supported" },
    { title: "Smart Plans", desc: "AI-powered plan recommendations" },
    { title: "24/7 Support", desc: "Round-the-clock customer assistance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-x-hidden">
      <Snowfall />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-700/80"></div>
      
      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            RechargeHub
          </h1>
          <div className="hidden md:flex space-x-4">
            <Link to="/plans" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              View Plans
            </Link>
            <Link to="/login" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-white hover:bg-gray-100 text-slate-800 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Sign Up
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link to="/login" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-sm">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-20">
        {/* Section 1: Hero */}
        <section className="scroll-section min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Slogan and Content */}
              <div className="text-white space-y-8 pl-4 md:pl-8 lg:pl-12">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    Recharge
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Smarter</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-300 max-w-2xl">
                    "Your Mobile, Our Priority - Instant Recharge, Infinite Possibilities"
                  </p>
                  <p className="text-lg text-slate-400 max-w-xl">
                    Experience the future of mobile recharging with lightning-fast transactions, 
                    unbeatable prices, and seamless user experience across all major operators.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/plans" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl text-center">
                    Browse Plans
                  </Link>
                  <Link to="/signup" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl text-center">
                    Start Free
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-amber-400">50K+</div>
                    <div className="text-sm text-slate-400">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">99.9%</div>
                    <div className="text-sm text-slate-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400">24/7</div>
                    <div className="text-sm text-slate-400">Support</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Video */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md lg:max-w-lg">
                  <video 
                    src="/asset/video.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full rounded-2xl shadow-2xl"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Features */}
        <section className="scroll-section min-h-screen flex items-center bg-slate-800/50">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose RechargeHub?
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                We've revolutionized mobile recharging with cutting-edge technology and user-centric design
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-slate-600">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing Preview */}
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-white text-center mb-12">Popular Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['Airtel', 'Jio', 'Vi', 'BSNL'].map((operator, index) => (
                  <div key={operator} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-amber-500 transition-all duration-300">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{operator}</h4>
                      <div className="text-3xl font-bold text-amber-400 mb-2">₹299</div>
                      <p className="text-slate-300 text-sm mb-4">28 Days | 2GB/Day</p>
                      <Link to="/plans" className="block w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-all duration-200">
                        View Plans
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Testimonials & CTA */}
        <section className="scroll-section min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-20">


            {/* Final CTA */}
            <div className="text-center bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-3xl p-12 border border-slate-600">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience the Future?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join RechargeHub today and never worry about mobile recharge again. 
                Fast, secure, and always reliable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Get Started Now
                </Link>
                <Link to="/plans" className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Explore Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Landing;
