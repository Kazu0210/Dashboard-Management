import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar, 
  Target, 
  Users, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  Building2,
  FileText,
  Star,
  Award
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import { router, Head } from '@inertiajs/react';

const Dashboard2 = () => {
  const { auth } = usePage().props;
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto page rotation every 30 seconds
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      const currentPath = window.location.pathname;
      if (currentPath === '/') {
        router.visit('/page2');
      } else if (currentPath === '/page2') {
        router.visit('/');
      }
      setLastUpdated(new Date());
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(rotationInterval);
  }, []);

  // Mock data for analytics dashboard
  const monthlyRevenue = [
    { month: 'Jan', amount: 4200000, growth: 12 },
    { month: 'Feb', amount: 3800000, growth: -9 },
    { month: 'Mar', amount: 5100000, growth: 34 },
    { month: 'Apr', amount: 4900000, growth: -4 },
    { month: 'May', amount: 5600000, growth: 14 },
    { month: 'Jun', amount: 6200000, growth: 11 }
  ];

  const topProjects = [
    { name: 'SM City Mall Cleaning', progress: 85, budget: 2500000, spent: 2125000, status: 'On Track' },
    { name: 'Ayala Tower Maintenance', progress: 92, budget: 1800000, spent: 1656000, status: 'Ahead' },
    { name: 'BPO Office Complex', progress: 67, budget: 3200000, spent: 2400000, status: 'At Risk' },
    { name: 'Hospital Sanitation', progress: 78, budget: 1500000, spent: 1170000, status: 'On Track' }
  ];

  const employeeMetrics = [
    { metric: 'Productivity Score', value: 87, change: 5, trend: 'up' },
    { metric: 'Attendance Rate', value: 94, change: 2, trend: 'up' },
    { metric: 'Client Satisfaction', value: 4.6, change: 0.3, trend: 'up' },
    { metric: 'Turnover Rate', value: 8, change: -3, trend: 'down' }
  ];

  const recentActivities = [
    { action: 'New contract signed', client: 'Vista Mall', amount: 850000, time: '2 hours ago', type: 'contract' },
    { action: 'Payroll processed', employees: 245, amount: 2100000, time: '4 hours ago', type: 'payroll' },
    { action: 'Supplies delivered', project: 'SM City Mall', amount: 45000, time: '6 hours ago', type: 'supplies' },
    { action: 'Project milestone reached', project: 'Ayala Tower', completion: 90, time: '1 day ago', type: 'milestone' }
  ];

  return (
    <div className="h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-10 overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-lg text-gray-600 mt-1">Performance insights and business intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
            </Button>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Growth
                </span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  +14.2%
                </Badge>
              </CardTitle>
              <CardDescription className="text-emerald-100">Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₱6.2M</div>
              <p className="text-emerald-100 text-sm mt-1">+₱850K from last month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Active Projects
                </span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  12
                </Badge>
              </CardTitle>
              <CardDescription className="text-blue-100">Currently managed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">78%</div>
              <p className="text-blue-100 text-sm mt-1">Average completion rate</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Efficiency Score
                </span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  +5%
                </Badge>
              </CardTitle>
              <CardDescription className="text-purple-100">Operational efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">87%</div>
              <p className="text-purple-100 text-sm mt-1">Above industry average</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  On-Time Delivery
                </span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  94%
                </Badge>
              </CardTitle>
              <CardDescription className="text-orange-100">Project deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">11/12</div>
              <p className="text-orange-100 text-sm mt-1">Projects delivered on time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Trend Chart */}
          <Card className="lg:col-span-2 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                Revenue Trend Analysis
              </CardTitle>
              <CardDescription>Monthly revenue performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{month.month} 2024</div>
                        <div className="text-sm text-gray-600">₱{(month.amount / 1000000).toFixed(1)}M</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {month.growth > 0 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`font-semibold ${month.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {month.growth > 0 ? '+' : ''}{month.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest business operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs
                      ${activity.type === 'contract' ? 'bg-blue-500' : 
                        activity.type === 'payroll' ? 'bg-green-500' : 
                        activity.type === 'supplies' ? 'bg-orange-500' : 'bg-purple-500'}`}>
                      {activity.type === 'contract' ? <FileText className="h-4 w-4" /> :
                       activity.type === 'payroll' ? <DollarSign className="h-4 w-4" /> :
                       activity.type === 'supplies' ? <Building2 className="h-4 w-4" /> :
                       <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {activity.client && `Client: ${activity.client}`}
                        {activity.employees && `${activity.employees} employees`}
                        {activity.project && `Project: ${activity.project}`}
                        {activity.completion && `${activity.completion}% complete`}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Performance & Employee Metrics */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Projects Performance */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-indigo-600" />
                Top Projects Performance
              </CardTitle>
              <CardDescription>Current project status and budget utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topProjects.map((project, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{project.name}</div>
                        <div className="text-sm text-gray-600">
                          ₱{(project.spent / 1000000).toFixed(2)}M / ₱{(project.budget / 1000000).toFixed(2)}M
                        </div>
                      </div>
                      <Badge 
                        variant={project.status === 'Ahead' ? 'default' : 
                               project.status === 'On Track' ? 'secondary' : 'destructive'}
                        className={project.status === 'Ahead' ? 'bg-emerald-100 text-emerald-800' :
                                 project.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                                 'bg-red-100 text-red-800'}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Employee Performance Metrics */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-600" />
                Employee Performance Metrics
              </CardTitle>
              <CardDescription>Key workforce performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {employeeMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{metric.metric}</div>
                      <div className="text-2xl font-bold mt-1">
                        {metric.metric === 'Client Satisfaction' ? `${metric.value}/5` : 
                         metric.metric === 'Turnover Rate' ? `${metric.value}%` : `${metric.value}%`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {metric.trend === 'up' ? (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-semibold">+{metric.change}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <TrendingDown className="h-4 w-4" />
                          <span className="font-semibold">{metric.change}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Notifications */}
        <Card className="shadow-lg border-0 border-l-4 border-l-amber-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Alerts & Action Items
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  Budget Overrun Alert
                </div>
                <p className="text-sm text-red-700">BPO Office Complex project is 25% over budget. Immediate review required.</p>
                <Button size="sm" variant="outline" className="mt-3 border-red-300 text-red-700 hover:bg-red-100">
                  Review Budget
                </Button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
                  <Clock className="h-4 w-4" />
                  Contract Renewal Due
                </div>
                <p className="text-sm text-yellow-700">3 client contracts expire within the next 30 days. Schedule renewal meetings.</p>
                <Button size="sm" variant="outline" className="mt-3 border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                  View Contracts
                </Button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                  <Star className="h-4 w-4" />
                  Performance Recognition
                </div>
                <p className="text-sm text-blue-700">Maintenance team exceeded KPIs for 3 consecutive months. Consider recognition program.</p>
                <Button size="sm" variant="outline" className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default Dashboard2;
