"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  Bot,
  FolderOpen,
  Settings,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Overview" },
  { href: "/board", icon: Kanban, label: "Kanban Board" },
  { href: "/agents", icon: Bot, label: "Agents" },
  { href: "/files", icon: FolderOpen, label: "Files" },
];

const systemItems = [
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("vg-sidebar", className)}>
      {/* Logo */}
      <div className="mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vg-primary to-vg-purple flex items-center justify-center">
          <span className="text-white font-black text-lg">V</span>
        </div>
      </div>

      {/* Workspace */}
      <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-2">
        Work
      </div>
      <nav className="flex flex-col gap-1 w-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "vg-sidebar-item flex items-center justify-center",
                isActive && "active"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      {/* System */}
      <div className="mt-auto flex flex-col gap-1 w-full px-2">
        <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-2">
          System
        </div>
        {systemItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "vg-sidebar-item flex items-center justify-center",
                isActive && "active"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>

      {/* User Avatar */}
      <div className="mt-4 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vg-warning to-vg-danger flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
      </div>
    </aside>
  );
}
