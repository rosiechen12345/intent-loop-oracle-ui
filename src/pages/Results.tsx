
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, FileText, Share2 } from "lucide-react";

interface SimulationResult {
  id: string;
  name: string;
  client: string;
  date: string;
  overview: {
    bestJourney: string;
    predictedLift: number;
    keyInsights: string[];
    recommendations: string[];
  };
  journeyData: {
    name: string;
    conversionRate: number;
    aov: number;
    engagement: number;
    dropOffRate: number;
  }[];
  audienceData: {
    segment: string;
    engagement: number;
    conversion: number;
    ltv: number;
    insights: string[];
  }[];
  channelData: {
    channel: string;
    reach: number;
    engagement: number;
    conversion: number;
    cost: number;
  }[];
  creativeData: {
    variant: string;
    ctr: number;
    conversion: number;
    engagement: number;
  }[];
}

const SAMPLE_RESULT: SimulationResult = {
  id: "sim1",
  name: "Velari ReNature Launch",
  client: "Velari Threads",
  date: "2025-05-12",
  overview: {
    bestJourney: "Gen Z Journey",
    predictedLift: 15,
    keyInsights: [
      "Gen Z responds strongly to influencer content over other channels",
      "Email performs better than SMS for dormant subscribers",
      "Creative variant 'Wear the Change' outperforms 'Refined, Recycled, Ready' by 8%"
    ],
    recommendations: [
      "Shift budget from SMS to email for dormant subscribers",
      "Increase influencer marketing budget for Gen Z audience",
      "Focus on emotional messaging over premium positioning",
      "Consider implementing social proof elements for high-value customers"
    ]
  },
  journeyData: [
    { name: "Gen Z Journey", conversionRate: 4.8, aov: 65, engagement: 12.5, dropOffRate: 68 },
    { name: "High-Value Journey", conversionRate: 3.2, aov: 120, engagement: 8.2, dropOffRate: 72 },
    { name: "Reactivation Journey", conversionRate: 1.5, aov: 45, engagement: 5.5, dropOffRate: 85 }
  ],
  audienceData: [
    { 
      segment: "Gen Z Sustainability Seekers", 
      engagement: 12.5, 
      conversion: 4.8, 
      ltv: 285, 
      insights: [
        "High engagement with influencer content", 
        "Low email response", 
        "Strong preference for video content"
      ] 
    },
    { 
      segment: "Past High-Value Customers", 
      engagement: 8.2, 
      conversion: 3.2, 
      ltv: 650, 
      insights: [
        "Positive response to social proof", 
        "Increased AOV", 
        "Preference for premium messaging"
      ] 
    },
    { 
      segment: "Dormant Email Subscribers", 
      engagement: 5.5, 
      conversion: 1.5, 
      ltv: 180, 
      insights: [
        "High spam rate for SMS", 
        "Good email reactivation", 
        "Respond to discount offers"
      ] 
    },
  ],
  channelData: [
    { channel: "Email", reach: 85, engagement: 25, conversion: 3.5, cost: 0.2 },
    { channel: "Influencer", reach: 65, engagement: 42, conversion: 5.8, cost: 1.2 },
    { channel: "Social", reach: 75, engagement: 38, conversion: 4.2, cost: 0.8 },
    { channel: "Display", reach: 90, engagement: 12, conversion: 1.2, cost: 0.5 },
    { channel: "CTV", reach: 50, engagement: 22, conversion: 2.8, cost: 2.5 },
    { channel: "SMS", reach: 60, engagement: 15, conversion: 1.5, cost: 0.3 }
  ],
  creativeData: [
    { variant: "Wear the Change", ctr: 3.8, conversion: 4.5, engagement: 12.5 },
    { variant: "Refined, Recycled, Ready", ctr: 2.5, conversion: 2.8, engagement: 8.2 }
  ]
};

// Sample funnel data for visualization
const funnelData = [
  { name: "Impressions", value: 100000 },
  { name: "Clicks", value: 25000 },
  { name: "Product Views", value: 15000 },
  { name: "Add to Cart", value: 5000 },
  { name: "Purchases", value: 2000 }
];

// Colors for charts
const COLORS = [
  "#0056B8", // Epsilon Blue
  "#7B2682", // Epsilon Purple
  "#00A6A0", // Epsilon Teal
  "#FF6A13", // Epsilon Orange
  "#58585A"  // Epsilon Gray
];

