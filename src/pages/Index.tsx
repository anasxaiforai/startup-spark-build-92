
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { 
  Sparkles, 
  Zap, 
  Code, 
  Rocket, 
  ArrowRight, 
  Star,
  Users,
  Globe,
  Shield
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Builder",
      description: "Transform your ideas into fully functional web apps using advanced AI technology."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Prompting", 
      description: "Our intelligent system refines your prompts for optimal code generation."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code Generation",
      description: "Get production-ready, well-structured code that follows best practices."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "One-Click Deploy",
      description: "Deploy your applications instantly to leading hosting platforms."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Indie Hacker",
      content: "BuildAI helped me launch my SaaS in just 2 weeks. The code quality is incredible!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "Solo Founder",
      content: "I went from idea to MVP faster than I ever thought possible. Game changer!",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Entrepreneur",
      content: "The AI understands exactly what I want to build. It's like having a senior developer on demand.",
      rating: 5
    }
  ];

  const stats = [
    { value: "10K+", label: "Projects Built" },
    { value: "5K+", label: "Happy Builders" },
    { value: "99%", label: "Success Rate" },
    { value: "24/7", label: "AI Available" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Turn Your <span className="gradient-text">Ideas</span> Into
              <br />
              <span className="gradient-text">Reality</span> with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The ultimate AI-powered platform for entrepreneurs, indie hackers, and solo founders 
              to build and deploy web applications without writing a single line of code.
            </p>
          </div>
          
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect text-lg px-8 py-6 animate-glow"
              >
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card hover:bg-white/10 text-lg px-8 py-6"
              >
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Build <span className="gradient-text">Smarter</span>, Ship <span className="gradient-text">Faster</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform handles the complex stuff so you can focus on what matters most - your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-xl flex items-center justify-center text-primary animate-float">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              From idea to deployed app in just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Idea",
                description: "Tell our AI what you want to build using natural language. No technical jargon needed."
              },
              {
                step: "02", 
                title: "AI Generates Blueprint",
                description: "Our AI creates a detailed project blueprint with features, tech stack, and implementation plan."
              },
              {
                step: "03",
                title: "Deploy & Launch",
                description: "Review, customize, and deploy your fully functional web application with one click."
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center text-2xl font-bold text-white glow-effect">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by <span className="gradient-text">Builders</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community of creators is saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="glass-card hover:glow-effect transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-section py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build Your <span className="gradient-text">Next Big Thing</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of entrepreneurs who are already building with BuildAI
          </p>
          <Link to="/start">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect text-lg px-8 py-6 animate-glow"
            >
              Start Building for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-electric-purple rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">BuildAI</span>
              </div>
              <p className="text-muted-foreground">
                Transform ideas into reality with AI-powered web development.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/start" className="hover:text-foreground transition-colors">AI Builder</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/tech-advisor" className="hover:text-foreground transition-colors">Tech Advisor</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BuildAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
