
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Copy, Trash, FileText } from "lucide-react";

type SimulationStatus = "completed" | "running" | "draft";

interface Simulation {
  id: string;
  name: string;
  date: string;
  status: SimulationStatus;
  objective: string;
  keyMetric: string;
  summary: string;
  client: string;
}

const recentSimulations: Simulation[] = [
  {
    id: "sim1",
    name: "Velari ReNature Launch",
    date: "2025-05-12",
    status: "completed",
    objective: "Increase Sales",
    keyMetric: "Conversion Rate",
    summary: "Predicted 15% lift in conversion",
    client: "Velari Threads"
  },
  {
    id: "sim2",
    name: "Spring Collection Email Campaign",
    date: "2025-05-10",
    status: "running",
    objective: "Brand Awareness",
    keyMetric: "Engagement Rate",
    summary: "Simulation in progress",
    client: "Velari Threads"
  },
  {
    id: "sim3",
    name: "Earth Day Social Media Push",
    date: "2025-05-05",
    status: "completed",
    objective: "Audience Growth",
    keyMetric: "Follower Acquisition",
    summary: "Predicted 22% increase in followers",
    client: "EcoStyle"
  },
  {
    id: "sim4",
    name: "Post-Purchase Journey Optimization",
    date: "2025-05-01",
    status: "completed",
    objective: "Customer Retention",
    keyMetric: "Repeat Purchase Rate",
    summary: "Predicted 8% increase in retention",
    client: "NatureCo"
  },
  {
    id: "sim5",
    name: "Summer Campaign Draft",
    date: "2025-04-28",
    status: "draft",
    objective: "Sales Growth",
    keyMetric: "Revenue",
    summary: "Draft ready for configuration",
    client: "Velari Threads"
  }
];

const getStatusColor = (status: SimulationStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "running":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleNewSimulation = () => {
    navigate("/new-simulation");
  };
  
  const handleViewResults = (simulationId: string) => {
    navigate(`/results/${simulationId}`);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Maya Patel</h1>
          <p className="text-muted-foreground">
            Track your simulations and create new ones to optimize your marketing campaigns.
          </p>
        </div>
        <Button onClick={handleNewSimulation} size="lg" className="gap-2">
          <Play className="h-4 w-4" />
          Start New Simulation
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Simulations</CardTitle>
          <CardDescription>
            View and manage your recent intent loop simulations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSimulations.map((simulation) => (
              <div 
                key={simulation.id} 
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{simulation.name}</h3>
                    <Badge className={getStatusColor(simulation.status)}>
                      {simulation.status.charAt(0).toUpperCase() + simulation.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {simulation.client} • {simulation.objective} • {new Date(simulation.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium">
                    {simulation.keyMetric}: {simulation.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleViewResults(simulation.id)}
                    disabled={simulation.status === "draft" || simulation.status === "running"}
                  >
                    <FileText className="h-4 w-4" />
                    View Results
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Load More</Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Help & Tutorials</CardTitle>
            <CardDescription>Resources to help you get the most out of the Intent Loop Simulator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <a href="#" className="text-primary hover:underline">Video Tutorial: Creating Your First Simulation</a>
            </p>
            <p className="text-sm">
              <a href="#" className="text-primary hover:underline">Guide: Understanding Simulation Results</a>
            </p>
            <p className="text-sm">
              <a href="#" className="text-primary hover:underline">Best Practices: Audience Selection</a>
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Resources</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent actions and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Yesterday:</span> Simulation "Velari ReNature Launch" completed
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">2 days ago:</span> Started simulation "Spring Collection Email Campaign"
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">3 days ago:</span> Created new audience segment "Dormant Email Subscribers"
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Activities</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your simulation performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-muted-foreground">Total Simulations</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-muted-foreground">Avg. Predicted Lift</span>
              <span className="font-medium">12.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Best Performing Channel</span>
              <span className="font-medium">Email</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Analytics</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
