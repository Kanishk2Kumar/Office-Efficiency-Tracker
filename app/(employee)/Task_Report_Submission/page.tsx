'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table'; // Make sure this exists and supports columns/data

type Task = {
  id: number;
  header: string;
  status: string;
  limit: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    header: 'Submit React Assignment',
    status: 'Pending',
    limit: '2025-08-10',
  },
  {
    id: 2,
    header: 'Write Blog on AI Trends',
    status: 'Submitted',
    limit: '2025-08-12',
  },
  {
    id: 3,
    header: 'Fix bugs in CTF challenge',
    status: 'Pending',
    limit: '2025-08-15',
  },
];

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSubmit = (id: number) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: 'Submitted' } : task
    );
    setTasks(updated);
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'header',
      header: 'Task Name',
    },
    {
      accessorKey: 'limit',
      header: 'Due Date',
    },
    {
      id: 'submit',
      header: 'Submit Task',
      cell: ({ row }) => {
        const task = row.original;

        return task.status === 'Submitted' ? (
          <Badge className='bg-green-600 h-8 w-20' variant="default">Submitted</Badge>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-red-600 h-8' onClick={() => setSelectedTask(task)}>Submit</Button>
            </DialogTrigger>
            <DialogContent> 
              <DialogHeader>
                <DialogTitle>Submit Task</DialogTitle>
                <DialogDescription>
                  Upload file for <strong>{selectedTask?.header}</strong>
                </DialogDescription>
              </DialogHeader>
              <Input type="file" className="mb-4" />
              <Button onClick={() => handleSubmit(task.id)}>Confirm</Button>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  return (
    <div className="">
      
      <h1 className="text-2xl mx-10 my-4 font-semibold text-primary"> Task Dashboard</h1>
      <div className='px-10'>
        <DataTable columns={columns} data={tasks} />
        </div>
    </div>
  );
}
