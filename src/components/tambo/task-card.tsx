"use client";

import { withInteractable } from "@tambo-ai/react";
import { cn } from "@/lib/utils";
import { taskCardSchema, Task } from "@/lib/tambo/schemas";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card-data"; // Reuse existing card patterns or styles
import { Badge } from "lucide-react"; // Generic icons for now or standard UI kit

interface TaskCardProps {
  task: Task;
  showDescription?: boolean;
  isEditable?: boolean;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const statusColors = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  review: "bg-purple-100 text-purple-700",
  done: "bg-green-100 text-green-700",
};

export const TaskCardBase = ({ task, showDescription = true, isEditable = true }: TaskCardProps) => {
  return (
    <div className={cn(
      "p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow",
      "flex flex-col gap-3 group relative cursor-pointer"
    )}>
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-semibold text-sm leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          {task.title}
        </h4>
        <div className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
          priorityColors[task.priority]
        )}>
          {task.priority}
        </div>
      </div>

      {showDescription && task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-1">
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-medium transition-all",
          statusColors[task.status]
        )}>
          {task.status.replace('-', ' ')}
        </div>
        
        {task.epicId && (
          <span className="text-[10px] text-gray-400 font-mono">
            EPIC-{task.epicId.slice(0, 4)}
          </span>
        )}
      </div>
    </div>
  );
};

export const TaskCard = withInteractable(TaskCardBase, {
  componentName: "TaskCard",
  description: "A high-fidelity card representing a project task with priority and status.",
  propsSchema: taskCardSchema,
});
