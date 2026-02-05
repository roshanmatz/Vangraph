"use client";

import { cn } from "@/lib/utils";
import { Mic, Paperclip, ArrowUp } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  placeholder?: string;
  contextLabel?: string;
  onSend?: (message: string) => void;
  className?: string;
}

export function ChatInput({
  placeholder = "Ask Vangraph to refactor the current task...",
  contextLabel,
  onSend,
  className,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() && onSend) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-vg-surface rounded-full border border-border flex items-center gap-2 px-4 py-2 shadow-lg">
        {/* AI Icon */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vg-primary to-vg-purple flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs">✦</span>
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-vg-surface-hover transition-colors text-muted-foreground hover:text-foreground">
            <Mic className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-vg-surface-hover transition-colors text-muted-foreground hover:text-foreground">
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className={cn(
              "p-2 rounded-lg transition-all",
              value.trim()
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-vg-surface text-muted-foreground cursor-not-allowed"
            )}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Context Label */}
      {contextLabel && (
        <div className="text-center mt-2">
          <span className="text-[10px] text-muted-foreground">
            Context: <span className="text-vg-primary">{contextLabel}</span>
          </span>
        </div>
      )}
    </div>
  );
}
