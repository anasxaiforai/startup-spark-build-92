
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  RefreshCw, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Clock,
  Zap,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const PromptEditor = () => {
  const location = useLocation();  
  const navigate = useNavigate();
  const idea = location.state?.idea || "AI-powered task management app";
  
  const [showBefore, setShowBefore] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(8 * 60 * 60); // 8 hours in seconds
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const originalPrompt = idea;

  // Generate optimized prompt on component mount
  useEffect(() => {
    generateOptimizedPrompt();
  }, []);

  const generateOptimizedPrompt = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('optimize-prompt', {
        body: { originalPrompt: idea }
      });

      if (error) throw error;

      setOptimizedPrompt(data.optimizedPrompt);
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      // Fallback to default prompt
      setOptimizedPrompt(`Create a modern, responsive AI-powered task management web application with the following specifications:

**Core Features:**
- User authentication and profile management
- Intelligent task creation with AI-powered categorization
- Real-time collaboration features for team environments
- Advanced analytics dashboard with progress tracking
- Smart priority recommendations based on deadlines and dependencies

**Technical Requirements:**
- Frontend: React 18+ with TypeScript
- Styling: Tailwind CSS with modern design system
- State Management: React Query for server state, Zustand for client state
- Backend: Node.js with Express, PostgreSQL database
- Authentication: JWT-based with refresh tokens
- Real-time: WebSocket integration for live updates

**UI/UX Guidelines:**
- Clean, minimalist interface with intuitive navigation
- Dark/light theme toggle with system preference detection
- Responsive design optimized for desktop and mobile
- Accessible components following WCAG guidelines
- Smooth animations and micro-interactions

**AI Integration:**
- Natural language task input processing
- Automatic task categorization and tagging
- Smart deadline and priority suggestions
- Workload balancing recommendations
- Productivity insights and analytics

Please generate production-ready code with proper error handling, loading states, and comprehensive documentation.`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilRefresh(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleRefresh = async () => {
    if (refreshCount >= 3) return;
    
    setRefreshCount(prev => prev + 1);
    await generateOptimizedPrompt();
  };

  const handleProceedToBuild = () => {
    navigate("/build-preview", { state: { prompt: optimizedPrompt, idea } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center glow-effect animate-float">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prompt <span className="gradient-text">Editor</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fine-tune your AI-generated prompt to ensure perfect results for your project
            </p>
          </div>

          {/* Refresh Status */}
          <Card className="glass-card mb-8 animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Refresh Limit</span>
                  </div>
                  <Badge variant={refreshCount >= 3 ? "destructive" : "secondary"}>
                    {refreshCount}/3 Used
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Next refresh in: {formatTime(timeUntilRefresh)}
                  </span>
                  <Button
                    onClick={handleRefresh}
                    disabled={refreshCount >= 3 || isGenerating}
                    variant="outline"
                    size="sm"
                    className="glass-card hover:bg-white/10"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toggle View */}
          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-1 rounded-lg">
              <div className="flex space-x-1">
                <Button
                  variant={!showBefore ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setShowBefore(false)}
                  className={!showBefore ? "bg-primary" : "hover:bg-white/10"}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  After (Optimized)
                </Button>
                <Button
                  variant={showBefore ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setShowBefore(true)}
                  className={showBefore ? "bg-primary" : "hover:bg-white/10"}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Before (Original)
                </Button>
              </div>
            </div>
          </div>

          {/* Prompt Display */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {showBefore ? (
                      <>
                        <EyeOff className="w-5 h-5" />
                        <span>Original Prompt</span>
                        <Badge variant="outline">Raw Input</Badge>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Optimized Prompt</span>
                        <Badge variant="default" className="bg-gradient-to-r from-electric-blue to-electric-purple">
                          AI Enhanced
                        </Badge>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={showBefore ? originalPrompt : optimizedPrompt}
                    onChange={(e) => !showBefore && setOptimizedPrompt(e.target.value)}
                    className="min-h-[400px] glass-card border-white/20 focus:border-primary/50 resize-none text-sm"
                    readOnly={showBefore}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-muted-foreground">
                      {(showBefore ? originalPrompt : optimizedPrompt).length} characters
                    </span>
                    {!showBefore && (
                      <Badge variant="secondary" className="text-xs">
                        Editable
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Improvements Panel */}
            <div className="space-y-6">
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>AI Improvements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Added technical specifications",
                      "Included UI/UX guidelines", 
                      "Specified AI integration details",
                      "Added authentication requirements",
                      "Included responsive design specs"
                    ].map((improvement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <CardHeader>
                  <CardTitle>Quality Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">94%</div>
                    <p className="text-sm text-muted-foreground">
                      Excellent prompt quality with comprehensive technical details
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Build?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your prompt has been optimized and is ready for code generation. 
                Proceed to see a live preview of your application being built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleProceedToBuild}
                  className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3"
                >
                  Proceed to Build
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="glass-card hover:bg-white/10">
                  Save Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptEditor;
