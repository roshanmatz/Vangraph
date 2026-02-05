/**
 * @file tambo.ts
 * @description Central configuration for Tambo components and tools - Vangraph MVP
 */

import {
  taskCardSchema,
  agentStatusSchema,
  phaseCardSchema,
  projectDashboardSchema,
  aiInsightSchema,
  aiConsultantSchema,
  sprintBoardSchema,
} from "./tambo/schemas";
import { TaskCard } from "@/components/tambo/task-card";
import { AgentStatusCard } from "@/components/tambo/agent-status";
import { PhaseCard } from "@/components/tambo/phase-card";
import { ProjectDashboard } from "@/components/tambo/project-dashboard";
import { AIInsight } from "@/components/tambo/ai-insight";
import { AIConsultant } from "@/components/tambo/ai-consultant";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

// ============================================
// TOOLS (to be connected to Supabase)
// ============================================

export const tools: TamboTool[] = [
  {
    name: "getProjectStats",
    description: "Get current project statistics including task counts by status",
    tool: async () => {
      // TODO: Connect to Supabase
      return {
        totalTasks: 24,
        completedTasks: 8,
        inProgressTasks: 6,
        backlogTasks: 10,
        velocity: 42,
        teamActive: 8,
        blockers: 0,
      };
    },
    inputSchema: z.object({}),
    outputSchema: z.object({
      totalTasks: z.number(),
      completedTasks: z.number(),
      inProgressTasks: z.number(),
      backlogTasks: z.number(),
      velocity: z.number(),
      teamActive: z.number(),
      blockers: z.number(),
    }),
  },
  {
    name: "getTasks",
    description: "Fetch tasks from the project, optionally filtered by status or sprint",
    tool: async (input: { status?: string; sprintId?: string }) => {
      // TODO: Connect to Supabase
      return [
        {
          id: "VA-089",
          title: "Implement Auth Flow",
          description: "Complete the backend integration with JWT authentication",
          status: "in-progress",
          priority: "high",
          assignees: ["JD", "AR"],
          comments: 3,
        },
        {
          id: "VA-102",
          title: "Research competitors for QA flow",
          description: "Analyze competitor testing workflows",
          status: "backlog",
          priority: "medium",
          assignees: ["QA"],
          comments: 2,
        },
      ];
    },
    inputSchema: z.object({
      status: z.string().optional().describe("Filter by status: backlog, in-progress, review, done"),
      sprintId: z.string().optional().describe("Filter by sprint ID"),
    }),
    outputSchema: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      status: z.string(),
      priority: z.string(),
      assignees: z.array(z.string()).optional(),
      comments: z.number().optional(),
    })),
  },
  {
    name: "createTask",
    description: "Create a new task in the project",
    tool: async (input: { title: string; description?: string; priority?: string }) => {
      // TODO: Connect to Supabase
      const newId = `VA-${Math.floor(Math.random() * 900) + 100}`;
      return {
        id: newId,
        title: input.title,
        description: input.description || "",
        status: "backlog",
        priority: input.priority || "medium",
      };
    },
    inputSchema: z.object({
      title: z.string().describe("Task title"),
      description: z.string().optional().describe("Task description"),
      priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    }),
    outputSchema: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      status: z.string(),
      priority: z.string(),
    }),
  },
  {
    name: "getAgentStatus",
    description: "Get the current status of AI agents (Coder, QA, Architect)",
    tool: async () => {
      // TODO: Connect to real agent status
      return [
        { name: "Coder Agent", type: "coder", status: "active" },
        { name: "QA Agent", type: "qa", status: "idle" },
        { name: "Architect Agent", type: "architect", status: "reviewing" },
      ];
    },
    inputSchema: z.object({}),
    outputSchema: z.array(z.object({
      name: z.string(),
      type: z.string(),
      status: z.string(),
    })),
  },
];

// ============================================
// COMPONENTS
// ============================================

export const components: TamboComponent[] = [
  {
    name: "TaskCard",
    description: "Displays a project task with ID, title, priority, assignees, and progress. Use for showing individual tasks.",
    propsSchema: taskCardSchema,
    component: TaskCard,
  },
  {
    name: "AgentStatusCard",
    description: "Shows an AI agent's current status (Active, Idle, or Reviewing). Use for displaying agent states.",
    propsSchema: agentStatusSchema,
    component: AgentStatusCard,
  },
  {
    name: "PhaseCard",
    description: "Displays a project phase with progress stepper and metrics. Use for roadmap views.",
    propsSchema: phaseCardSchema,
    component: PhaseCard,
  },
  {
    name: "ProjectDashboard",
    description: "High-level project overview with task counts and AI insights. Use for project summaries.",
    propsSchema: projectDashboardSchema,
    component: ProjectDashboard,
  },
  {
    name: "AIInsight",
    description: "Displays AI-generated insights and suggestions. Use for showing AI analysis results.",
    propsSchema: aiInsightSchema,
    component: AIInsight,
  },
  {
    name: "AIConsultant",
    description: "Interactive AI panel that proposes actions (refining, planning, analysis). Use for autonomous suggestions.",
    propsSchema: aiConsultantSchema,
    component: AIConsultant,
  },
];
