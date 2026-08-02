# # subagents-ide

A zero-dependency CLI tool to instantly scaffold specialized AI subagents across **ALL major AI tools & IDEs** into any project repository.

## Supported AI Tools & IDEs
- 🤖 **Antigravity / Gemini**: `.agents/agents/*.md`
- ⚡ **Cursor IDE**: `.cursor/rules/*.mdc`
- 🧠 **Claude Code**: `CLAUDE.md`
- 🛠️ **Cline & Roo Code**: `.clinerules` & `.roomodes`
- 🐙 **GitHub Copilot / VS Code**: `.github/copilot-instructions.md`
- 🏄 **Windsurf Cascade**: `.windsurfrules`

---

## Included Subagents
1. **`architect`** (Architect) — System design & implementation plans.
2. **`engineer`** (Engineer) — Feature implementation & production code.
3. **`reviewer`** (Reviewer) — Pull request, security & quality code review.
4. **`tester`** (Tester) — QA testing & automated test suites.
5. **`seo-expert`** (SEO Expert) — Search Engine (SEO), Answer Engine (AEO), Generative Engine (GEO), & Organic Engine (OE) optimization.
6. **`skill-downloader`** (Skill Manager) — Project skill auditor & downloader.

---

## Usage

### Run via NPX
```bash
npx @fairoz9961/subagents-ide
```

or

```bash
npx subagents-ide
```

---

## Publishing to NPM (@fairoz9961 account)

1. Open your terminal and navigate to the package directory:
   ```bash
   cd subagents-ide
   ```

2. Log in to your NPM account (`fairoz9961`):
   ```bash
   npm login
   ```

3. Publish the public package:
   ```bash
   npm publish --access public
   ```
