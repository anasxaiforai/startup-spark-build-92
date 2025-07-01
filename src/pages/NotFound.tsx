
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { ArrowRight, Home, Search, Sparkles } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-8 animate-fade-in">
            <div className="text-9xl font-bold gradient-text mb-4 animate-float">404</div>
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center glow-effect animate-pulse">
              <Search className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold mb-4">
              Page Not <span className="gradient-text">Found</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Oops! The page you're looking for seems to have vanished into the digital void.
            </p>
            <p className="text-muted-foreground">
              Don't worry though - let's get you back on track to building amazing products!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/">
              <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link to="/start">
              <Button variant="outline" className="glass-card hover:bg-white/10 px-8 py-3">
                Start Building
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">
                While you're here, check out these popular pages:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/start" className="glass-card p-4 rounded-lg hover:glow-effect transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-6 h-6 text-primary group-hover:animate-spin" />
                    <div className="text-left">
                      <h4 className="font-semibold">AI Builder</h4>
                      <p className="text-sm text-muted-foreground">Turn ideas into apps</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/dashboard" className="glass-card p-4 rounded-lg hover:glow-effect transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <Home className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h4 className="font-semibold">Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Manage your projects</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/pricing" className="glass-card p-4 rounded-lg hover:glow-effect transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 text-primary">💎</div>
                    <div className="text-left">
                      <h4 className="font-semibold">Pricing</h4>
                      <p className="text-sm text-muted-foreground">Choose your plan</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/tech-advisor" className="glass-card p-4 rounded-lg hover:glow-effect transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 text-primary">🤖</div>
                    <div className="text-left">
                      <h4 className="font-semibold">Tech Advisor</h4>
                      <p className="text-sm text-muted-foreground">Get AI recommendations</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Fun Fact */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Fun fact:</strong> This 404 page was generated by AI in under 30 seconds. 
                Imagine what we can build for your business!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
