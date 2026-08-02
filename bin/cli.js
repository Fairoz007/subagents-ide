#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SUBAGENTS = {
  architect: {
    title: 'Architect',
    description: 'Designs application architecture and implementation plans.',
    prompt: `You are a Senior Software Architect.
Responsibilities:
- Analyze requirements and study existing codebase.
- Design modular, scalable architecture.
- Create implementation plans without writing direct production code.
- Return structured markdown reports.`
  },
  engineer: {
    title: 'Engineer',
    description: 'Implements features from approved specifications.',
    prompt: `You are a Senior Software Engineer.
Rules:
- Follow the architecture and plan exactly.
- Write clean, production-ready code with complete types and error handling.
- Run tests and fix lint errors before reporting completion.`
  },
  reviewer: {
    title: 'Reviewer',
    description: 'Reviews pull requests, security, and code quality.',
    prompt: `You are a Senior Code Reviewer.
Responsibilities:
- Review code for bugs, security vulnerabilities, performance bottlenecks, and maintainability.
- Provide clear, actionable recommendations only.`
  },
  tester: {
    title: 'Tester',
    description: 'Executes tests, creates test plans, and verifies functionality.',
    prompt: `You are a Senior Quality Assurance & Test Engineer.
Responsibilities:
- Create automated and manual test plans.
- Identify edge cases, regression issues, and bugs.
- Report detailed bug reproductions and verify bug fixes.`
  },
  'seo-expert': {
    title: 'SEO & Optimization Expert',
    description: 'Optimizes content and code for Search Engines (SEO), Answer Engines (AEO), Generative Engines (GEO), and Organic Engine (OE).',
    prompt: `You are a Senior Optimization Specialist (SEO, AEO, GEO, OE).
Responsibilities:
- SEO: Optimize title tags, meta descriptions, semantic HTML5, canonical URLs, sitemaps, and robots.txt.
- AEO (Answer Engines): Structure content with clear Q&A formats and direct answers for Perplexity, ChatGPT, and Gemini.
- GEO (Generative Engines): Implement JSON-LD (Schema.org), entity mapping, and rich semantic context for LLMs.
- OE (Organic Engine): Improve Core Web Vitals, mobile responsiveness, internal linking, and content hierarchy.`
  },
  'skill-downloader': {
    title: 'Skill & Integration Downloader',
    description: 'Audits, downloads, installs, and configures required project skills and plugins.',
    prompt: `You are a Project Skill & Integration Downloader.
Responsibilities:
- Audit project stack to identify missing agent skills or tool plugins.
- Search, download, and configure custom skills into .agents/skills/ or workspace customization root.
- Validate SKILL.md layout and frontmatter syntax.`
  }
};

const ANTIGRAVITY_AGENTS = {
  'architect.md': `---
name: architect
description: ${SUBAGENTS.architect.description}
tools:
  - view_file
  - grep_search
  - run_command
subagent: true
mainAgent: false
model: pro
commandExecutionPolicy: sandbox
---

# System Prompt

${SUBAGENTS.architect.prompt}
`,

  'engineer.md': `---
name: engineer
description: ${SUBAGENTS.engineer.description}
tools:
  - view_file
  - replace_file_content
  - grep_search
  - run_command
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---

# System Prompt

${SUBAGENTS.engineer.prompt}
`,

  'reviewer.md': `---
name: reviewer
description: ${SUBAGENTS.reviewer.description}
tools:
  - view_file
  - grep_search
subagent: true
mainAgent: false
---

# System Prompt

${SUBAGENTS.reviewer.prompt}
`,

  'tester.md': `---
name: tester
description: ${SUBAGENTS.tester.description}
tools:
  - view_file
  - grep_search
  - run_command
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---

# System Prompt

${SUBAGENTS.tester.prompt}
`,

  'seo-expert.md': `---
name: seo-expert
description: ${SUBAGENTS['seo-expert'].description}
tools:
  - view_file
  - replace_file_content
  - grep_search
  - run_command
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---

# System Prompt

${SUBAGENTS['seo-expert'].prompt}
`,

  'skill-downloader.md': `---
name: skill-downloader
description: ${SUBAGENTS['skill-downloader'].description}
tools:
  - view_file
  - replace_file_content
  - grep_search
  - run_command
subagent: true
mainAgent: false
model: inherit
commandExecutionPolicy: sandbox
---

# System Prompt

${SUBAGENTS['skill-downloader'].prompt}
`
};

function scaffoldAntigravity(cwd) {
  const targetDir = path.join(cwd, '.agents', 'agents');
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('🤖 [Antigravity] Scaffolding .agents/agents/');
  for (const [filename, content] of Object.entries(ANTIGRAVITY_AGENTS)) {
    fs.writeFileSync(path.join(targetDir, filename), content.trim() + '\n', 'utf8');
    console.log(`  ✓ .agents/agents/${filename}`);
  }
}

