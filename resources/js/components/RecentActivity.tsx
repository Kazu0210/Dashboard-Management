import React from "react";

export const RecentActivity: React.FC = () => (
  <div className="rounded-lg border bg-card p-4 shadow-sm h-full">
    <h3 className="font-semibold mb-2">Recent Activity</h3>
    <ul className="text-sm text-muted-foreground space-y-1">
      <li>User John Doe signed up</li>
      <li>Order #1234 placed</li>
      <li>Revenue updated</li>
      <li>Growth increased</li>
    </ul>
  </div>
);
