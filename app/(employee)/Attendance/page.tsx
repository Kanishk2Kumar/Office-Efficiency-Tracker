import React from 'react'
import { TableDemo } from '../../../components/Emp-Dashboard/emp-table'
import { AttendanceChart } from '../../../components/Emp-Dashboard/attendance-chart'

const page = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Attendance
      </h1>
      <div className="bg-white p-10 rounded-lg shadow-md  mx-auto">
        <TableDemo />
      </div>
      <div className="bg-white p-10 rounded-lg shadow-md  mx-auto">
        <AttendanceChart totalPresent={40} totalAbsent={60} selectedMonth={'january'}/>
      </div>
    </div>
  )
}

export default page