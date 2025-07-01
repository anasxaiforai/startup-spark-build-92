
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { 
  Code, 
  Download, 
  Zap, 
  Settings, 
  CreditCard,
  Eye,
  ExternalLink,
  CheckCircle,
  Clock,
  Play
} from "lucide-react";

const BuildPreview = () => {
  const location = useLocation();
  const prompt = location.state?.prompt || "Build a modern web application";
  const idea = location.state?.idea || "AI-powered task management app";
  
  const [buildProgress, setBuildProgress] = useState(75);
  const [isBuilding, setIsBuilding] = useState(false);
  const [creditsUsed, setCreditsUsed] = useState(2);
  const maxCredits = 3;

  const handleStartBuild = () => {
    setIsBuilding(true);
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const buildSteps = [
    { name: "Setting up project structure", completed: true },
    { name: "Installing dependencies", completed: true },
    { name: "Generating components", completed: true },
    { name: "Creating API routes", completed: buildProgress > 80 },
    { name: "Setting up database", completed: buildProgress > 90 },
    { name: "Deploying application", completed: buildProgress === 100 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Build <span className="gradient-text">Preview</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch your idea come to life in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Preview Area */}
            <div className="lg:col-span-3">
              {/* Build Status */}
              <Card className="glass-card mb-6 animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Building: {idea}</h3>
                      <p className="text-sm text-muted-foreground">
                        {isBuilding ? "Building in progress..." : buildProgress === 100 ? "Build complete!" : "Ready to build"}
                      </p>
                    </div>
                    <Badge variant={buildProgress === 100 ? "default" : "secondary"}>
                      {buildProgress === 100 ? "Complete" : `${buildProgress}%`}
                    </Badge>
                  </div>
                  
                  <Progress value={buildProgress} className="h-3 mb-4" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {buildSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`text-xs ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Live Preview */}
              <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>Live Preview</span>
                    </CardTitle>
                    <Button variant="outline" size="sm" className="glass-card hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 rounded-lg border border-white/20 flex items-center justify-center">
                    {buildProgress === 100 ? (
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                        <h3 className="text-xl font-semibold mb-2">Your App is Ready!</h3>
                        <p className="text-muted-foreground mb-4">
                          Your AI-powered task management app has been successfully built and deployed.
                        </p>
                        <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90">
                          <Play className="w-4 h-4 mr-2" />
                          Launch App
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center animate-pulse">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {isBuilding ? "Building Your App..." : "Ready to Build"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {isBuilding 
                            ? "Your application is being generated. This usually takes 2-3 minutes."
                            : "Click the button below to start building your application."
                          }
                        </p>
                        {!isBuilding && buildProgress < 100 && (
                          <Button 
                            onClick={handleStartBuild}
                            className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Building
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Credits */}
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Build Credits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold gradient-text">
                      {maxCredits - creditsUsed}/{maxCredits}
                    </div>
                    <p className="text-sm text-muted-foreground">Builds Remaining</p>
                  </div>
                  <Progress value={((maxCredits - creditsUsed) / maxCredits) * 100} className="h-2 mb-4" />
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full glass-card hover:bg-white/10">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/prompt-editor" state={{ idea }}>
                    <Button variant="outline" className="w-full glass-card hover:bg-white/10">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Prompt
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full glass-card hover:bg-white/10"
                    disabled={buildProgress < 100}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Code
                  </Button>
                  <Link to="/feedback">
                    <Button 
                      variant="outline" 
                      className="w-full glass-card hover:bg-white/10"
                      disabled={buildProgress < 100}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Smart Feedback
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Project Name</h4>
                    <p className="text-sm text-muted-foreground">{idea}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {["React", "TypeScript", "Tailwind", "Supabase"].map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Status</h4>
                    <Badge variant={buildProgress === 100 ? "default" : "secondary"}>
                      {buildProgress === 100 ? "Deployed" : "In Progress"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPreview;