function scaffoldCursor(cwd) {
  const targetDir = path.join(cwd, '.cursor', 'rules');
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('\n⚡ [Cursor IDE] Scaffolding .cursor/rules/');
  for (const [key, agent] of Object.entries(SUBAGENTS)) {
    const filename = `${key}.mdc`;
    const content = `---
description: ${agent.description}
globs: *
alwaysApply: false
---

# ${agent.title} Subagent Rule

${agent.prompt}
`;
    fs.writeFileSync(path.join(targetDir, filename), content.trim() + '\n', 'utf8');
    console.log(`  ✓ .cursor/rules/${filename}`);
  }
}

function scaffoldClaude(cwd) {
  console.log('\n🧠 [Claude Code] Scaffolding CLAUDE.md');
  const filePath = path.join(cwd, 'CLAUDE.md');
  const content = `# Project AI Subagent Guidelines (Claude Code)

This repository configures specialized AI subagents for modular task execution.

${Object.entries(SUBAGENTS).map(([key, agent]) => `## Subagent: ${agent.title} (${key})
**Role:** ${agent.description}

${agent.prompt}
`).join('\n')}
`;
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('  ✓ CLAUDE.md');
}

function scaffoldClineAndRoo(cwd) {
  console.log('\n🛠️ [Cline & Roo Code] Scaffolding .clinerules & .roomodes');
  
  const clinerulesPath = path.join(cwd, '.clinerules');
  const roomodesPath = path.join(cwd, '.roomodes');

  const clinerulesContent = `# Cline Subagent Definitions

${Object.entries(SUBAGENTS).map(([key, agent]) => `### Mode: ${key} (${agent.title})
${agent.description}

Prompt:
${agent.prompt}
`).join('\n')}
`;

  const roomodesContent = JSON.stringify({
    customModes: Object.entries(SUBAGENTS).map(([key, agent]) => ({
      slug: key,
      name: agent.title,
      roleDefinition: agent.prompt,
      groups: ["read", "edit", "browser", "command"]
    }))
  }, null, 2);

  fs.writeFileSync(clinerulesPath, clinerulesContent.trim() + '\n', 'utf8');
  console.log('  ✓ .clinerules');
  fs.writeFileSync(roomodesPath, roomodesContent + '\n', 'utf8');
  console.log('  ✓ .roomodes');
}

function scaffoldCopilot(cwd) {
  const targetDir = path.join(cwd, '.github');
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('\n🐙 [GitHub Copilot] Scaffolding .github/copilot-instructions.md');
  const filePath = path.join(targetDir, 'copilot-instructions.md');
  const content = `# GitHub Copilot Subagent Instructions

When assisting on this repository, act according to the relevant subagent role:

${Object.entries(SUBAGENTS).map(([key, agent]) => `### ${agent.title} (@${key})
- **Goal:** ${agent.description}
- **Rules:** ${agent.prompt.replace(/\n/g, ' ')}
`).join('\n')}
`;
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('  ✓ .github/copilot-instructions.md');
}

function scaffoldWindsurf(cwd) {
  console.log('\n🏄 [Windsurf Cascade] Scaffolding .windsurfrules');
  const filePath = path.join(cwd, '.windsurfrules');
  const content = `# Windsurf Cascade Rules

${Object.entries(SUBAGENTS).map(([key, agent]) => `## ${agent.title} Subagent
- **Description:** ${agent.description}
- **Guidelines:**
${agent.prompt}
`).join('\n')}
`;
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('  ✓ .windsurfrules');
}

function main() {
  const cwd = process.cwd();
  console.log('\n🚀 Universal AI Subagents Scaffolder (@fairoz9961/subagents-ide)');
  console.log(`📁 Target Workspace: ${cwd}\n`);

  try {
    scaffoldAntigravity(cwd);
    scaffoldCursor(cwd);
    scaffoldClaude(cwd);
    scaffoldClineAndRoo(cwd);
    scaffoldCopilot(cwd);
    scaffoldWindsurf(cwd);

    console.log('\n✨ All Subagents successfully created for ALL major AI tools & IDEs!');
    console.log('   • Antigravity (.agents/agents/)');
    console.log('   • Cursor IDE (.cursor/rules/)');
    console.log('   • Claude Code (CLAUDE.md)');
    console.log('   • Cline & Roo Code (.clinerules, .roomodes)');
    console.log('   • GitHub Copilot (.github/copilot-instructions.md)');
    console.log('   • Windsurf Cascade (.windsurfrules)\n');
  } catch (err) {
    console.error('❌ Error scaffolding subagents:', err.message);
    process.exit(1);
  }
}

main();
