"use client";

import { withInteractable } from "@tambo-ai/react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { StatusDot } from "@/components/ui/badge";
import { Bot, Code, TestTube, Shield } from "lucide-react";

// Schema for AgentStatusCard
export const agentStatusSchema = z.object({
  name: z.string().describe("Agent name like 'Coder Agent' or 'QA Agent'"),
  type: z.enum(["coder", "qa", "architect", "security"]).describe("Agent type for icon selection"),
  status: z.enum(["active", "idle", "reviewing"]).describe("Current agent status"),
});

export type AgentStatus = z.infer<typeof agentStatusSchema>;

// Direct props interface
interface AgentStatusCardBaseProps {
  name: string;
  type: "coder" | "qa" | "architect" | "security";
  status: "active" | "idle" | "reviewing";
}

const agentIcons = {
  coder: Code,
  qa: TestTube,
  architect: Shield,
  security: Bot,
};

const statusLabels = {
  active: "Active",
  idle: "Idle",
  reviewing: "Reviewing",
};

// Base component - can be used directly
export function AgentStatusCardBase({ name, type, status }: AgentStatusCardBaseProps) {
  const Icon = agentIcons[type] || Bot;

  return (
    <div
      className={cn(
        "vg-card flex items-center justify-between gap-4 min-w-[180px]",
        status === "active" && "border-vg-success/30 relative overflow-hidden"
      )}
    >
      {/* Glow effect for active */}
      {status === "active" && (
        <div className="absolute inset-0 bg-gradient-to-r from-vg-success/5 to-transparent pointer-events-none" />
      )}

      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-xs text-muted-foreground">{name}</span>
        <div className="flex items-center gap-2">
          <StatusDot status={status} />
          <span className="text-sm font-semibold text-foreground">
            {statusLabels[status]}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          status === "active" && "bg-vg-success/20 text-vg-success",
          status === "idle" && "bg-vg-surface text-muted-foreground",
          status === "reviewing" && "bg-vg-warning/20 text-vg-warning"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

// Interactable version for Tambo registry
export const AgentStatusCard = withInteractable(AgentStatusCardBase, {
  componentName: "AgentStatusCard",
  description: "Displays an AI agent's current status (Active, Idle, or Reviewing)",
  propsSchema: agentStatusSchema,
});
