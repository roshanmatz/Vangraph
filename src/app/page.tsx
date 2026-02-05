import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Bot, 
  LayoutDashboard, 
  ArrowRight,
  Sparkles,
  GitBranch,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[var(--sidebar-width)] flex flex-col">
        <Header projectName="Vangraph" sprintName="MVP" />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vg-primary to-vg-purple flex items-center justify-center shadow-lg shadow-vg-primary/25">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-3">
                Vangraph
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Autonomous Project Management powered by AI Agents. 
                Let Vangraph refine your backlog, plan sprints, and keep your team unblocked.
              </p>
            </div>

            {/* Agent Status Preview */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { name: "Coder Agent", status: "Active", icon: Bot, color: "vg-success" },
                { name: "QA Agent", status: "Idle", icon: CheckCircle2, color: "muted-foreground" },
                { name: "Architect", status: "Reviewing", icon: GitBranch, color: "vg-warning" },
              ].map((agent) => (
                <div key={agent.name} className="vg-card flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{agent.name}</p>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${agent.color}`} />
                      {agent.status}
                    </p>
                  </div>
                  <agent.icon className={`w-5 h-5 text-${agent.color}`} />
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link
                href="/chat"
                className="vg-card flex items-center gap-4 group hover:border-vg-primary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-vg-primary/20 flex items-center justify-center text-vg-primary group-hover:bg-vg-primary group-hover:text-primary-foreground transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-vg-primary transition-colors">
                    Open Chat
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Talk to Vangraph AI
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-vg-primary transition-colors" />
              </Link>

              <Link
                href="/board"
                className="vg-card flex items-center gap-4 group hover:border-vg-primary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-vg-purple/20 flex items-center justify-center text-vg-purple group-hover:bg-vg-purple group-hover:text-white transition-colors">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-vg-purple transition-colors">
                    Kanban Board
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    View sprint tasks
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-vg-purple transition-colors" />
              </Link>
            </div>

            {/* Features */}
            <div className="vg-card">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Tambo Features Demonstrated
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Generative Components", desc: "TaskCard, PhaseCard, AgentStatus" },
                  { name: "Interactable Components", desc: "AIConsultant, SpecViewer" },
                  { name: "Tools", desc: "getProjectStats, getTasks, createTask" },
                  { name: "Context Helpers", desc: "current_time, active_sprint" },
                  { name: "MCP Integration", desc: "Supabase MCP server ready" },
                  { name: "Conversation Storage", desc: "Built-in thread history" },
                ].map((feature) => (
                  <div key={feature.name} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vg-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{feature.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
