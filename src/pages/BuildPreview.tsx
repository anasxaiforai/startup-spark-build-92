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

  const createWorkingPreviewHtml = (code: GeneratedCode) => {
    console.log('Creating working preview HTML with files:', Object.keys(code.files));
    
    // Extract components and clean them properly
    const cleanReactComponent = (componentCode: string, componentName: string) => {
      if (!componentCode) return `const ${componentName} = () => React.createElement('div', {}, 'Component not found');`;
      
      // Remove imports and exports, keep the component logic
      let cleaned = componentCode
        .replace(/import.*?from.*?;/g, '') // Remove imports
        .replace(/export\s+default\s+\w+;?/g, '') // Remove default exports
        .replace(/export\s+{\s*\w+\s*};?/g, '') // Remove named exports
        .trim();
      
      // If the component doesn't start with const/function, wrap it
      if (!cleaned.startsWith('const ') && !cleaned.startsWith('function ')) {
        // Extract the component body if it's a function component
        const match = cleaned.match(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{([\s\S]*)}/) || 
                     cleaned.match(/function\s+\w+\s*\([^)]*\)\s*{([\s\S]*)}/) ||
                     cleaned.match(/\([^)]*\)\s*=>\s*{([\s\S]*)}/) ||
                     cleaned.match(/\([^)]*\)\s*=>\s*([\s\S]*)/);
        
        if (match) {
          const body = match[1] || match[0];
          cleaned = `const ${componentName} = () => { ${body.includes('return') ? body : `return (${body})`} };`;
        } else {
          // Fallback: assume it's JSX
          cleaned = `const ${componentName} = () => { return (${cleaned}); };`;
        }
      }
      
      return cleaned;
    };
    
    const appCode = cleanReactComponent(code.files["App.tsx"] || "", "App");
    const headerCode = cleanReactComponent(code.files["components/Header.tsx"] || "", "Header");
    const footerCode = cleanReactComponent(code.files["components/Footer.tsx"] || "", "Footer");
    const homeCode = cleanReactComponent(code.files["pages/Home.tsx"] || "", "Home");
    const aboutCode = cleanReactComponent(code.files["pages/About.tsx"] || "", "About");
    const contactCode = cleanReactComponent(code.files["pages/Contact.tsx"] || "", "Contact");
    
    // Create a comprehensive HTML document
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${idea}</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-router-dom@6.8.0/dist/umd/react-router-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', system-ui, sans-serif;
            background: #ffffff;
        }
        * { box-sizing: border-box; }
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-size: 18px;
            color: #666;
        }
        .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 12px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div id="root">
        <div class="loading">
            <div class="spinner"></div>
            Loading ${idea}...
        </div>
    </div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        const { BrowserRouter: Router, Routes, Route, Link, useLocation } = ReactRouterDOM;

        console.log('Initializing React application...');

        // Define components
        ${headerCode}
        
        ${footerCode}
        
        ${homeCode}
        
        ${aboutCode}
        
        ${contactCode}
        
        ${appCode}

        // Error boundary component
        class ErrorBoundary extends React.Component {
            constructor(props) {
                super(props);
                this.state = { hasError: false, error: null };
            }

            static getDerivedStateFromError(error) {
                return { hasError: true, error };
            }

            componentDidCatch(error, errorInfo) {
                console.error('React Error:', error, errorInfo);
            }

            render() {
                if (this.state.hasError) {
                    return React.createElement('div', {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            padding: '20px',
                            textAlign: 'center',
                            color: '#666'
                        }
                    }, [
                        React.createElement('h2', { key: 'title', style: { color: '#e74c3c', marginBottom: '16px' } }, 'Application Error'),
                        React.createElement('p', { key: 'message' }, 'There was an error rendering the application.'),
                        React.createElement('div', {
                            key: 'error',
                            style: {
                                marginTop: '20px',
                                padding: '20px',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                borderLeft: '4px solid #e74c3c'
                            }
                        }, React.createElement('code', { style: { color: '#333' } }, this.state.error?.message || 'Unknown error'))
                    ]);
                }

                return this.props.children;
            }
        }

        // Render the application
        try {
            console.log('Rendering application...');
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(
                React.createElement(ErrorBoundary, {}, 
                    React.createElement(App)
                )
            );
            console.log('Application rendered successfully!');
        } catch (error) {
            console.error('Failed to render application:', error);
            document.getElementById('root').innerHTML = \`
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; padding: 20px; text-align: center; color: #666;">
                    <h2 style="color: #e74c3c; margin-bottom: 16px;">Render Error</h2>
                    <p>Failed to initialize the React application.</p>
                    <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #e74c3c;">
                        <code style="color: #333;">\${error.message}</code>
                    </div>
                </div>
            \`;
        }
    </script>
</body>
</html>`;
    
    console.log('Generated working preview HTML, length:', html.length);
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

    // Simulate build progress
    const progressInterval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 800);

    try {
      console.log('Starting code generation with prompt:', prompt);
      
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

      console.log('Code generation successful:', data);
      setGeneratedCode(data);
      
      // Create working preview HTML
      try {
        const html = createWorkingPreviewHtml(data);
        setPreviewHtml(html);
        console.log('Preview HTML created successfully');
      } catch (previewError) {
        console.error('Error creating preview HTML:', previewError);
      }
      
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

    // Download all files
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

    // Download instructions
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
    if (!previewHtml) {
      toast({
        title: "Preview not available",
        description: "Please wait for the build to complete first.",
        variant: "destructive"
      });
      return;
    }
    
    const blob = new Blob([previewHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank', 'width=1200,height=800');
    
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => URL.revokeObjectURL(url), 1000);
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
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 rounded-lg border border-white/20 overflow-hidden">
                    {buildComplete && previewHtml ? (
                      <iframe
                        srcDoc={previewHtml}
                        className="w-full h-full border-0"
                        title="Live App Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        style={{ background: 'white' }}
                        onLoad={() => console.log('Preview iframe loaded successfully')}
                        onError={(e) => console.error('Preview iframe error:', e)}
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
                          disabled={!previewHtml}
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
