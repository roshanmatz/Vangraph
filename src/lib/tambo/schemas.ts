import { z } from "zod";

// Task Schema
export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().describe("Summary of the task"),
  description: z.string().optional().describe("Detailed description of the task"),
  status: z.enum(["todo", "in-progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  epicId: z.string().uuid().optional(),
  sprintId: z.string().uuid().optional(),
});

export type Task = z.infer<typeof taskSchema>;

// TaskCard Props Schema
export const taskCardSchema = z.object({
  task: taskSchema,
  showDescription: z.boolean().default(true),
  isEditable: z.boolean().default(true),
});

// ProjectDashboard Props Schema
export const projectDashboardSchema = z.object({
  projectName: z.string(),
  activeSprintId: z.string().uuid().optional(),
  totalTasks: z.number(),
  completedTasks: z.number(),
  aiInsights: z.array(z.string()).describe("Autonomous suggestions from the agent"),
});

// AIConsultant Props Schema (for autonomous chat interactions)
export const aiConsultantSchema = z.object({
  mode: z.enum(["refiner", "planner", "analyst"]),
  context: z.string().describe("What the AI is currently focusing on"),
  proposals: z.array(z.object({
    taskId: z.string().uuid(),
    suggestion: z.string(),
    action: z.enum(["update_status", "assign_sprint", "flag_duplicate"]),
  })).optional(),
});
