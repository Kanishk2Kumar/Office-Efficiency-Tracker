"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Bar, BarChart, LabelList, YAxis } from "recharts";

export const descriptionPieChart = "A simple gender distribution pie chart";

const PiechartData = [
  { gender: "Male", count: 320, fill: "#9F5DE2" }, // Purple shade 1
  { gender: "Female", count: 280, fill: "#ef4444" }, // Purple shade 2
];

const PiechartConfig = {
  count: {
    label: "Count",
  },
  Male: {
    label: "Male",
    color: "#9F5DE2",
  },
  Female: {
    label: "Female",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const BarchartData = [
  { department: "Sales", count: 75 },
  { department: "HR", count: 45 },
  { department: "Marketing", count: 60 },
  { department: "Finance", count: 35 },
  { department: "Support", count: 70 },
];

const BarchartConfig = {
  count: {
    label: "Personnel",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export const description = "An interactive area chart";

const chartData = [
  { date: "2025-04-01", employeeCount: 222 },
  { date: "2025-04-02", employeeCount: 97 },
  { date: "2025-04-03", employeeCount: 167 },
  { date: "2025-04-04", employeeCount: 242 },
  { date: "2025-04-05", employeeCount: 373 },
  { date: "2025-04-06", employeeCount: 301 },
  { date: "2025-04-07", employeeCount: 245 },
  { date: "2025-04-08", employeeCount: 409 },
  { date: "2025-04-09", employeeCount: 59 },
  { date: "2025-04-10", employeeCount: 261 },
  { date: "2025-04-11", employeeCount: 327 },
  { date: "2025-04-12", employeeCount: 292 },
  { date: "2025-04-13", employeeCount: 342 },
  { date: "2025-04-14", employeeCount: 137 },
  { date: "2025-04-15", employeeCount: 120 },
  { date: "2025-04-16", employeeCount: 138 },
  { date: "2025-04-17", employeeCount: 446 },
  { date: "2025-04-18", employeeCount: 364 },
  { date: "2025-04-19", employeeCount: 243 },
  { date: "2025-04-20", employeeCount: 89 },
  { date: "2025-04-21", employeeCount: 137 },
  { date: "2025-04-22", employeeCount: 224 },
  { date: "2025-04-23", employeeCount: 138 },
  { date: "2025-04-24", employeeCount: 387 },
  { date: "2025-04-25", employeeCount: 215 },
  { date: "2025-04-26", employeeCount: 75 },
  { date: "2025-04-27", employeeCount: 383 },
  { date: "2025-04-28", employeeCount: 122 },
  { date: "2025-04-29", employeeCount: 315 },
  { date: "2025-04-30", employeeCount: 454 },
  { date: "2025-05-01", employeeCount: 165 },
  { date: "2025-05-02", employeeCount: 293 },
  { date: "2025-05-03", employeeCount: 247 },
  { date: "2025-05-04", employeeCount: 385 },
  { date: "2025-05-05", employeeCount: 481 },
  { date: "2025-05-06", employeeCount: 498 },
  { date: "2025-05-07", employeeCount: 388 },
  { date: "2025-05-08", employeeCount: 149 },
  { date: "2025-05-09", employeeCount: 227 },
  { date: "2025-05-10", employeeCount: 293 },
  { date: "2025-05-11", employeeCount: 335 },
  { date: "2025-05-12", employeeCount: 197 },
  { date: "2025-05-13", employeeCount: 197 },
  { date: "2025-05-14", employeeCount: 448 },
  { date: "2025-05-15", employeeCount: 473 },
  { date: "2025-05-16", employeeCount: 338 },
  { date: "2025-05-17", employeeCount: 499 },
  { date: "2025-05-18", employeeCount: 315 },
  { date: "2025-05-19", employeeCount: 235 },
  { date: "2025-05-20", employeeCount: 177 },
  { date: "2025-05-21", employeeCount: 82 },
  { date: "2025-05-22", employeeCount: 81 },
  { date: "2025-05-23", employeeCount: 252 },
  { date: "2025-05-24", employeeCount: 294 },
  { date: "2025-05-25", employeeCount: 201 },
  { date: "2025-05-26", employeeCount: 213 },
  { date: "2025-05-27", employeeCount: 420 },
  { date: "2025-05-28", employeeCount: 233 },
  { date: "2025-05-29", employeeCount: 78 },
  { date: "2025-05-30", employeeCount: 340 },
  { date: "2025-05-31", employeeCount: 178 },
  { date: "2025-06-01", employeeCount: 178 },
  { date: "2025-06-02", employeeCount: 470 },
  { date: "2025-06-03", employeeCount: 103 },
  { date: "2025-06-04", employeeCount: 439 },
  { date: "2025-06-05", employeeCount: 88 },
  { date: "2025-06-06", employeeCount: 294 },
  { date: "2025-06-07", employeeCount: 323 },
  { date: "2025-06-08", employeeCount: 385 },
  { date: "2025-06-09", employeeCount: 438 },
  { date: "2025-06-10", employeeCount: 155 },
  { date: "2025-06-11", employeeCount: 92 },
  { date: "2025-06-12", employeeCount: 492 },
  { date: "2025-06-13", employeeCount: 81 },
  { date: "2025-06-14", employeeCount: 426 },
  { date: "2025-06-15", employeeCount: 307 },
  { date: "2025-06-16", employeeCount: 371 },
  { date: "2025-06-17", employeeCount: 475 },
  { date: "2025-06-18", employeeCount: 107 },
  { date: "2025-06-19", employeeCount: 341 },
  { date: "2025-06-20", employeeCount: 408 },
  { date: "2025-06-21", employeeCount: 169 },
  { date: "2025-06-22", employeeCount: 317 },
  { date: "2025-06-23", employeeCount: 480 },
  { date: "2025-06-24", employeeCount: 132 },
  { date: "2025-06-25", employeeCount: 141 },
  { date: "2025-06-26", employeeCount: 434 },
  { date: "2025-06-27", employeeCount: 448 },
  { date: "2025-06-28", employeeCount: 149 },
  { date: "2025-06-29", employeeCount: 103 },
  { date: "2025-06-30", employeeCount: 446 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  employeeCount: {
    label: "employeeCount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-3">
        <Card className="pt-0">
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1">
              <CardTitle>Employee Count</CardTitle>
              <CardDescription>
                Employee Count Over Past Few Days for the last 3 months
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient
                    id="fillemployeeCount"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-employeeCount)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-employeeCount)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="employeeCount"
                  type="linear"
                  fill="url(#fillemployeeCount)"
                  stroke="var(--color-employeeCount)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Gender Ratio</CardTitle>
            <CardDescription>
              Male and Female Employees Percentage
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={PiechartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={PiechartData} dataKey="count" nameKey="gender" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Personnel</CardTitle>
            <CardDescription>Organization Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={BarchartConfig} className="h-[250px] w-[710px] ml-4">
              <BarChart
                accessibilityLayer
                data={BarchartData}
                layout="vertical"
                margin={{ right: 16 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="department"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="var(--chart-2)"
                  radius={4}
                >
                  <LabelList
                    dataKey="department"
                    position="insideLeft"
                    offset={8}
                    className="fill-(--color-label)"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="count"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
