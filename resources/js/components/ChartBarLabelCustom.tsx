"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent are not found in your codebase, so these imports are commented out.
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

export const description = "A bar chart with a custom label"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} // satisfies ChartConfig

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
}

export function ChartBarLabelCustom({ 
  chartData, 
  title = "Bar Chart - Custom Label",
  description = "January - June 2024",
  footerTrend,
  footerDescription = "Showing total visitors for the last 6 months"
}: ChartBarLabelCustomProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 120, right: 80, top: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.length > 25 ? value.slice(0, 25) + '...' : value}
                width={110}
                fontSize={12}
              />
              <XAxis 
                dataKey="desktop" 
                type="number" 
                axisLine={false}
                tickLine={false}
                fontSize={11}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} FTE`, 'Full-Time Equivalent']}
                labelFormatter={(label: string) => `${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar
                dataKey="desktop"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                maxBarSize={35}
              >
                <LabelList
                  dataKey="desktop"
                  position="right"
                  offset={8}
                  className="fill-gray-700"
                  fontSize={11}
                  fontWeight={500}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {footerTrend && (
          <div className="flex gap-2 leading-none font-medium">
            {footerTrend.text} 
            {footerTrend.percentage && ` ${footerTrend.percentage}`}
            {footerTrend.isUp === false ? (
              <TrendingDown className="h-4 w-4" />
            ) : (
              <TrendingUp className="h-4 w-4" />
            )}
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  )
}
