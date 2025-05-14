
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Palette,
  Route,
  CheckCircle2
} from "lucide-react";

// Type definitions for our form data
interface SimulationFormData {
  campaignDetails: {
    name: string;
    client: string;
    objective: string;
    description: string;
  };
  audience: {
    segments: Array<{
      id: string;
      name: string;
      size: number;
      type: "predefined" | "custom";
    }>;
  };
  creative: {
    variants: Array<{
      id: string;
      name: string;
      approach: string;
      description: string;
    }>;
  };
  journey: {
    paths: Array<{
      id: string;
      name: string;
      targetAudience: string;
      channels: string[];
    }>;
  };
}

const INITIAL_FORM_DATA: SimulationFormData = {
  campaignDetails: {
    name: "",
    client: "",
    objective: "",
    description: ""
  },
  audience: {
    segments: [
      { id: "seg1", name: "Past High-Value Customers", size: 25000, type: "predefined" },
      { id: "seg2", name: "Gen Z Sustainability Seekers", size: 50000, type: "predefined" },
      { id: "seg3", name: "Dormant Email Subscribers (Earth Day Engaged)", size: 15000, type: "custom" }
    ]
  },
  creative: {
    variants: [
      { id: "var1", name: "Wear the Change", approach: "Bold, Emotional", description: "Focuses on emotional connection to sustainability and personal impact." },
      { id: "var2", name: "Refined, Recycled, Ready", approach: "Clean, Premium", description: "Emphasizes premium quality and refined aesthetic of sustainable products." }
    ]
  },
  journey: {
    paths: [
      { 
        id: "jour1", 
        name: "Gen Z Journey", 
        targetAudience: "Gen Z Sustainability Seekers",
        channels: ["Influencer (Instagram Reels)", "Social (TikTok)", "Display"] 
      },
      { 
        id: "jour2", 
        name: "High-Value Journey", 
        targetAudience: "Past High-Value Customers",
        channels: ["Social Proof", "Email", "CTV"] 
      },
      { 
        id: "jour3", 
        name: "Reactivation Journey", 
        targetAudience: "Dormant Email Subscribers",
        channels: ["Email"] 
      }
    ]
  }
};

const clients = [
  "Velari Threads",
  "EcoStyle",
  "NatureCo",
  "Sustainable Lifestyle",
  "Green Fashion"
];

const objectives = [
  "Increase Sales",
  "Brand Awareness",
  "Audience Growth",
  "Customer Retention",
  "Lead Generation"
];

const predefinedSegments = [
  { id: "pseg1", name: "Past High-Value Customers", size: 25000 },
  { id: "pseg2", name: "Gen Z Sustainability Seekers", size: 50000 },
  { id: "pseg3", name: "Millennial Fashion Enthusiasts", size: 75000 },
  { id: "pseg4", name: "Eco-Conscious Shoppers", size: 60000 },
  { id: "pseg5", name: "First-Time Website Visitors", size: 30000 }
];

const channels = [
  "Email", 
  "Social (Facebook)", 
  "Social (Instagram)", 
  "Social (TikTok)", 
  "Display", 
  "CTV", 
  "SMS", 
  "Influencer (Instagram)", 
  "Influencer (TikTok)", 
  "Social Proof"
];

