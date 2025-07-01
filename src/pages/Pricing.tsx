import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import { 
  CheckCircle, 
  Sparkles, 
  Zap, 
  Crown, 
  Star,
  ArrowRight
} from "lucide-react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for indie hackers and solo founders getting started",
      icon: <Sparkles className="w-8 h-8" />,
      price: { monthly: 5, yearly: 50 },
      features: [
        "3 AI-generated projects per month",
        "Basic prompt optimization",
        "Standard code generation",
        "Email support",
        "Basic templates library",
        "Deploy to Vercel/Netlify"
      ],
      limitations: [
        "Limited to 3 projects/month",
        "Basic AI models only",
        "Standard support"
      ],
      badge: null,
      buttonText: "Start Building",
      popular: false
    },
    {
      name: "Builder Pro",
      description: "Advanced features for serious builders and small teams",
      icon: <Zap className="w-8 h-8" />,
      price: { monthly: 15, yearly: 150 },
      features: [
        "15 AI-generated projects per month",
        "Advanced prompt optimization",
        "Premium code generation",
        "Priority email support",
        "Advanced templates library",
        "Custom components library",
        "Team collaboration (up to 3 members)",
        "Code export to GitHub",
        "Performance optimization",
        "Advanced debugging tools"
      ],
      limitations: [
        "Limited to 15 projects/month",
        "Team size limited to 3"
      ],
      badge: "Most Popular",
      buttonText: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Founder Suite",
      description: "Everything you need to scale from MVP to unicorn",
      icon: <Crown className="w-8 h-8" />,
      price: { monthly: 29, yearly: 290 },
      features: [
        "Unlimited AI-generated projects",
        "Premium prompt optimization with A/B testing",
        "Enterprise-grade code generation",
        "24/7 priority support + live chat",
        "Custom templates and components",
        "Unlimited team members",
        "Advanced team management",
        "White-label solutions",
        "Custom integrations API",
        "Advanced analytics and insights",
        "Custom deployment pipelines",
        "SLA guarantees",
        "Dedicated account manager"
      ],
      limitations: [],
      badge: "Best Value",
      buttonText: "Go Enterprise",
      popular: false
    }
  ];

  const features = [
    {
      category: "AI & Generation",
      items: [
        { name: "Project Generation", starter: "3/month", pro: "15/month", enterprise: "Unlimited" },
        { name: "Prompt Optimization", starter: "Basic", pro: "Advanced", enterprise: "Premium + A/B" },
        { name: "Code Quality", starter: "Standard", pro: "Premium", enterprise: "Enterprise" },
        { name: "AI Models", starter: "Basic", pro: "Advanced", enterprise: "Latest + Custom" }
      ]
    },
    {
      category: "Collaboration & Teams",
      items: [
        { name: "Team Members", starter: "1", pro: "3", enterprise: "Unlimited" },
        { name: "Project Sharing", starter: "❌", pro: "✅", enterprise: "✅" },
        { name: "Team Management", starter: "❌", pro: "Basic", enterprise: "Advanced" },
        { name: "Access Controls", starter: "❌", pro: "❌", enterprise: "✅" }
      ]
    },
    {
      category: "Support & Services",
      items: [
        { name: "Support Channel", starter: "Email", pro: "Priority Email", enterprise: "24/7 + Live Chat" },
        { name: "Response Time", starter: "48 hours", pro: "24 hours", enterprise: "< 4 hours" },
        { name: "Account Manager", starter: "❌", pro: "❌", enterprise: "✅" },
        { name: "SLA", starter: "❌", pro: "❌", enterprise: "99.9%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your journey from indie hacker to unicorn founder
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge className="bg-gradient-to-r from-electric-blue to-electric-purple text-white">
                Save 17%
              </Badge>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`glass-card transition-all duration-300 relative animate-fade-in ${
                  plan.popular 
                    ? "glow-effect ring-2 ring-primary scale-105" 
                    : "hover:glow-effect hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-electric-blue to-electric-purple text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-xl flex items-center justify-center text-primary">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold gradient-text">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {isYearly && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Save ${(plan.price.monthly * 12) - plan.price.yearly}/year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full py-3 ${
                      plan.popular
                        ? "bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect"
                        : "glass-card hover:bg-white/10"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-center mb-8">
              Detailed <span className="gradient-text">Comparison</span>
            </h2>
            
            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left font-semibold">Features</th>
                      <th className="p-4 text-center font-semibold">Starter</th>
                      <th className="p-4 text-center font-semibold">Builder Pro</th>
                      <th className="p-4 text-center font-semibold">Founder Suite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((category, categoryIndex) => (
                      <React.Fragment key={categoryIndex}>
                        <tr className="bg-white/5">
                          <td colSpan={4} className="p-4 font-semibold text-primary">
                            {category.category}
                          </td>
                        </tr>
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="border-b border-white/5">
                            <td className="p-4 text-muted-foreground">{item.name}</td>
                            <td className="p-4 text-center text-sm">{item.starter}</td>
                            <td className="p-4 text-center text-sm">{item.pro}</td>
                            <td className="p-4 text-center text-sm">{item.enterprise}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "What happens to my projects if I downgrade?", 
                  answer: "Your existing projects remain accessible. Only new project creation is limited based on your plan."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee on all plans. No questions asked."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass-card text-left">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="glass-card glow-effect animate-slide-up">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Your Dreams?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of founders who are already building the next generation of web applications with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/start">
                  <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:opacity-90 glow-effect px-8 py-3">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="glass-card hover:bg-white/10">
                  Talk to Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
