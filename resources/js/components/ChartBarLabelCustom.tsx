"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ChartBarLabelCustomProps = {
  chartData: Array<{ month: string; desktop: number; mobile?: number }>
  title?: string
  description?: string
  footerTrend?: {
    text: string
    percentage?: string
    isUp?: boolean
  }
  footerDescription?: string
  ongoingCount?: number
}

export function ChartBarLabelCustom({
  chartData,
  title = "Team Productivity Index",
  description = "Performance overview | Jan - Jun 2024",
  footerTrend,
  footerDescription = "Data synchronized in real-time",
  ongoingCount,
}: ChartBarLabelCustomProps) {
  return (
    <Card className="bg-[#0f172a] border border-[#1e293b] shadow-xl rounded-2xl overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white tracking-wide">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              {description}
            </CardDescription>
            {ongoingCount !== undefined && (
              <div className="mt-2 text-xs text-gray-400">
                <span className="text-[#38bdf8] font-semibold text-sm">{ongoingCount}</span> ongoing projects
              </div>
            )}
          </div>
          <div className="px-3 py-1 text-xs font-medium text-[#38bdf8] bg-[#1e293b] rounded-md">
            Live Data
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 100, right: 40, top: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                horizontal
                vertical={false}
              />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={({ x, y, payload }) => {
                  const fullLabel = payload.value
                  const isTruncated = fullLabel.length > 18
                  const label = isTruncated
                    ? fullLabel.slice(0, 18) + "..."
                    : fullLabel

                  return (
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize={12}
                      fontFamily="Inter, sans-serif"
                    >
                      <tspan>
                        <title>{isTruncated ? fullLabel : ""}</title>
                        {label}
                      </tspan>
                    </text>
                  )
                }}
              />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} pts`, "Score"]}
                labelFormatter={(label: string) => label}
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
              <Bar
                dataKey="desktop"
                fill="url(#colorTech)"
                radius={[0, 8, 8, 0]}
                maxBarSize={28}
              >
                <defs>
                  <linearGradient id="colorTech" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <LabelList
                  dataKey="desktop"
                  position="right"
                  offset={10}
                  className="fill-[#e2e8f0]"
                  fontSize={12}
                  fontWeight={600}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-[#1e293b] pt-4 text-sm text-gray-400">
        {footerTrend ? (
          <div className="flex items-center gap-2">
            {footerTrend.isUp ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className="font-medium text-gray-300">
              {footerTrend.text}
              {footerTrend.percentage && (
                <span className="ml-1 text-gray-500">
                  {footerTrend.percentage}
                </span>
              )}
            </span>
          </div>
        ) : (
          <div />
        )}
        <p className="text-xs text-gray-500">{footerDescription}</p>
      </CardFooter>
    </Card>
  )
}
