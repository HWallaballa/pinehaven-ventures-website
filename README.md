# Pinehaven Ventures Website

Official website for Pinehaven Ventures LLC.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Stripe Checkout + Billing Portal

## Repository

- GitHub: `https://github.com/HWallaballa/pinehaven-ventures-website`
- Main product manifest: `ventures.json`
- Agent workflow and generation rules: `CLAUDE.md`

## Local Development (Any Machine)

1. Install Node.js 22+ and npm.
2. Clone the repository.
3. Install dependencies.
4. Create `.env.local` from `.env.example`.
5. Start the dev server.

```bash
npm install
cp .env.example .env.local
npm run dev
```

App runs at `http://localhost:3000`.

## Linux Factory Setup (Omarchy Build Server)

Use this when setting up the always-on autonomous build machine.

### 1) Verify prerequisites

Required binaries:

- `git`
- `node` (v22+)
- `npm`
- `gh`
- `docker`
- `tmux`
- `jq`
- `curl`

Verification:

```bash
node -v
npm -v
git --version
gh --version
docker --version
tmux -V
```

### 2) Clone and run the website

```bash
mkdir -p ~/pinehaven && cd ~/pinehaven
git clone https://github.com/HWallaballa/pinehaven-ventures-website.git
cd pinehaven-ventures-website
npm install
cp .env.example .env.local
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Quick health check:

```bash
curl -I http://localhost:3000
```

### 3) Configure Anthropic key for CLI automation

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc
```

### 4) Run baseline quality checks

```bash
npx tsc --noEmit
npm run build
```

### 5) Optional local model setup (cost control)

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.1:8b
```

## Project Scripts

- `npm run dev` - Run development server
- `npm run build` - Build production app
- `npm run lint` - Run linting
- `npm run generate` - Generate Stripe/product artifacts from `ventures.json`
- `npm run generate:dry` - Preview generation changes
- `npm run seed-stripe` - Provision Stripe products/prices
- `npm run seed-stripe:dry` - Dry-run Stripe provisioning

## Environment and Secrets

- Keep secrets in `.env.local` only.
- Never commit API keys.
- Stripe and Anthropic credentials are required for full automation flows.

## Suggested Validation Before Merging

```bash
npx tsc --noEmit
npm run lint
npm run build
```
