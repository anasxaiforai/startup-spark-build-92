
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { 
  ArrowRight, 
  CheckCircle, 
  Target, 
  Users, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  Droplet,
  BarChart3,
  Edit3
} from "lucide-react";

const Blueprint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idea = location.state?.idea || "AI-powered task management app";
  const [blueprintData, setBlueprintData] = useState(location.state?.blueprintData || null);
  const [isRefining, setIsRefining] = useState(false);

  // Default data if no AI-generated data is available
  const defaultData = {
    pmf: {
      score: 85,
      strengths: ["High demand for productivity tools", "Clear pain point identified", "Proven market exists"],
      concerns: ["Competitive landscape", "User acquisition cost"]
    },
    problemFit: {
      score: 92,
      problem: "Remote teams struggle with task coordination and visibility",
      solution: "AI-powered task management with real-time collaboration",
      targetUsers: "Remote teams, startups, agencies"
    },
    mvpBreakdown: {
      coreFeatures: [
        "User authentication & profiles",
        "Task creation & management", 
        "AI-powered task categorization",
        "Real-time collaboration",
        "Basic analytics dashboard"
      ],
      timeline: "6-8 weeks",
      complexity: "Medium"
    }
  };

  const data = blueprintData || defaultData;

  const handleRefinePrompt = () => {
    setIsRefining(true);
    setTimeout(() => {
      setIsRefining(false);
      navigate("/prompt-editor", { state: { idea } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Product <span className="gradient-text">Blueprint</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              AI-generated analysis and roadmap for: <span className="text-primary font-semibold">"{idea}"</span>
            </p>
            <Badge className="bg-gradient-to-r from-electric-blue to-electric-purple text-white">
              Analysis Complete
            </Badge>
          </div>

          {/* Blueprint Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* PMF Analysis */}
            <Card className="glass-card glow-effect animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Product-Market Fit</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">{data.pmf.score}%</div>
                    <Progress value={data.pmf.score} className="h-3" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-green-400">Strengths</h4>
                    <ul className="space-y-2">
                      {data.pmf.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-yellow-400">Areas of Concern</h4>
                    <ul className="space-y-2">
                      {data.pmf.concerns.map((concern, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problem Fit */}
            <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-primary" />
                  <span>Problem Fit Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">{data.problemFit.score}%</div>
                    <Progress value={data.problemFit.score} className="h-3" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Problem Statement</h4>
                    <p className="text-muted-foreground text-sm">{data.problemFit.problem}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Proposed Solution</h4>
                    <p className="text-muted-foreground text-sm">{data.problemFit.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Target Users</h4>
                    <p className="text-muted-foreground text-sm">{data.problemFit.targetUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MVP Breakdown */}
          <Card className="glass-card glow-effect mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-primary" />
                <span>MVP Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Core Features</h4>
                  <ul className="space-y-2">
                    {data.mvpBreakdown.coreFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Timeline</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">{data.mvpBreakdown.timeline}</div>
                    <p className="text-sm text-muted-foreground">Estimated development time</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Complexity</h4>
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {data.mvpBreakdown.complexity}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">Development complexity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Effects */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Tailwind Effect</h3>
                <p className="text-sm text-muted-foreground">
                  AI features create competitive moat, driving user retention and premium pricing opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Snowball Effect</h3>
                <p className="text-sm text-muted-foreground">
                  Team collaboration features encourage viral growth through workplace adoption.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CardContent className="p-6 text-center">
                <Droplet className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Leaking Bucket</h3>
                <p className="text-sm text-muted-foreground">
                  Risk: User churn if AI recommendations lack accuracy. Mitigation: Continuous learning system.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Refine Prompt Section */}
          <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <CardContent className="p-8 text-center">
              <Edit3 className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Ready to Refine Your Prompt?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Based on this analysis, we'll generate an optimized AI prompt that captures all the insights and requirements for your product.
              </p>
              <Button
                onClick={handleRefinePrompt}
                disabled={isRefining}
                className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3"
              >
                {isRefining ? (
                  <>
                    <Zap className="mr-2 w-5 h-5 animate-spin" />
                    Generating Prompt...
                  </>
                ) : (
                  <>
                    Refine Prompt
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;
