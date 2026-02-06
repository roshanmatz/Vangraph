# Vangraph

![Vangraph Banner](public/og-image.png)

> **Autonomous Project Management powered by AI Agents.**  
> Refine your backlog, plan sprints, and keep your team unblocked with intelligent agents.

![Status](https://img.shields.io/badge/Status-Prototype-blue)
![Tech](https://img.shields.io/badge/Tech-Next.js_15_|_Tambo_|_Supabase-black)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

**Vangraph** is an AI-powered project management platform designed to automate the tedious parts of software development lifecycles. By integrating **AI Agents** (Coder, QA, Architect) directly into the workflow, Vangraph helps teams:

*   **Automate Backlog Refinement**: Agents analyze tasks and suggest improvements.
*   **Intelligent Sprint Planning**: AI-driven velocity tracking and sprint goal setting.
*   **Real-time Insights**: "Consultant" agents providing architectural and quality feedback.
*   **Generative UI**: Dynamic task cards, dashboards, and status reports generated on the fly.

## Key Features

*   **🤖 AI Agents**: Dedicated agents for Coding, QA, and Architecture that monitor and advise on project status.
*   **📊 Generative Components**:
    *   **Task Cards**: smart visualization of work items.
    *   **Phase Cards**: track project lifecycle stages.
    *   **Agent Status**: real-time activity monitoring of AI helpers.
*   **⚡ Tambo Integration**: Built on Tambo SDK for seamless generative interface creation.
*   **🛠️ Tools & MCP**:
    *   Supabase integration for data persistence.
    *   Model Context Protocol (MCP) support for connecting external tools.
*   **💬 Interactive Chat**: Chat with Vangraph to create tasks, query stats, or get project advice.

## Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **AI Integration**: [Tambo SDK](https://tambo.ai)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Validation**: Zod
*   **Backend**: Supabase (via MCP and direct client)

## Quick Start

### Prerequisites

*   Node.js 18+
*   [Supabase Account](https://supabase.com/) (for backend)
*   [Tambo Account](https://tambo.ai/) (for AI features)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/hebypaul/Vangraph.git
    cd vangraph
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory:
    ```bash
    cp example.env.local .env.local
    ```
    Add your API keys:
    ```env
    NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key_here
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Tambo Configuration
The core AI configuration lives in `src/lib/tambo.ts`. This file defines:
*   **Tools**: Functions the AI can execute (e.g., `getProjectStats`, `createTask`).
*   **Components**: UI elements the AI can generate (e.g., `TaskCard`, `ProjectDashboard`).

### MCP (Model Context Protocol)
Vangraph uses MCP to connect with external services. Configure MCP servers in `src/components/tambo/mcp-components.tsx` to extend capabilities.

## Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
│   ├── board/            # Kanban board view
│   ├── chat/             # AI Chat interface
│   ├── projects/         # Project management views
│   └── page.tsx          # Main dashboard
├── components/
│   ├── atomic/           # Reusable atomic UI components
│   ├── layout/           # Sidebar, Header, etc.
│   └── tambo/            # AI-generatable components (TaskCard, etc.)
├── lib/
│   └── tambo.ts          # Tambo AI registry & config
└── services/
    └── supabase/         # Backend service integration
```

## Development

*   **Build**: `npm run build`
*   **Lint**: `npm run lint`
*   **Lint Fix**: `npm run lint:fix`

## Support

For issues, please file a bug report in the [Issues](https://github.com/hebypaul/Vangraph/issues) tab.

## License

This project is licensed under the MIT License.
