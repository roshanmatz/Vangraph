"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TaskCardBase } from "@/components/tambo/task-card";
import { AgentStatusCardBase } from "@/components/tambo/agent-status";
import { ChatInput } from "@/components/layout/chat-input";

// Mock data for the board
const columns = [
  {
    id: "backlog",
    title: "BACKLOG",
    tasks: [
      {
        id: "VA-102",
        title: "Research competitors for QA flow",
        description: "Analyze competitor testing workflows and automation strategies",
        status: "backlog" as const,
        priority: "medium" as const,
        assignees: ["QA"],
        comments: 2,
      },
      {
        id: "VA-105",
        title: "Update dependency list for modules",
        description: "Review and update all module dependencies",
        status: "backlog" as const,
        priority: "low" as const,
        assignees: ["AR"],
        comments: 1,
      },
    ],
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    tasks: [
      {
        id: "VA-089",
        title: "Implement Auth Flow",
        description: "Complete the backend integration with JWT authentication and set up the session management",
        status: "in-progress" as const,
        priority: "high" as const,
        assignees: ["JD", "AR"],
        comments: 5,
      },
    ],
  },
  {
    id: "review",
    title: "REVIEW",
    tasks: [
      {
        id: "VA-099",
        title: "Database Schema Migration",
        description: "Migrate database schema to support new user roles",
        status: "review" as const,
        priority: "high" as const,
        assignees: ["AR"],
        comments: 3,
      },
    ],
  },
];

const agents = [
  { name: "Coder Agent", type: "coder" as const, status: "active" as const },
  { name: "QA Agent", type: "qa" as const, status: "idle" as const },
  { name: "Architect Agent", type: "architect" as const, status: "reviewing" as const },
];

export default function BoardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[var(--sidebar-width)] flex flex-col">
        <Header projectName="Project Phoenix" sprintName="SPRINT-4" />

        <main className="flex-1 p-6 overflow-auto">
          {/* Agent Status Row */}
          <div className="flex gap-4 mb-6">
            {agents.map((agent) => (
              <AgentStatusCardBase
                key={agent.name}
                name={agent.name}
                type={agent.type}
                status={agent.status}
              />
            ))}
          </div>

          {/* Kanban Board */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div key={column.id} className="vg-column">
                {/* Column Header */}
                <div className="vg-column-header">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      column.id === "backlog"
                        ? "bg-muted-foreground"
                        : column.id === "in-progress"
                        ? "bg-vg-primary"
                        : "bg-vg-warning"
                    }`}
                  />
                  {column.title}
                  <span className="ml-auto text-muted-foreground">
                    {column.tasks.length}
                  </span>
                </div>

                {/* Tasks */}
                <div className="flex flex-col gap-3">
                  {column.tasks.map((task) => (
                    <TaskCardBase key={task.id} task={task} showDescription={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Bottom Chat Input */}
        <div className="p-4 border-t border-border">
          <ChatInput
            placeholder="Ask Vangraph to refactor the current task..."
            contextLabel="Active Task (VA-089) + SPEC.md"
          />
        </div>
      </div>
    </div>
  );
}
