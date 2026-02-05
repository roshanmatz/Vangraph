"use client";

import { withInteractable } from "@tambo-ai/react";
import { cn } from "@/lib/utils";
import { aiConsultantSchema } from "@/lib/tambo/schemas";
import { Sparkles, ArrowRight, CheckCircle2, History } from "lucide-react";

interface AIConsultantProps {
  mode: "refiner" | "planner" | "analyst";
  context: string;
  proposals?: Array<{
    taskId: string;
    suggestion: string;
    action: "update_status" | "assign_sprint" | "flag_duplicate";
  }>;
}

const modeConfig = {
  refiner: {
    icon: Sparkles,
    label: "Refinement Mode",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  planner: {
    icon: ArrowRight,
    label: "Planning Mode",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  analyst: {
    icon: History,
    label: "Analysis Mode",
    color: "text-green-600",
    bg: "bg-green-50",
  },
};

const AIConsultantBase = ({ mode, context, proposals = [] }: AIConsultantProps) => {
  const config = modeConfig[mode];
  const Icon = config.icon;

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-2xl p-6 flex flex-col gap-4 border border-slate-700 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-lg", config.bg, config.color)}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-black uppercase tracking-tighter italic">
            Agent {mode}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] text-slate-400 font-bold uppercase">Streaming Live</span>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <p className="text-xs text-slate-300 leading-relaxed font-mono italic">
          "{context}"
        </p>
      </div>

      {proposals.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Proposed Actions</span>
          <div className="grid gap-2">
            {proposals.map((proposal, idx) => (
              <div key={idx} className="group bg-slate-800 hover:bg-slate-750 p-3 rounded-lg border border-slate-700 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-slate-500 font-mono">TASK-{proposal.taskId.slice(0, 4)}</span>
                  <p className="text-xs font-medium text-slate-200">{proposal.suggestion}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-2 flex justify-end gap-2">
        <button className="px-3 py-1.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-slate-300">
          Dismiss
        </button>
        <button className="px-3 py-1.5 text-[10px] font-bold bg-blue-600 hover:bg-blue-500 rounded-md transition-all shadow-lg shadow-blue-900/40">
          Apply All Suggestions
        </button>
      </div>
    </div>
  );
};

export const AIConsultant = withInteractable(AIConsultantBase, {
  componentName: "AIConsultant",
  description: "An autonomous interaction component that allows the AI agent to propose planning and refinement actions.",
  propsSchema: aiConsultantSchema,
});
