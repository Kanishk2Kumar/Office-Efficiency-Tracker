"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const attendanceData = [
  { date: "2025-07-01", status: "Present", month: "July" },
  { date: "2025-07-02", status: "Present", month: "July" },
  { date: "2025-07-03", status: "Absent", month: "July" },
  { date: "2025-07-04", status: "Present", month: "July" },
  { date: "2025-07-05", status: "Present", month: "July" },
  { date: "2025-07-06", status: "Absent", month: "July" },
  { date: "2025-07-07", status: "Present", month: "July" },
  { date: "2025-07-08", status: "Present", month: "July" },
  { date: "2025-07-09", status: "Present", month: "July" },
  { date: "2025-07-10", status: "Present", month: "July" },
  { date: "2025-08-01", status: "Present", month: "August" },
  { date: "2025-08-02", status: "Present", month: "August" },
  { date: "2025-08-03", status: "Absent", month: "August" },
  { date: "2025-08-04", status: "Present", month: "August" },
  { date: "2025-08-05", status: "Present", month: "August" },
  { date: "2025-08-06", status: "Absent", month: "August" },
  { date: "2025-08-07", status: "Present", month: "August" },
  { date: "2025-08-08", status: "Present", month: "August" },
  { date: "2025-08-09", status: "Present", month: "August" },
  { date: "2025-08-10", status: "Present", month: "August" },
  { date: "2025-09-01", status: "Present", month: "September" },
  { date: "2025-09-02", status: "Present", month: "September" },
  { date: "2025-09-03", status: "Absent", month: "September" },
  { date: "2025-09-04", status: "Present", month: "September" },
  { date: "2025-09-05", status: "Present", month: "September" },
  { date: "2025-09-06", status: "Absent", month: "September" },
  { date: "2025-09-07", status: "Present", month: "September" },
  { date: "2025-09-08", status: "Present", month: "September" },
  { date: "2025-09-09", status: "Present", month: "September" },
  { date: "2025-09-10", status: "Present", month: "September" },
];

export function TableDemo() {
  const [selectedMonth, setSelectedMonth] = useState("July");

  const filteredAttendance = attendanceData.filter(
    (entry) => entry.month === selectedMonth
  );

  const totalPresent = filteredAttendance.filter(
    (entry) => entry.status === "Present"
  ).length;
  const totalAbsent = filteredAttendance.filter(
    (entry) => entry.status === "Absent"
  ).length;

  const months = [...new Set(attendanceData.map((item) => item.month))];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <label htmlFor="month-select" className="text-sm font-medium">
          Select Month:
        </label>
        <Select onValueChange={setSelectedMonth} defaultValue={selectedMonth}>
          <SelectTrigger id="month-select" className="w-[180px]">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>
          Attendance for the month of {selectedMonth}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="text-right">Attendance Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAttendance.map((entry) => (
            <TableRow key={entry.date}>
              <TableCell className="font-medium">{entry.date}</TableCell>
              <TableCell className="text-right">{entry.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>Total Present</TableCell>
            <TableCell className="text-right font-bold">{totalPresent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Total Absent</TableCell>
            <TableCell className="text-right font-bold">{totalAbsent}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}