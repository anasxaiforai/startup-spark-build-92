
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  Database, 
  GitBranch, 
  Globe, 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap,
  Shield,
  DollarSign,
  Clock,
  Users,
  Sparkles
} from "lucide-react";

const TechAdvisor = () => {
  const [selectedCategory, setSelectedCategory] = useState("backend");

  const recommendations = {
    backend: [
      {
        name: "Supabase",
        description: "Open source Firebase alternative with PostgreSQL",
        pros: ["Real-time subscriptions", "Built-in auth", "PostgreSQL database"],
        cons: ["Newer ecosystem", "Learning curve"],
        price: "Free tier + $25/mo",
        rating: 4.8,
        recommended: true,
        icon: <Database className="w-8 h-8" />
      },
      {
        name: "Firebase",
        description: "Google's mobile and web app development platform",
        pros: ["Mature ecosystem", "Easy setup", "Great documentation"],
        cons: ["NoSQL limitations", "Vendor lock-in"],
        price: "Free tier + usage",
        rating: 4.6,
        recommended: false,
        icon: <Zap className="w-8 h-8" />
      },
      {
        name: "Neon",
        description: "Serverless PostgreSQL with instant branching",
        pros: ["Serverless scaling", "Branch databases", "PostgreSQL compatible"],
        cons: ["Newer platform", "Limited regions"],
        price: "Free tier + $20/mo",
        rating: 4.5,
        recommended: false,
        icon: <GitBranch className="w-8 h-8" />
      }
    ],
    hosting: [
      {
        name: "Vercel",
        description: "Frontend cloud platform optimized for Next.js",
        pros: ["Zero config deployment", "Edge functions", "Great DX"],
        cons: ["Can be expensive", "Limited backend"],
        price: "Free tier + $20/mo",
        rating: 4.9,
        recommended: true,
        icon: <Globe className="w-8 h-8" />
      },
      {
        name: "Netlify",
        description: "All-in-one platform for web projects",
        pros: ["Great for static sites", "Form handling", "Edge functions"],
        cons: ["Function cold starts", "Build time limits"],
        price: "Free tier + $19/mo",
        rating: 4.7,
        recommended: false,
        icon: <Sparkles className="w-8 h-8" />
      },
      {
        name: "Cloudflare Pages",
        description: "JAMstack platform with global edge network",
        pros: ["Free generous tier", "Fast CDN", "Great performance"],
        cons: ["Limited build tools", "Newer platform"],
        price: "Free tier + $5/mo",
        rating: 4.4,
        recommended: false,
        icon: <Shield className="w-8 h-8" />
      }
    ],
    repository: [
      {
        name: "GitHub",
        description: "World's leading software development platform",
        pros: ["Best ecosystem", "Actions CI/CD", "Great integrations"],
        cons: ["Can be complex", "Private repos cost"],
        price: "Free + $4/user/mo",
        rating: 4.8,
        recommended: true,
        icon: <GitBranch className="w-8 h-8" />
      },
      {
        name: "GitLab",
        description: "Complete DevOps platform",
        pros: ["Built-in CI/CD", "Issue tracking", "Self-hosted option"],
        cons: ["Can be overwhelming", "Slower than GitHub"],
        price: "Free + $19/user/mo",
        rating: 4.5,
        recommended: false,
        icon: <Users className="w-8 h-8" />
      }
    ]
  };

  const categories = [
    { id: "backend", name: "Backend & Database", icon: <Database className="w-5 h-5" /> },
    { id: "hosting", name: "Hosting Platform", icon: <Globe className="w-5 h-5" /> },
    { id: "repository", name: "Code Repository", icon: <GitBranch className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-electric-blue to-electric-purple rounded-full flex items-center justify-center glow-effect animate-float">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tech <span className="gradient-text">Advisor</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get AI-powered recommendations for your tech stack, hosting, and development tools
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex justify-center mb-8 animate-slide-up">
            <div className="glass-card p-1 rounded-lg">
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-primary" : "hover:bg-white/10"}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recommendations[selectedCategory as keyof typeof recommendations].map((rec, index) => (
              <Card
                key={rec.name}
                className={`glass-card transition-all duration-300 animate-fade-in ${
                  rec.recommended 
                    ? "glow-effect ring-2 ring-primary scale-105" 
                    : "hover:glow-effect hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {rec.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-electric-blue to-electric-purple text-white px-4 py-1">
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center text-primary">
                      {rec.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{rec.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{rec.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{rec.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-400">Pros</h4>
                      <ul className="space-y-1">
                        {rec.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-yellow-400">Considerations</h4>
                      <ul className="space-y-1">
                        {rec.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-start space-x-2">
                            <Clock className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{rec.price}</span>
                        </div>
                        <Button 
                          size="sm"
                          variant={rec.recommended ? "default" : "outline"}
                          className={rec.recommended 
                            ? "bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90" 
                            : "glass-card hover:bg-white/10"
                          }
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary & Next Steps */}
          <Card className="glass-card glow-effect animate-slide-up">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Your Recommended Stack</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Database className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Backend</h4>
                  <p className="text-sm text-muted-foreground">Supabase</p>
                </div>
                <div className="text-center">
                  <Globe className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Hosting</h4>
                  <p className="text-sm text-muted-foreground">Vercel</p>
                </div>
                <div className="text-center">
                  <GitBranch className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Repository</h4>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                This stack provides the best balance of developer experience, scalability, and cost-effectiveness for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/start">
                  <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3">
                    Start Building
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="glass-card hover:bg-white/10">
                  Save Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechAdvisor;