const NewSimulation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("campaign-details");
  const [formData, setFormData] = useState<SimulationFormData>(INITIAL_FORM_DATA);
  
  const handleCampaignDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      campaignDetails: {
        ...formData.campaignDetails,
        [name]: value
      }
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      campaignDetails: {
        ...formData.campaignDetails,
        [name]: value
      }
    });
  };

  const nextTab = (current: string) => {
    const tabs = ["campaign-details", "audience", "creative", "journey", "review"];
    const currentIndex = tabs.indexOf(current);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const prevTab = (current: string) => {
    const tabs = ["campaign-details", "audience", "creative", "journey", "review"];
    const currentIndex = tabs.indexOf(current);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleRunSimulation = () => {
    // In a real app, this would submit the form data to start the simulation
    console.log("Running simulation with data:", formData);
    navigate("/results/new");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Simulation</h1>
        <p className="text-muted-foreground">
          Set up your campaign parameters to run an intent loop simulation
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="campaign-details" className="flex items-center gap-2">
            <span className="hidden md:inline">Campaign Details</span>
            <span className="md:hidden">Campaign</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <span className="hidden md:inline">Audience</span>
            <span className="md:hidden">Audience</span>
          </TabsTrigger>
          <TabsTrigger value="creative" className="flex items-center gap-2">
            <span className="hidden md:inline">Creative</span>
            <span className="md:hidden">Creative</span>
          </TabsTrigger>
          <TabsTrigger value="journey" className="flex items-center gap-2">
            <span className="hidden md:inline">Journey</span>
            <span className="md:hidden">Journey</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <span className="hidden md:inline">Review & Run</span>
            <span className="md:hidden">Review</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Campaign Details Tab */}
        <TabsContent value="campaign-details" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Velari ReNature Launch"
                    value={formData.campaignDetails.name}
                    onChange={handleCampaignDetailsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select 
                    value={formData.campaignDetails.client} 
                    onValueChange={(value) => handleSelectChange("client", value)}
                  >
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective">Objective</Label>
                <Select 
                  value={formData.campaignDetails.objective} 
                  onValueChange={(value) => handleSelectChange("objective", value)}
                >
                  <SelectTrigger id="objective">
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives.map((objective) => (
                      <SelectItem key={objective} value={objective}>
                        {objective}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter campaign details..."
                  rows={4}
                  value={formData.campaignDetails.description}
                  onChange={handleCampaignDetailsChange}
                />
              </div>
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => nextTab("campaign-details")} 
              className="gap-2"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Selected Audience Segments</h3>
                <p className="text-sm text-muted-foreground">
                  Configure the audience segments for your simulation
                </p>
              </div>
              
              <div className="space-y-4">
                {formData.audience.segments.map((segment) => (
                  <div 
                    key={segment.id} 
                    className="flex justify-between items-center p-4 border rounded-lg bg-card"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{segment.name}</h4>
                        <span className="text-xs bg-epsilon-lightgray text-epsilon-gray px-2 py-0.5 rounded">
                          {segment.type === "predefined" ? "Predefined" : "Custom"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Size: {segment.size.toLocaleString()} profiles
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                ))}
                
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <div className="space-y-2">
                    <Users className="h-8 w-8 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">Add Audience Segment</h3>
                    <p className="text-sm text-muted-foreground">
                      Select from predefined Epsilon CORE ID segments or create a custom segment
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline">Select Segment</Button>
                      <Button variant="outline">Create Custom</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => prevTab("audience")} 
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Step
            </Button>
            <Button 
              onClick={() => nextTab("audience")} 
              className="gap-2"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Creative Tab */}
        <TabsContent value="creative" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Creative Variants</h3>
                <p className="text-sm text-muted-foreground">
                  Define different messaging approaches to compare effectiveness
                </p>
              </div>
              
              <div className="space-y-4">
                {formData.creative.variants.map((variant) => (
                  <div 
                    key={variant.id} 
                    className="p-4 border rounded-lg bg-card"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{variant.name}</h4>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <p className="text-sm">Approach: {variant.approach}</p>
                      <p className="text-sm text-muted-foreground">{variant.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <div className="space-y-2">
                    <Palette className="h-8 w-8 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">Add Creative Variant</h3>
                    <p className="text-sm text-muted-foreground">
                      Define a new creative approach to test in the simulation
                    </p>
                    <Button variant="outline">Add Variant</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => prevTab("creative")} 
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Step
            </Button>
            <Button 
              onClick={() => nextTab("creative")} 
              className="gap-2"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Journey Tab */}
        <TabsContent value="journey" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Customer Journeys</h3>
                <p className="text-sm text-muted-foreground">
                  Design omnichannel customer journeys for different audience segments
                </p>
              </div>
              
              <div className="space-y-4">
                {formData.journey.paths.map((journey) => (
                  <div 
                    key={journey.id} 
                    className="p-4 border rounded-lg bg-card"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{journey.name}</h4>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <p className="text-sm">Target: {journey.targetAudience}</p>
                      <div className="flex flex-wrap gap-2">
                        {journey.channels.map((channel, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-epsilon-lightgray text-epsilon-gray px-2 py-1 rounded"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-2">
                          {journey.channels.map((channel, index) => (
                            <React.Fragment key={channel}>
                              <span className="text-xs px-2 py-1 bg-primary text-white rounded">
                                {channel.split(" ")[0]}
                              </span>
                              {index < journey.channels.length - 1 && (
                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <div className="space-y-2">
                    <Route className="h-8 w-8 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">Add Customer Journey</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a new journey path with channels and touchpoints
                    </p>
                    <Button variant="outline">Add Journey</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => prevTab("journey")} 
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Step
            </Button>
            <Button 
              onClick={() => nextTab("journey")} 
              className="gap-2"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Review & Run Tab */}
        <TabsContent value="review" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Simulation Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Review your simulation setup before running
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Campaign Details
                  </h4>
                  <div className="bg-epsilon-lightgray rounded-lg p-4">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <dt className="text-sm text-muted-foreground">Campaign Name:</dt>
                        <dd>{formData.campaignDetails.name || "Velari ReNature Launch"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Client:</dt>
                        <dd>{formData.campaignDetails.client || "Velari Threads"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Objective:</dt>
                        <dd>{formData.campaignDetails.objective || "Increase Sales"}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Audience Segments
                  </h4>
                  <div className="bg-epsilon-lightgray rounded-lg p-4">
                    <ul className="space-y-2">
                      {formData.audience.segments.map((segment) => (
                        <li key={segment.id} className="flex justify-between">
                          <span>{segment.name}</span>
                          <span className="text-sm text-muted-foreground">{segment.size.toLocaleString()} profiles</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Creative Variants
                  </h4>
                  <div className="bg-epsilon-lightgray rounded-lg p-4">
                    <ul className="space-y-2">
                      {formData.creative.variants.map((variant) => (
                        <li key={variant.id} className="flex justify-between">
                          <span>{variant.name}</span>
                          <span className="text-sm text-muted-foreground">{variant.approach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Customer Journeys
                  </h4>
                  <div className="bg-epsilon-lightgray rounded-lg p-4">
                    <ul className="space-y-3">
                      {formData.journey.paths.map((journey) => (
                        <li key={journey.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span>{journey.name}</span>
                            <span className="text-sm text-muted-foreground">{journey.targetAudience}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            {journey.channels.map((channel, index) => (
                              <React.Fragment key={channel}>
                                <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                                  {channel.split(" ")[0]}
                                </span>
                                {index < journey.channels.length - 1 && (
                                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h4 className="font-medium">Ready to Run Simulation?</h4>
                <p className="text-sm text-muted-foreground">
                  Estimated completion time: 15-20 minutes
                </p>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => prevTab("review")} 
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Step
            </Button>
            <Button 
              onClick={handleRunSimulation} 
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Run Simulation
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewSimulation;
