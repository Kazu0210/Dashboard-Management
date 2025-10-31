import { RecentActivity } from "@/components/RecentActivity";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building, DollarSign, Users, Package, Wrench, CreditCard, Receipt, Clock, CheckCircle, TrendingUp, BarChart } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { usePage } from "@inertiajs/react";

const Dashboard = () => {
  const { projectCount, ongoingCount, completedCount } = usePage().props;
  return (
    <AppLayout>
    {/* <AppLayout breadcrumbs={breadcrumbs}> */}
      <div className="space-y-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div>
          <h2 className="text-3xl font-bold text-black">Overview</h2>
          <p className="text-lg text-black mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-none shadow-xl rounded-2xl bg-white/80 backdrop-blur-lg">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500 opacity-20 rounded-full z-0" />
            <CardHeader className="relative z-10 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 rounded-full p-3 shadow-lg flex items-center justify-center">
                  <Building className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">Projects Overview</CardTitle>
                  <CardDescription className="text-xs text-gray-500">Summary of all projects</CardDescription>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div className="text-sm text-gray-700">Total Projects: <span className="font-bold text-blue-700">{String(projectCount)}</span></div>
                <div className="text-sm text-gray-700">Ongoing: <span className="font-bold text-blue-700">{String(ongoingCount)}</span></div>
                <div className="text-sm text-gray-700">Completed: <span className="font-bold text-blue-700">{String(completedCount)}</span></div>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Total Contract Value
              </CardTitle>
              <CardDescription className="text-white/80">Combined value of all service agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱65,400,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Total Employees Deployed
              </CardTitle>
              <CardDescription className="text-white/80">Active janitors, messengers, and maintenance staff</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">380</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-red-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Total Payroll (This Month)
              </CardTitle>
              <CardDescription className="text-white/80">Payroll disbursed for current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱3,250,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Total Supplies Issued
              </CardTitle>
              <CardDescription className="text-white/80">Value of consumables released to projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱450,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-500 to-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Delivered Tools & Equipment
              </CardTitle>
              <CardDescription className="text-white/80">Total cost of issued tools/equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱1,200,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Accounts Receivable
              </CardTitle>
              <CardDescription className="text-white/80">Total amount due from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱5,000,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-500 to-pink-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Accounts Payable
              </CardTitle>
              <CardDescription className="text-white/80">Total company liabilities/payables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱1,800,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Pending Billing
              </CardTitle>
              <CardDescription className="text-white/80">Unbilled services for the current cycle</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱2,500,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-lime-500 to-lime-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Total Actual Collected
              </CardTitle>
              <CardDescription className="text-white/80">Total amount collected from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱59,000,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-teal-500 to-teal-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Gross Income
              </CardTitle>
              <CardDescription className="text-white/80">Income minus direct costs (payroll & supplies)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱12,000,000</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Net Income
              </CardTitle>
              <CardDescription className="text-white/80">Gross Income minus admin & operating expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">₱8,000,000</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
