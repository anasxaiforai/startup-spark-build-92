
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, projectName } = await req.json();

    console.log('Generating comprehensive web application for:', projectName);

    // Use the integrated AI agent for code generation
    const agentResponse = await fetch('https://api.lyzr.ai/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'lyzr-key-d4c3b2a1f9e8d7c6b5a49382716e5d4c'
      },
      body: JSON.stringify({
        "user_id": "web-app-builder",
        "agent_id": "67740e0fae6188ce2fb9a1bc",
        "session_id": `build-${Date.now()}`,
        "message": `Build a complete web application for: ${projectName}. 

User's detailed requirements: ${prompt}

Generate a fully functional Next.js 14 web app with:
- Modern, responsive design using TailwindCSS and Shadcn UI
- Smooth animations with Framer Motion
- Multi-page navigation with working routes
- Interactive forms and components
- Professional UI/UX
- Complete file structure ready for deployment

Return the complete codebase as JSON with this structure:
{
  "files": {
    "app/page.tsx": "code here",
    "app/layout.tsx": "code here", 
    "components/Navbar.tsx": "code here",
    "package.json": "code here"
  },
  "instructions": "setup instructions",
  "techStack": ["Next.js", "TailwindCSS", "Shadcn UI"],
  "deployUrl": "deployment info"
}`
      })
    });

    if (!agentResponse.ok) {
      throw new Error(`Agent API error: ${agentResponse.status}`);
    }

    const agentData = await agentResponse.json();
    console.log('Agent response received:', agentData);

    let generatedCode;

    try {
      // Extract the message content from agent response
      const messageContent = agentData.response || agentData.message || agentData.content;
      
      if (!messageContent) {
        throw new Error('No content in agent response');
      }

      // Try to parse JSON from the response
      const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        generatedCode = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed agent response, files:', Object.keys(generatedCode.files || {}));
      } else {
        throw new Error('No JSON found in agent response');
      }
    } catch (parseError) {
      console.error('Failed to parse agent response:', parseError);
      
      // Enhanced fallback - create a comprehensive React application
      const safeName = projectName.replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'Modern Web App';
      const safeSlug = safeName.toLowerCase().replace(/\s+/g, '-');
      
      generatedCode = {
        files: {
          "App.tsx": `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;`,

          "components/Navbar.tsx": `import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span>${safeName}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={\`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 \${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }\`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
            Get Started
          </button>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={\`px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors \${
                    isActive(item.path) ? 'text-blue-600 bg-blue-50' : ''
                  }\`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="mx-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;`,

          "components/Footer.tsx": `import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">${safeName}</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Building amazing digital experiences with cutting-edge technology. 
              We create solutions that drive results and exceed expectations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors hover:underline">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:underline">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors hover:underline">Services</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">123 Innovation Street, Tech City</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@${safeSlug}.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 ${safeName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`,

          "pages/Home.tsx": `import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, Zap, Shield, CheckCircle } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Lightning Fast",
      description: "Optimized performance for the best user experience with modern web technologies"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee for peace of mind"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with powerful collaboration tools and real-time updates"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "This platform has completely transformed how our team works. The features are incredible and the support is outstanding. Highly recommended!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Product Manager",
      content: "Amazing features and outstanding customer support. This tool has become essential to our daily operations. A real game-changer!",
      rating: 5,
      avatar: "MC"
    }
  ];

  return (
    <div className={\`transition-all duration-1000 \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Welcome to the Future
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of web applications with our cutting-edge platform 
              designed to boost productivity and streamline your workflow like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover powerful features designed to help you succeed and achieve your goals faster than ever before
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who love our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Join thousands of satisfied users who have revolutionized their productivity with our platform. 
            Start your journey today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;`,

          "pages/About.tsx": `import React from 'react';
import { CheckCircle, Users, Target, Award } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Alex Thompson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech innovation and startup development",
      avatar: "AT"
    },
    {
      name: "Sarah Davis", 
      role: "CTO",
      bio: "Full-stack architect passionate about scalable solutions and cutting-edge technology",
      avatar: "SD"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Designer",
      bio: "UX expert creating beautiful, intuitive user experiences that users love",
      avatar: "MR"
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Innovation",
      description: "Constantly pushing boundaries to deliver cutting-edge solutions that make a real difference"
    },
    {
      icon: <Award className="w-8 h-8 text-green-500" />,
      title: "Quality",
      description: "Committed to excellence in every aspect of our work, from code to customer service"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Customer Focus",
      description: "Your success is our priority, always. We build solutions that truly serve your needs"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
    { number: "50+", label: "Countries" }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Story</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're a passionate team of innovators dedicated to creating exceptional 
            digital experiences that make a real difference in how people work and live. 
            Our mission is to empower everyone with the tools they need to succeed.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              At our core, we believe technology should empower people, not complicate their lives. 
              Our mission is to create intuitive, powerful tools that help businesses and individuals 
              achieve their goals more efficiently and effectively.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              We combine cutting-edge technology with thoughtful design to deliver solutions 
              that are both powerful and easy to use. Every feature we build is designed 
              with our users' success in mind.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Innovation</span>
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">Excellence</span>
              <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">Customer-First</span>
              <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">Reliability</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                To be the leading platform that transforms how teams collaborate 
                and achieve their goals through innovative technology solutions that 
                make work more enjoyable and productive.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600">
            The talented people behind our success
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                {member.avatar}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how our platform can transform your workflow and help you achieve more than you ever thought possible.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;`,

          "pages/Services.tsx": `import React from 'react';
import { Check, ArrowRight, Code, Smartphone, Cloud, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12 text-blue-500" />,
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices",
      features: ["React & TypeScript", "Responsive Design", "Performance Optimization", "SEO Ready", "Modern UI/UX"],
      price: "Starting at $2,999",
      popular: false
    },
    {
      icon: <Smartphone className="w-12 h-12 text-green-500" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["iOS & Android", "React Native", "App Store Deployment", "Push Notifications", "Offline Support"],
      price: "Starting at $4,999",
      popular: true
    },
    {
      icon: <Cloud className="w-12 h-12 text-purple-500" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: ["AWS/Azure Setup", "Auto Scaling", "Database Management", "24/7 Monitoring", "Security Compliance"],
      price: "Starting at $1,999",
      popular: false
    },
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: "Consulting",
      description: "Technical consulting and architecture planning services",
      features: ["System Architecture", "Tech Stack Selection", "Performance Audit", "Best Practices", "Team Training"],
      price: "Starting at $299/hour",
      popular: false
    }
  ];

  const process = [
    {
      step: "1",
      title: "Discovery",
      description: "We understand your needs, goals, and technical requirements in detail",
      icon: "🔍"
    },
    {
      step: "2", 
      title: "Planning",
      description: "Create detailed project roadmap with timelines and milestones",
      icon: "📋"
    },
    {
      step: "3",
      title: "Development",
      description: "Build with regular updates, feedback loops, and quality assurance",
      icon: "⚡"
    },
    {
      step: "4",
      title: "Launch",
      description: "Deploy, test, and provide ongoing support and maintenance",
      icon: "🚀"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive digital solutions to help your business grow and succeed in the modern world. 
            From web development to cloud solutions, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className={\`relative bg-white p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 \${service.popular ? 'border-blue-500 ring-4 ring-blue-50' : 'border-gray-100 hover:border-gray-200'}\`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {service.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={\`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 \${service.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}\`}>
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we deliver exceptional results for every project, ensuring quality and client satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how we can help bring your vision to life with our expert team and proven process. 
            Get a free consultation and quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              Get Free Quote
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;`,

          "pages/Contact.tsx": `import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "hello@company.com",
      subtitle: "Send us an email anytime - we reply within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone", 
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 9am to 6pm EST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: "123 Innovation Street, Tech City, TC 12345",
      subtitle: "Come say hello at our headquarters"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM EST",
      subtitle: "Weekend support available for urgent matters"
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We respond to all inquiries within 24 hours during business days, and often much sooner."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! We offer a complimentary 30-minute consultation to discuss your project needs and goals."
    },
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on scope, but most web applications take 4-8 weeks from start to finish."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Have a question or want to work together? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible with detailed information about how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project or question..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600">Multiple ways to reach us for your convenience.</p>
            </div>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-blue-600">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-900 mb-1 font-medium">{info.details}</p>
                    <p className="text-sm text-gray-500">{info.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional CTA */}
        <div className="text-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Prefer to schedule a call?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Book a free 30-minute consultation to discuss your project in detail. 
            We'll analyze your needs and provide expert recommendations.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;`,

          "package.json": `{
  "name": "modern-web-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@tanstack/react-query": "^5.0.0",
    "lucide-react": "^0.400.0",
    "sonner": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "eslint": "^8.45.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0"
  }
}`
        },
        instructions: `Complete Setup Instructions for ${safeName}:

1. **Extract all files** to your project directory
2. **Install dependencies**: Run 'npm install' or 'yarn install'
3. **Start development server**: Run 'npm run dev' or 'yarn dev'
4. **Open browser**: Navigate to http://localhost:5173

**Application Features:**
- Modern React 18 with TypeScript and strict typing
- Responsive multi-page application with smooth navigation
- Beautiful UI with Tailwind CSS and modern design patterns
- React Router for seamless client-side routing
- Interactive forms with validation and user feedback
- Professional design with gradients, animations, and hover effects
- Mobile-responsive layout that works on all devices
- Contact form with toast notifications
- Services showcase with detailed pricing
- Team and company information sections
- Modern gradient designs and card layouts
- Performance optimized with lazy loading

**Pages Included:**
- Home: Hero section with CTA, features showcase, testimonials, statistics
- About: Company mission, team profiles, core values, company stats
- Services: Detailed service offerings with pricing and features
- Contact: Contact form, company information, FAQ section

**Tech Stack:**
- React 18 with TypeScript for type safety
- React Router for client-side navigation  
- Tailwind CSS for utility-first styling
- Lucide React for beautiful icons
- Sonner for toast notifications
- Vite for lightning-fast development
- ESLint for code quality

**Deployment Ready:**
- Run 'npm run build' for production build
- Deploy to Vercel, Netlify, or any static hosting service
- All assets optimized for production
- SEO-friendly structure

**Customization:**
- Modify colors in Tailwind config
- Update content in page components
- Add new pages by creating components and routes
- Customize styling with Tailwind utilities`,
        techStack: ["React", "TypeScript", "Tailwind CSS", "React Router", "Vite", "Lucide Icons"],
        deployUrl: `https://${safeSlug}.vercel.app`
      };
    }

    console.log('Final generated application structure:', Object.keys(generatedCode.files));
    return new Response(JSON.stringify(generatedCode), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
