"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface AttendanceChartProps {
  totalPresent: number;
  totalAbsent: number;
  selectedMonth: string;
}

export function AttendanceChart({ totalPresent, totalAbsent, selectedMonth }: AttendanceChartProps) {
  const chartData = [
 { status: "present", count: totalPresent, fill: "#6b21a8" },
    { status: "absent", count: totalAbsent, fill: "#c084fc" },
  ]
  
  const totalDays = totalPresent + totalAbsent;
  const presentPercentage = totalDays > 0 ? ((totalPresent / totalDays) * 100).toFixed(1) : 0;
  const absentPercentage = totalDays > 0 ? ((totalAbsent / totalDays) * 100).toFixed(1) : 0;
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Attendance</CardTitle>
        <CardDescription>
          Attendance summary for {selectedMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              label={({ payload, ...props }) => {
                const percentage =
                  (payload.count / (totalPresent + totalAbsent)) * 100;
                return (
                  <text
                    {...props}
                    className="fill-foreground text-xs"
                    y={props.cy - (props.outerRadius / 2)}
                    textAnchor="middle"
                  >
                    {`${payload.status.charAt(0).toUpperCase() + payload.status.slice(1)}: ${percentage.toFixed(1)}%`}
                  </text>
                );
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Days: {totalDays}
        </div>
        <div className="text-muted-foreground leading-none">
          Present: {presentPercentage}% | Absent: {absentPercentage}%
        </div>
      </CardFooter>
    </Card>
  )
}