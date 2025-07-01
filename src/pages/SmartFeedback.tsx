
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Shield, 
  Code,
  Users,
  Smartphone,
  ArrowRight,
  RefreshCw
} from "lucide-react";

const SmartFeedback = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  const feedbackCategories = [
    {
      id: "broken-flows",
      title: "Broken Flows",
      icon: <XCircle className="w-5 h-5" />,
      severity: "high",
      count: 2,
      color: "text-red-400"
    },
    {
      id: "missing-features", 
      title: "Missing Features",
      icon: <AlertTriangle className="w-5 h-5" />,
      severity: "medium",
      count: 5,
      color: "text-yellow-400"
    },
    {
      id: "ui-issues",
      title: "UI Inconsistencies",
      icon: <Smartphone className="w-5 h-5" />,
      severity: "low",
      count: 3,
      color: "text-blue-400"
    },
    {
      id: "security",
      title: "Security Warnings",
      icon: <Shield className="w-5 h-5" />,
      severity: "high", 
      count: 1,
      color: "text-red-400"
    }
  ];

  const detailedFeedback = [
    {
      category: "Broken Flows",
      severity: "high",
      title: "Authentication redirect loop",
      description: "Users get stuck in redirect loop when logging in with expired tokens",
      solution: "Implement proper token refresh mechanism and fallback to login page",
      confidence: 95
    },
    {
      category: "Broken Flows", 
      severity: "high",
      title: "Task creation form validation",
      description: "Form submits with empty required fields, causing server errors",
      solution: "Add client-side validation before form submission",
      confidence: 89
    },
    {
      category: "Missing Features",
      severity: "medium", 
      title: "Bulk task operations",
      description: "Users cannot select and perform actions on multiple tasks simultaneously",
      solution: "Implement checkbox selection with bulk action toolbar",
      confidence: 78
    },
    {
      category: "Missing Features",
      severity: "medium",
      title: "Task filtering and search",
      description: "No way to filter tasks by status, priority, or search by keywords",
      solution: "Add search bar and filter dropdown components",
      confidence: 85
    },
    {
      category: "UI Inconsistencies",
      severity: "low",
      title: "Button styling variations",
      description: "Primary buttons have inconsistent padding and colors across pages",
      solution: "Standardize button components using design system tokens",
      confidence: 92
    },
    {
      category: "Security Warnings",
      severity: "high",
      title: "API endpoints not rate limited", 
      description: "Critical endpoints lack rate limiting, vulnerable to abuse",
      solution: "Implement rate limiting middleware with Redis backing store",
      confidence: 94
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-400 bg-red-400/10";
      case "medium": return "text-yellow-400 bg-yellow-400/10";
      case "low": return "text-blue-400 bg-blue-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const overallScore = 73;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center glow-effect animate-float">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart <span className="gradient-text">Feedback</span> Scanner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered analysis of your application to identify issues, missing features, and improvement opportunities
            </p>
          </div>

          {/* Scan Summary */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {/* Overall Score */}
            <Card className="glass-card glow-effect md:col-span-2 lg:col-span-1 animate-slide-up">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{overallScore}%</div>
                <div className="text-sm text-muted-foreground mb-4">Overall Quality Score</div>
                <Progress value={overallScore} className="h-2" />
              </CardContent>
            </Card>

            {/* Category Cards */}
            {feedbackCategories.map((category, index) => (
              <Card 
                key={category.id} 
                className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 flex items-center justify-center ${category.color}`}>
                    {category.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{category.count}</div>
                  <div className="text-sm text-muted-foreground">{category.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scan Controls */}
          <Card className="glass-card mb-8 animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Scan Status</h3>
                  <p className="text-muted-foreground">
                    {scanComplete ? "Last scanned 2 minutes ago" : "Scanning in progress..."}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {scanComplete && (
                    <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete
                    </Badge>
                  )}
                  <Button
                    onClick={handleRescan}
                    disabled={isScanning}
                    variant="outline"
                    className="glass-card hover:bg-white/10"
                  >
                    {isScanning ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    {isScanning ? "Scanning..." : "Rescan"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Feedback */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Detailed <span className="gradient-text">Analysis</span>
            </h2>

            {detailedFeedback.map((item, index) => (
              <Card 
                key={index} 
                className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className={getSeverityColor(item.severity)}>
                          {item.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Confidence</div>
                      <div className="text-lg font-bold text-primary">{item.confidence}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Issue Description</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recommended Solution</h4>
                      <p className="text-muted-foreground">{item.solution}</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <Button variant="outline" size="sm" className="glass-card hover:bg-white/10">
                        View Code
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90"
                      >
                        Apply Fix
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card className="glass-card glow-effect mt-12 animate-slide-up">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready for the Next Step?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get personalized recommendations for your tech stack, hosting platform, and deployment strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tech-advisor">
                  <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3">
                    Tech Advisor
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="glass-card hover:bg-white/10">
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartFeedback;
