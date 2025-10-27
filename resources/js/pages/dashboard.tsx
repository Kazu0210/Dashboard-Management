


import { RecentActivity } from "@/components/RecentActivity";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import AppLayout from '@/layouts/app-layout';

// const breadcrumbs = [
//   { title: "Home", href: "/" },
//   { title: "Dashboard", href: "/dashboard" },
// ];

const Dashboard = () => {
  return (
    <AppLayout>
    {/* <AppLayout breadcrumbs={breadcrumbs}> */}
      <div className="space-y-6 p-4 bg-background min-h-screen">
        <div>
          <h2 className="text-3xl font-bold text-black">Overview</h2>
          <p className="text-lg text-black mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Projects</CardTitle>
              <CardDescription>Total active and completed manpower contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">17</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Contract Value</CardTitle>
              <CardDescription>Combined value of all service agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱65,400,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Employees Deployed</CardTitle>
              <CardDescription>Active janitors, messengers, and maintenance staff</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">380</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Payroll (This Month)</CardTitle>
              <CardDescription>Payroll disbursed for current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱3,250,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Supplies Issued</CardTitle>
              <CardDescription>Value of consumables released to projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱450,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivered Tools & Equipment</CardTitle>
              <CardDescription>Total cost of issued tools/equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱1,200,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accounts Receivable</CardTitle>
              <CardDescription>Total amount due from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱5,000,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accounts Payable</CardTitle>
              <CardDescription>Total company liabilities/payables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱1,800,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Billing</CardTitle>
              <CardDescription>Unbilled services for the current cycle</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱2,500,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Actual Collected</CardTitle>
              <CardDescription>Total amount collected from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱59,000,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gross Income</CardTitle>
              <CardDescription>Income minus direct costs (payroll & supplies)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱12,000,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Net Income</CardTitle>
              <CardDescription>Gross Income minus admin & operating expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-black">₱8,000,000</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
