import { useState, useEffect } from "react";
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
  Play,
  FileText
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface GeneratedCode {
  files: Record<string, string>;
  instructions: string;
  techStack: string[];
  deployUrl: string;
}

const BuildPreview = () => {
  const location = useLocation();
  const prompt = location.state?.prompt || "Build a modern web application";
  const idea = location.state?.idea || "AI-powered task management app";
  
  const [buildProgress, setBuildProgress] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [creditsUsed, setCreditsUsed] = useState(2);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [buildComplete, setBuildComplete] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const maxCredits = 3;

  const createAdvancedPreviewHtml = (code: GeneratedCode) => {
    console.log('Creating preview HTML with files:', Object.keys(code.files));
    
    // Get all the React components
    const appTsx = code.files["App.tsx"] || "";
    const headerTsx = code.files["components/Header.tsx"] || "";
    const footerTsx = code.files["components/Footer.tsx"] || "";
    const homeTsx = code.files["pages/Home.tsx"] || "";
    const aboutTsx = code.files["pages/About.tsx"] || "";
    const contactTsx = code.files["pages/Contact.tsx"] || "";
    
    // Create a comprehensive HTML document that can run the React app
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${idea}</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/react-router-dom@6.8.0/dist/umd/react-router-dom.development.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: system-ui, -apple-system, sans-serif;
            background: #f8fafc;
        }
        * {
            box-sizing: border-box;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect } = React;
        const { BrowserRouter: Router, Routes, Route, Link, useLocation } = ReactRouterDOM;

        // Header Component
        ${headerTsx.replace('export default Header;', '')}

        // Footer Component  
        ${footerTsx.replace('export default Footer;', '')}

        // Home Component
        ${homeTsx.replace('export default Home;', '')}

        // About Component
        ${aboutTsx.replace('export default About;', '')}

        // Contact Component
        ${contactTsx.replace('export default Contact;', '')}

        // Main App Component
        ${appTsx.replace('export default App;', '')}

        // Render the app
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(App));
    </script>
