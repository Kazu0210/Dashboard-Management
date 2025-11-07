"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const description = "An interactive bar chart showing ongoing project expenses"

type ChartDataItem = {
  project_name: string;
  total_supplies_equipment: number;
  bid_price: number;
  project_id?: number;
  status?: string;
}

type ChartType = "total_supplies_equipment" | "bid_price"

interface ChartBarInteractiveProps {
  data?: ChartDataItem[];
  title?: string;
  description?: string;
}

const chartConfig = {
  total_supplies_equipment: {
    label: "Supplies & Equipment",
    color: "#ef4444",
  },
  bid_price: {
    label: "Bid Price", 
    color: "#10b981",
  },
}

export function ChartBarInteractive({ 
  data = [], 
  title = "Ongoing Projects - Supplies & Equipment", 
  description = "Equipment costs vs bid prices for ongoing projects only" 
}: ChartBarInteractiveProps) {
  // Filter for ongoing projects with supplies & equipment costs > 0
  const ongoingProjects = React.useMemo(() => {
    return data.filter(project => 
      project.status && 
      project.status.toLowerCase().includes('ongoing') &&
      project.total_supplies_equipment > 0
    );
  }, [data]);

  return (
    <Card className="bg-[#0f172a] border border-[#1e293b] shadow-xl rounded-lg lg:rounded-2xl overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2 border-b border-[#1e293b] p-3 sm:p-6">
        <div>
          <CardTitle className="text-white text-sm sm:text-lg">{title}</CardTitle>
          <CardDescription className="text-gray-400 text-xs sm:text-sm">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 flex-1">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ongoingProjects}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="project_name"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  // Truncate long project names for better display
                  return value.length > 15 ? value.substring(0, 15) + '...' : value;
                }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  // Format large numbers with K/M suffixes
                  if (value >= 1000000) {
                    return `₱${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `₱${(value / 1000).toFixed(1)}K`;
                  }
                  return `₱${value}`;
                }}
              />
              <Tooltip
                formatter={(value: number) => [`₱${value.toLocaleString()}`, "Supplies & Equipment"]}
                labelFormatter={(label: string) => `Project: ${label}`}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  color: "#f8fafc",
                  boxShadow: "0 4px 16px rgba(56,189,248,0.2)",
                }}
                labelStyle={{ color: "#38bdf8" }}
                itemStyle={{ color: "#f1f5f9" }}
              />
              <Bar dataKey="total_supplies_equipment" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}