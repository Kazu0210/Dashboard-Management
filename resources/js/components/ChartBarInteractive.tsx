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

export const description = "An interactive bar chart"

type ChartDataItem = {
  date: string;
  desktop: number;
  mobile: number;
}

type ChartType = "desktop" | "mobile"

interface ChartBarInteractiveProps {
  data?: ChartDataItem[];
  title?: string;
  description?: string;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3b82f6",
  },
  mobile: {
    label: "Mobile", 
    color: "#10b981",
  },
}

export function ChartBarInteractive({ 
  data = [], 
  title = "Bar Chart - Interactive", 
  description = "Showing total visitors for the last 3 months" 
}: ChartBarInteractiveProps) {
  const [activeChart, setActiveChart] = React.useState<ChartType>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: data.reduce((acc: number, curr: ChartDataItem) => acc + curr.desktop, 0),
      mobile: data.reduce((acc: number, curr: ChartDataItem) => acc + curr.mobile, 0),
    }),
    [data]
  )

  return (
    <Card className="bg-[#0f172a] border border-[#1e293b] shadow-xl rounded-lg lg:rounded-2xl overflow-hidden h-full flex flex-col">
      <CardHeader className="flex flex-col items-stretch border-b border-[#1e293b] !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </div>
        <div className="flex">
          {(["desktop", "mobile"] as ChartType[]).map((key) => {
            return (
              <button
                key={key}
                data-active={activeChart === key}
                className="data-[active=true]:bg-[#1e293b]/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-[#1e293b] px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 hover:bg-[#1e293b]/30 transition-colors"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-gray-400 text-xs">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl text-white">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 flex-1">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), chartConfig[activeChart].label]}
                labelFormatter={(value: string) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
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
              <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}