</body>
</html>`;
    
    console.log('Generated preview HTML length:', html.length);
    return html;
  };

  const handleStartBuild = async () => {
    if (creditsUsed >= maxCredits) {
      toast({
        title: "Credit limit reached",
        description: "Please upgrade your plan to continue building.",
        variant: "destructive"
      });
      return;
    }

    setIsBuilding(true);
    setBuildProgress(0);
    setGeneratedCode(null);
    setBuildComplete(false);
    setPreviewHtml("");

    // Simulate realistic build progress
    const progressInterval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85; // Wait for AI response before completing
        }
        return prev + Math.random() * 8 + 2; // More realistic progress increments
      });
    }, 800);

    try {
      console.log('Starting comprehensive code generation with prompt:', prompt);
      
      const { data, error } = await supabase.functions.invoke('generate-code', {
        body: { 
          prompt: prompt,
          projectName: idea
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Generated comprehensive code response:', data);
      console.log('Files generated:', Object.keys(data.files || {}));
      
      setGeneratedCode(data);
      
      // Create advanced preview HTML
      const html = createAdvancedPreviewHtml(data);
      setPreviewHtml(html);
      
      setBuildProgress(100);
      setBuildComplete(true);
      setCreditsUsed(prev => prev + 1);
      
      toast({
        title: "Build completed successfully!",
        description: `Generated ${Object.keys(data.files || {}).length} files for your application.`,
      });
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: "Build failed",
        description: "There was an error generating your application. Please try again.",
        variant: "destructive"
      });
      setBuildProgress(0);
    } finally {
      clearInterval(progressInterval);
      setIsBuilding(false);
    }
  };

  const handleDownloadCode = () => {
    if (!generatedCode) return;

    // Create and download all files
    Object.entries(generatedCode.files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // Download setup instructions
    const instructionsBlob = new Blob([generatedCode.instructions], { type: 'text/plain' });
    const instructionsUrl = URL.createObjectURL(instructionsBlob);
    const instructionsLink = document.createElement('a');
    instructionsLink.href = instructionsUrl;
    instructionsLink.download = 'SETUP_INSTRUCTIONS.txt';
    document.body.appendChild(instructionsLink);
    instructionsLink.click();
    document.body.removeChild(instructionsLink);
    URL.revokeObjectURL(instructionsUrl);

    toast({
      title: "Complete project downloaded!",
      description: `All ${Object.keys(generatedCode.files).length} project files have been downloaded.`,
    });
  };

  const handleOpenPreview = () => {
    if (!previewHtml) return;
    
    const blob = new Blob([previewHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank', 'width=1200,height=800');
    
    if (newWindow) {
      newWindow.onload = () => {
        URL.revokeObjectURL(url);
      };
    } else {
      toast({
        title: "Popup blocked",
        description: "Please allow popups to view the preview in a new window.",
        variant: "destructive"
      });
    }
  };

  const buildSteps = [
    { name: "Analyzing requirements", completed: buildProgress > 5 },
    { name: "Setting up project structure", completed: buildProgress > 15 },
    { name: "Installing dependencies", completed: buildProgress > 30 },
    { name: "Generating components", completed: buildProgress > 50 },
    { name: "Creating pages and routing", completed: buildProgress > 65 },
    { name: "Adding styling and interactions", completed: buildProgress > 80 },
    { name: "Finalizing application", completed: buildComplete }
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
              Watch your idea transform into a complete, functional web application
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
                        {isBuilding ? "AI is crafting your application..." : buildComplete ? "Build complete!" : "Ready to build"}
                      </p>
                    </div>
                    <Badge variant={buildComplete ? "default" : "secondary"}>
                      {buildComplete ? "Complete" : `${Math.round(buildProgress)}%`}
                    </Badge>
                  </div>
                  
                  <Progress value={buildProgress} className="h-3 mb-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {buildSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
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
                      <span>Live Application Preview</span>
                    </CardTitle>
                    {buildComplete && previewHtml && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="glass-card hover:bg-white/10"
                        onClick={handleOpenPreview}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Full App
                      </Button>
                    )}
                  </div>
                </CardHeader>                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 rounded-lg border border-white/20 overflow-hidden">
                    {buildComplete && previewHtml ? (
                      <iframe
                        srcDoc={previewHtml}
                        className="w-full h-full border-0"
                        title="Live App Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        style={{ background: 'white' }}
                      />
                    ) : isBuilding ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center animate-pulse">
                            <Code className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Creating Your Application...</h3>
                          <p className="text-muted-foreground mb-4">
                            AI is generating a complete, functional web application with multiple pages, components, and interactive features.
                          </p>
                          <div className="text-sm text-muted-foreground">
                            Progress: {Math.round(buildProgress)}% • {buildSteps.filter(s => s.completed).length}/{buildSteps.length} steps complete
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center">
                            <Code className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Ready to Build Your App</h3>
                          <p className="text-muted-foreground mb-4">
                            Generate a complete, production-ready web application with multiple pages, 
                            interactive components, and professional design.
                          </p>
                          <Button 
                            onClick={handleStartBuild}
                            disabled={creditsUsed >= maxCredits}
                            className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90"
                            size="lg"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            {creditsUsed >= maxCredits ? "Upgrade to Continue" : "Start Building"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {buildComplete && generatedCode && (
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-center space-x-3">
                        <Button 
                          onClick={handleDownloadCode}
                          className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90"
                          size="lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Complete Project
                        </Button>
                        <Button 
                          variant="outline" 
                          className="glass-card hover:bg-white/10"
                          onClick={handleOpenPreview}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Full Preview
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          Generated {Object.keys(generatedCode.files).length} files • Ready to deploy
                        </p>
                        <div className="flex justify-center space-x-2 flex-wrap">
                          {generatedCode.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
                    disabled={!buildComplete}
                    onClick={handleDownloadCode}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Project
                  </Button>
                  <Link to="/feedback">
                    <Button 
                      variant="outline" 
                      className="w-full glass-card hover:bg-white/10"
                      disabled={!buildComplete}
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
                  {generatedCode?.files && (
                    <div>
                      <h4 className="font-semibold mb-1">Generated Files</h4>
                      <p className="text-sm text-muted-foreground">
                        {Object.keys(generatedCode.files).length} files created
                      </p>
                    </div>
                  )}
                  {generatedCode?.techStack ? (
                    <div>
                      <h4 className="font-semibold mb-1">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {generatedCode.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold mb-1">Expected Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {["React", "TypeScript", "Tailwind", "React Router"].map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-1">Status</h4>
                    <Badge variant={buildComplete ? "default" : "secondary"}>
                      {buildComplete ? "Ready" : isBuilding ? "Building" : "Pending"}
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
