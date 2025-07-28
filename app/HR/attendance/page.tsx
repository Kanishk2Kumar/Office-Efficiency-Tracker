import { DataTable } from "@/components/HR-Dashboard/data-table";
import data from "../data.json";

const attendance = () => {
  return (
    <div>
      <div className="text-2xl mx-6 my-4 font-semibold text-primary">Attendance of Employees</div>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default attendance;