const Results = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const [simulation, setSimulation] = useState<SimulationResult>(SAMPLE_RESULT);
  
  // In a real app, we'd fetch the simulation results based on the ID
  // For now, we're just using sample data
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{simulation.name}</h1>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
          </div>
          <p className="text-muted-foreground">
            {simulation.client} • Completed on {new Date(simulation.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="journey">Journey Analysis</TabsTrigger>
          <TabsTrigger value="audience">Audience Analysis</TabsTrigger>
          <TabsTrigger value="channel">Channel Analysis</TabsTrigger>
          <TabsTrigger value="creative">Creative Analysis</TabsTrigger>
        </TabsList>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Overall Performance</CardTitle>
                <CardDescription>
                  Key metrics and insights from the simulation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-epsilon-lightgray p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Best Performing Journey</div>
                    <div className="text-2xl font-semibold">{simulation.overview.bestJourney}</div>
                  </div>
                  <div className="bg-epsilon-lightgray p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Predicted Lift</div>
                    <div className="text-2xl font-semibold">{simulation.overview.predictedLift}%</div>
                  </div>
                  <div className="bg-epsilon-lightgray p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Best Channel</div>
                    <div className="text-2xl font-semibold">Influencer</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Journey Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.journeyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conversionRate" name="Conversion Rate (%)" fill={COLORS[0]} />
                      <Bar dataKey="engagement" name="Engagement (%)" fill={COLORS[2]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  Important findings from the simulation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {simulation.overview.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-2 text-sm">
                    {simulation.overview.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-epsilon-orange mt-1.5" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Actionable Outputs</CardTitle>
              <CardDescription>
                Optimal strategy recommendations based on simulation results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Predicted Outcomes by Journey</h4>
                  <ul className="space-y-3">
                    {simulation.journeyData.map((journey, index) => (
                      <li key={index} className="bg-epsilon-lightgray p-3 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{journey.name}</span>
                          <span className="text-sm">{journey.conversionRate}% conversion</span>
                        </div>
                        <Progress value={journey.conversionRate * 10} className="h-2" />
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Optimal Channel Mix</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={simulation.channelData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="engagement"
                          nameKey="channel"
                          label
                        >
                          {simulation.channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {simulation.channelData.map((channel, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span>{channel.channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Budget Allocation Recommendations</h4>
                  <ul className="space-y-3">
                    {simulation.channelData.map((channel, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span>{channel.channel}</span>
                        </div>
                        <span className="font-medium">{Math.round((channel.engagement / simulation.channelData.reduce((sum, c) => sum + c.engagement, 0)) * 100)}%</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Button className="w-full">Apply Recommendations</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Journey Analysis Tab */}
        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Journey Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison of journey performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Conversion Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.journeyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conversionRate" name="Conversion Rate (%)" fill={COLORS[0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Average Order Value</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.journeyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="aov" name="AOV ($)" fill={COLORS[1]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Customer Funnel Visualization</h3>
                <div className="bg-epsilon-lightgray p-6 rounded-lg">
                  <div className="flex justify-between items-end">
                    {funnelData.map((stage, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-1">{stage.name}</div>
                        <div 
                          className="bg-primary rounded-t-md"
                          style={{ 
                            width: `${70 / funnelData.length}px`,
                            height: `${(stage.value / funnelData[0].value) * 200}px`
                          }}
                        />
                        <div className="text-xs font-medium mt-1">{((stage.value / funnelData[0].value) * 100).toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Drop-off Analysis</h3>
                <div className="space-y-4">
                  {simulation.journeyData.map((journey, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{journey.name}</span>
                        <Badge className={
                          journey.dropOffRate > 80 ? "bg-red-100 text-red-800" : 
                          journey.dropOffRate > 70 ? "bg-yellow-100 text-yellow-800" : 
                          "bg-green-100 text-green-800"
                        }>
                          {journey.dropOffRate}% Drop-off
                        </Badge>
                      </div>
                      <Progress value={100 - journey.dropOffRate} className="h-2 mb-2" />
                      <div className="text-sm text-muted-foreground mt-2">
                        Primary drop-off point: {
                          index === 0 ? "Between Display and Conversion" :
                          index === 1 ? "Between CTV and Conversion" :
                          "Between Email Open and Click"
                        }
                      </div>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">View Detailed Flow</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Audience Analysis Tab */}
        <TabsContent value="audience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segment Performance</CardTitle>
              <CardDescription>
                How different audiences respond to different journeys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Engagement & Conversion</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.audienceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" tickFormatter={(value) => value.split(' ')[0]} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="engagement" name="Engagement (%)" fill={COLORS[2]} />
                      <Bar dataKey="conversion" name="Conversion (%)" fill={COLORS[0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Lifetime Value</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.audienceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" tickFormatter={(value) => value.split(' ')[0]} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ltv" name="Lifetime Value ($)" fill={COLORS[1]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Segment Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {simulation.audienceData.map((audience, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{audience.segment}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Engagement:</span>
                            <span>{audience.engagement}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Conversion:</span>
                            <span>{audience.conversion}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">LTV:</span>
                            <span>${audience.ltv}</span>
                          </div>
                        </div>
                        <div className="pt-3 border-t">
                          <h4 className="text-sm font-medium mb-2">Key Insights:</h4>
                          <ul className="text-xs space-y-1">
                            {audience.insights.map((insight, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Channel Analysis Tab */}
        <TabsContent value="channel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Effectiveness</CardTitle>
              <CardDescription>
                Performance of each channel across different journeys and audiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium mb-4">Engagement by Channel</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.channelData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="engagement" name="Engagement (%)" fill={COLORS[2]} />
                      <Bar dataKey="conversion" name="Conversion (%)" fill={COLORS[0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Cost Efficiency</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={simulation.channelData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="cost" name="Cost ($)" stroke={COLORS[3]} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Channel Performance Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Channel</th>
                        <th className="text-center py-3 px-4">Reach (%)</th>
                        <th className="text-center py-3 px-4">Engagement (%)</th>
                        <th className="text-center py-3 px-4">Conversion (%)</th>
                        <th className="text-center py-3 px-4">Cost ($)</th>
                        <th className="text-center py-3 px-4">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {simulation.channelData.map((channel, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{channel.channel}</td>
                          <td className="text-center py-3 px-4">{channel.reach}</td>
                          <td className="text-center py-3 px-4">{channel.engagement}</td>
                          <td className="text-center py-3 px-4">{channel.conversion}</td>
                          <td className="text-center py-3 px-4">{channel.cost}</td>
                          <td className="text-center py-3 px-4">
                            {((channel.conversion / channel.cost) * 10).toFixed(1)}x
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Channel Optimization Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">+</div>
                      <div>
                        <h4 className="font-medium">Increase Budget: Influencer</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Highest engagement and conversion rates, especially for Gen Z audience
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">+</div>
                      <div>
                        <h4 className="font-medium">Increase Budget: Email</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Good performance for dormant subscribers, high ROI
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-red-50">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">-</div>
                      <div>
                        <h4 className="font-medium">Decrease Budget: SMS</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Low engagement and high spam rate, poor ROI
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm">!</div>
                      <div>
                        <h4 className="font-medium">Optimize: CTV</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Good performance but high cost, target more precisely to high-value customers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Creative Analysis Tab */}
        <TabsContent value="creative" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creative Performance</CardTitle>
              <CardDescription>
                Comparison of different creative variants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">A/B Testing Results</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.creativeData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="variant" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ctr" name="Click-Through Rate (%)" fill={COLORS[0]} />
                      <Bar dataKey="conversion" name="Conversion Rate (%)" fill={COLORS[2]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Engagement by Variant</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={simulation.creativeData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="variant" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="engagement" name="Engagement Rate (%)" fill={COLORS[1]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Creative Variants Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {simulation.creativeData.map((variant, index) => (
                    <Card key={index} className={index === 0 ? "border-primary" : ""}>
                      <CardHeader className={index === 0 ? "bg-primary/5" : ""}>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{variant.variant}</CardTitle>
                          {index === 0 && (
                            <Badge className="bg-primary">Winner</Badge>
                          )}
                        </div>
                        <CardDescription>
                          {index === 0 ? "Bold, Emotional" : "Clean, Premium"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">CTR:</span>
                            <span className="font-medium">{variant.ctr}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Conversion:</span>
                            <span className="font-medium">{variant.conversion}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Engagement:</span>
                            <span className="font-medium">{variant.engagement}%</span>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Key Findings:</h4>
                          <ul className="text-sm space-y-2">
                            {index === 0 ? (
                              <>
                                <li className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                  <span>Resonated strongly with Gen Z audience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                  <span>Emotional appeal drove higher engagement</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                  <span>Strong call-to-action performance</span>
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                  <span>Appealed to high-value customers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                  <span>Clean aesthetic but less engaging</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                  <span>Higher AOV but lower conversion</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Creative Optimization Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-epsilon-lightgray rounded-lg">
                    <h4 className="font-medium mb-2">Primary Recommendation</h4>
                    <p className="text-sm">
                      Focus on emotional messaging over premium positioning across all segments.
                      The "Wear the Change" creative consistently outperformed across key metrics.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Audience-Specific Approach</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Gen Z: Use bold, emotional messaging with strong sustainability focus</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                          <span>High-Value: Blend emotional appeal with premium quality messaging</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Creative Elements to Incorporate</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Personal impact statements ("Your choice makes a difference")</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                          <span>Clear, bold calls-to-action with sustainability focus</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
