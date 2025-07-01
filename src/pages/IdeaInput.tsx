import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Sparkles, ArrowRight, Lightbulb, Zap, Code, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const IdeaInput = () => {
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-blueprint', {
        body: { idea }
      });

      if (error) throw error;

      navigate("/blueprint", { state: { idea, blueprintData: data } });
    } catch (error) {
      console.error('Error generating blueprint:', error);
      toast({
        title: "Error",
        description: "Failed to generate blueprint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exampleIdeas = [
    "A task management app for remote teams with real-time collaboration",
    "An AI-powered expense tracker that categorizes receipts automatically", 
    "A social platform for indie makers to showcase their projects",
    "A subscription-based meal planning service with grocery integration"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center glow-effect animate-float">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Start Your <span className="gradient-text">Build</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your product idea in your own words. Our AI will understand and transform it into a complete development blueprint.
            </p>
          </div>

          {/* Main Input Card */}
          <Card className="glass-card glow-effect mb-8 animate-slide-up">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold mb-3">
                    What do you want to build?
                  </label>
                  <Textarea
                    placeholder="Describe your idea here... For example: I want to build a social media platform for pet owners where they can share photos, find local pet services, and connect with other pet lovers in their area."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="min-h-[150px] text-base glass-card border-white/20 focus:border-primary/50 resize-none"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {idea.length}/1000 characters
                  </span>
                  <Button
                    onClick={handleGenerate}
                    disabled={!idea.trim() || isGenerating}
                    className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Blueprint
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Ideas */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Need Inspiration? Try These Ideas
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {exampleIdeas.map((example, index) => (
                <Card
                  key={index}
                  className="glass-card hover:glow-effect transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => setIdea(example)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            {[
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Describe",
                description: "Tell us your idea in plain English"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Analyze",
                description: "AI analyzes and structures your concept"
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: "Generate",
                description: "Creates detailed development blueprint"
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Build",
                description: "Transform blueprint into working code"
              }
            ].map((step, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-xl flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Animation */}
          {isGenerating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Card className="glass-card p-8 text-center animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyzing Your Idea</h3>
                <p className="text-muted-foreground">
                  Our AI is processing your concept and creating a detailed blueprint...
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaInput;
