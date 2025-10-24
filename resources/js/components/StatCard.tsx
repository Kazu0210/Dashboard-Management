import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend }) => (
  <div className="rounded-lg border bg-primary p-4 shadow-sm flex flex-col gap-2 text-primary-foreground">
    <div className="flex items-center gap-2 opacity-80">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className={`text-sm ${trend === "up" ? "text-green-200" : "text-red-200"}`}>{change}</div>
  </div>
);
