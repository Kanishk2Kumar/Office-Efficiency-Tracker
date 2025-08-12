'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table'; // Ensure this component supports columns/data

type NotificationTask = {
    taskId: string;
    taskTitle: string;
    taskType: string;
    progress: number;
    estimatedTime: string;
    dueDate: string;
    startDate: string;
    status: string;
    priority: string;
    timeSpent: string;
    department: string;
    description: string;
};

const notificationTasks: NotificationTask[] = [
    {
        taskId: "TASK-101",
        taskTitle: "Fix login bug",
        taskType: "Bug",
        progress: 80,
        estimatedTime: "5h",
        dueDate: "2025-08-10",
        startDate: "2025-08-01",
        status: "In Progress",
        priority: "High",
        timeSpent: "4h",
        department: "Frontend Team",
        description: "Resolve user login issue affecting mobile users."
    },
    {
        taskId: "TASK-102",
        taskTitle: "Design new dashboard",
        taskType: "Feature",
        progress: 50,
        estimatedTime: "12h",
        dueDate: "2025-08-12",
        startDate: "2025-08-03",
        status: "In Progress",
        priority: "Medium",
        timeSpent: "6h",
        department: "UI/UX",
        description: "Create a responsive admin dashboard with charts."
    },
    {
        taskId: "TASK-103",
        taskTitle: "Database optimization",
        taskType: "Maintenance",
        progress: 100,
        estimatedTime: "8h",
        dueDate: "2025-08-05",
        startDate: "2025-07-30",
        status: "Completed",
        priority: "Low",
        timeSpent: "7.5h",
        department: "Backend Team",
        description: "Optimize SQL queries for performance improvements."
    }
];

export default function NotificationPage() {
    const [selectedTask, setSelectedTask] = useState<NotificationTask | null>(null);

    const columns: ColumnDef<NotificationTask>[] = [
        {
            accessorKey: 'taskId',
            header: 'Task ID',
        },
        {
            accessorKey: 'startDate',
            header: 'Start Date',
        },
        {
            accessorKey: 'dueDate',
            header: 'Due Date',
        },
        {
            accessorKey: 'priority',
            header: 'Priority',
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.priority}</Badge>
            ),
        },
        {
            accessorKey: 'department',
            header: 'Department',
        },
        {
            id: 'viewDetails',
            header: 'Details',
            cell: ({ row }) => (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" onClick={() => setSelectedTask(row.original)}>
                            View Details
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedTask?.taskTitle}</DialogTitle>
                            <DialogDescription>
                                <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    <p><strong>Task ID:</strong> {selectedTask?.taskId}</p>
                                    <p><strong>Task Type:</strong> {selectedTask?.taskType}</p>
                                    <p><strong>Status:</strong> {selectedTask?.status}</p>
                                    <p><strong>Progress:</strong> {selectedTask?.progress}%</p>
                                    <p><strong>Estimated Time:</strong> {selectedTask?.estimatedTime}</p>
                                    <p><strong>Time Spent:</strong> {selectedTask?.timeSpent}</p>
                                    <p><strong>Start Date:</strong> {selectedTask?.startDate}</p>
                                    <p><strong>Due Date:</strong> {selectedTask?.dueDate}</p>
                                    <p><strong>Priority:</strong> {selectedTask?.priority}</p>
                                    <p><strong>Department:</strong> {selectedTask?.department}</p>
                                    <p><strong>Description:</strong> {selectedTask?.description}</p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ),
        },
    ];

    return (
        <div className="p-10">
            <h1 className="text-2xl font-semibold mb-6 text-primary">Notifications</h1>
            <DataTable columns={columns} data={notificationTasks} />
        </div>
    );
}
