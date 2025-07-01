
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { 
  Plus, 
  Eye, 
  Code, 
  Calendar, 
  TrendingUp,
  Zap,
  Users,
  Star,
  Clock,
  ArrowRight,
  Settings,
  Download
} from "lucide-react";

const Dashboard = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "AI Task Manager",
      description: "Intelligent task management with team collaboration",
      status: "deployed",
      progress: 100,
      lastUpdated: "2 hours ago",
      techStack: ["React", "Supabase", "TypeScript"],
      url: "https://ai-tasks.vercel.app"
    },
    {
      id: 2,
      name: "Recipe Social Platform",
      description: "Social network for food enthusiasts and recipe sharing",
      status: "building",
      progress: 65,
      lastUpdated: "1 day ago",
      techStack: ["Next.js", "Firebase", "Tailwind"],
      url: null
    },
    {
      id: 3,
      name: "Crypto Portfolio Tracker",
      description: "Real-time cryptocurrency portfolio management",
      status: "draft",
      progress: 25,
      lastUpdated: "3 days ago",
      techStack: ["React", "Node.js", "MongoDB"],
      url: null
    }
  ]);

  const stats = [
    { label: "Total Projects", value: "12", icon: <Code className="w-5 h-5" />, change: "+2 this month" },
    { label: "Active Builds", value: "3", icon: <Zap className="w-5 h-5" />, change: "2 in progress" },
    { label: "Deployed Apps", value: "8", icon: <TrendingUp className="w-5 h-5" />, change: "+1 this week" },
    { label: "Team Members", value: "5", icon: <Users className="w-5 h-5" />, change: "2 pending invites" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed": return "bg-green-400/20 text-green-400";
      case "building": return "bg-blue-400/20 text-blue-400";
      case "draft": return "bg-yellow-400/20 text-yellow-400";
      default: return "bg-gray-400/20 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "deployed": return "Live";
      case "building": return "Building";
      case "draft": return "Draft";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">Builder</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your AI-generated projects and track your building progress
              </p>
            </div>
            <Link to="/start">
              <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect">
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card hover:glow-effect transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="glass-card glow-effect animate-slide-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Projects</CardTitle>
                    <Button variant="ghost" size="sm" className="hover:bg-white/10">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div key={project.id} className="glass-card p-4 hover:bg-white/5 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{project.name}</h3>
                              <Badge className={getStatusColor(project.status)}>
                                {getStatusText(project.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{project.lastUpdated}</span>
                              </div>
                              <div className="flex space-x-1">
                                {project.techStack.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {project.status === "deployed" && project.url && (
                              <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="hover:bg-white/10">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {project.status === "building" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Build Progress</span>
                              <span className="font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/start">
                    <Button className="w-full bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </Link>
                  <Link to="/tech-advisor">
                    <Button variant="outline" className="w-full glass-card hover:bg-white/10">
                      <Zap className="w-4 h-4 mr-2" />
                      Tech Advisor
                    </Button>
                  </Link>
                  <Link to="/feedback">
                    <Button variant="outline" className="w-full glass-card hover:bg-white/10">
                      <Eye className="w-4 h-4 mr-2" />
                      Smart Feedback
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Builds Used</span>
                        <span className="text-sm font-medium">7/15</span>
                      </div>
                      <Progress value={47} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">AI Optimizations</span>
                        <span className="text-sm font-medium">23/50</span>
                      </div>
                      <Progress value={46} className="h-2" />
                    </div>
                    <Link to="/pricing">
                      <Button variant="outline" size="sm" className="w-full glass-card hover:bg-white/10 mt-4">
                        Upgrade Plan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: "Deployed", project: "AI Task Manager", time: "2h ago" },
                      { action: "Build started", project: "Recipe Platform", time: "1d ago" },
                      { action: "Prompt optimized", project: "Crypto Tracker", time: "2d ago" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 glass-card rounded">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span> {activity.project}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Templates Section */}
          <Card className="glass-card glow-effect animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Popular Templates</CardTitle>
                  <p className="text-sm text-muted-foreground">Get started faster with pre-built templates</p>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-white/10">
                  View All Templates
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "SaaS Dashboard", description: "Complete admin panel with analytics", rating: 4.8 },
                  { name: "E-commerce Store", description: "Full-featured online store with payments", rating: 4.9 },
                  { name: "Social Media App", description: "Social platform with feeds and messaging", rating: 4.7 }
                ].map((template, index) => (
                  <Card key={index} className="glass-card hover:glow-effect transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{template.rating}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="hover:bg-white/10">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
