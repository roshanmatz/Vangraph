/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 */

import {
  taskCardSchema,
  projectDashboardSchema,
  aiConsultantSchema,
} from "./tambo/schemas";
import { TaskCard } from "@/components/tambo/task-card";
import { ProjectDashboard } from "@/components/tambo/project-dashboard";
import { AIConsultant } from "@/components/tambo/ai-consultant";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";

/**
 * tools
 */
export const tools: TamboTool[] = [
  // Future: Add tools for Supabase task management (CRUD)
];

/**
 * components
 * Register the high-fidelity vangraph components here.
 */
export const components: TamboComponent[] = [
  {
    name: "TaskCard",
    description:
      "Displays a single task with status, priority, and epic information.",
    propsSchema: taskCardSchema,
    component: TaskCard,
  },
  {
    name: "ProjectDashboard",
    description: "High-level metrics with autonomous AI insights.",
    propsSchema: projectDashboardSchema,
    component: ProjectDashboard,
  },
  {
    name: "AIConsultant",
    description: "Autonomous agent for refining, planning, and analysis.",
    propsSchema: aiConsultantSchema,
    component: AIConsultant,
  },
];
