"use client";

import { withInteractable } from "@tambo-ai/react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

// Schema for TaskCard
export const taskCardSchema = z.object({
  task: z.object({
    id: z.string().describe("Task ID like 'VA-089'"),
    title: z.string().describe("Task title"),
    description: z.string().optional().describe("Task description"),
    status: z.enum(["backlog", "in-progress", "review", "done"]),
    priority: z.enum(["low", "medium", "high", "critical"]),
    assignees: z.array(z.string()).optional().describe("Initials of assignees"),
    comments: z.number().optional().describe("Number of comments"),
  }),
  showDescription: z.boolean().default(true),
  isEditable: z.boolean().default(true),
});

export type TaskCardProps = z.infer<typeof taskCardSchema>;

// Direct props interface for base component
interface TaskCardBaseProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: "backlog" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "critical";
    assignees?: string[];
    comments?: number;
  };
  showDescription?: boolean;
  isEditable?: boolean;
}

const priorityVariants: Record<string, "default" | "primary" | "success" | "warning" | "danger"> = {
  low: "default",
  medium: "primary",
  high: "warning",
  critical: "danger",
};

// Base component - can be used directly in JSX
export function TaskCardBase({ task, showDescription = true }: TaskCardBaseProps) {
  return (
    <div className="vg-card flex flex-col gap-3 group cursor-pointer">
      {/* Header: ID + Priority */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] text-muted-foreground font-mono">
          {task.id}
        </span>
        {(task.priority === "high" || task.priority === "critical") && (
          <Badge variant={priorityVariants[task.priority]}>
            {task.priority === "critical" ? "HIGH PRIORITY" : task.priority}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-foreground group-hover:text-vg-primary transition-colors leading-tight">
        {task.title}
      </h4>

      {/* Description */}
      {showDescription && task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer: Assignees + Comments */}
      <div className="flex items-center justify-between mt-1">
        {/* Assignees */}
        {task.assignees && task.assignees.length > 0 && (
          <div className="flex items-center -space-x-1">
            {task.assignees.slice(0, 3).map((initials, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full bg-vg-surface border border-border flex items-center justify-center text-[8px] font-bold text-muted-foreground"
              >
                {initials}
              </div>
            ))}
            {task.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-vg-surface border border-border flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                +{task.assignees.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Comments */}
        {task.comments !== undefined && task.comments > 0 && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="w-3 h-3" />
            <span className="text-[10px]">{task.comments}</span>
          </div>
        )}
      </div>

      {/* Progress bar for in-progress tasks */}
      {task.status === "in-progress" && (
        <div className="vg-progress mt-1">
          <div className="vg-progress-bar" style={{ width: "60%" }} />
        </div>
      )}
    </div>
  );
}

// Interactable version for Tambo registry
export const TaskCard = withInteractable(TaskCardBase, {
  componentName: "TaskCard",
  description: "Displays a project task card with ID, title, priority, assignees, and progress",
  propsSchema: taskCardSchema,
});
