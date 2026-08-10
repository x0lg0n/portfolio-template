import { Icons, type IconProps } from "@/components/icons";

export type ProjectIcon = (props: IconProps) => React.ReactNode;

export interface ProjectLink {
  type: string;
  href: string;
  icon: ProjectIcon;
}

export interface CaseStudy {
  challenge: string;
  strategy: string;
  results: string;
}

export interface Project {
  slug: string;
  title: string;
  href: string;
  dates: string;
  date: string;
  active: boolean;
  featured?: boolean;
  featuredOrder?: number;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  image?: string;
  imageAlt?: string;
  video?: string;
  caseStudy: CaseStudy;
  stars?: number;
}

export const projects: Project[] = [
  {
    slug: "orka",
    featuredOrder: 1,
    title: "Orka — AI Financial OS",
    href: "https://orkahq.vercel.app/",
    dates: "Jul 2026 - Aug 2026",
    date: "2026-07-04",
    active: true,
    featured: true,
    stars: 3,
    description:
      "The AI-powered financial operating system for freelancers, agencies, and service businesses, powered by @stellar — ship invoices, track payments, and get AI-driven financial insights from one dashboard.",
    technologies: [
      "TypeScript",
      "Stellar",
      "Next.js",
      "AI",
      "Node.js",
      "PostgreSQL",
    ],
    links: [
      {
        type: "Live",
        href: "https://orkahq.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/Genesis-360/Orka",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Freelancers and agencies manage money across a dozen tools — invoices, payroll, taxes, bookkeeping — none of it connected, none of it AI-assisted. Building an operating system that unifies it and speaks Stellar comes with serious trust stakes: get the ledger wrong and users lose money.`,
      strategy: `A **TypeScript + Next.js** platform wired to the **Stellar** network as the financial backbone, with AI handling classification, forecasting, and cash-flow insight on top of a **PostgreSQL** ledger. Organized in open-source-first, contribution-welcoming structure (CONDUCT + CONTRIBUTING + licenses) so the community can extend it as a real OS rather than a closed app.`,
      results: `Live at **orkahq.vercel.app**, **3+ stars** on GitHub under the **Genesis 360** organization, actively pushed (Aug 2026). The repo's open-source governance model signals a serious attempt at a community-run financial OS for independent workers.`,
    },
  },
  {
    slug: "wrangler",
    title: "Wrangler — Anonymous ZK Feedback",
    href: "https://wrangler-midnight.vercel.app/",
    dates: "Jul 2026 - Aug 2026",
    date: "2026-07-29",
    active: true,
    featured: true,
    stars: 2,
    description:
      "A decentralized app on the Midnight Network for anonymous, Zero-Knowledge-verified feedback — submit with proof you're authorized, without revealing who you are.",
    technologies: [
      "Midnight Network",
      "TypeScript",
      "Zero-Knowledge Proofs",
      "Compact",
      "Node.js",
    ],
    links: [
      {
        type: "Live",
        href: "https://wrangler-midnight.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/wrangler",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Collecting sensitive feedback usually means trusting a middleman with your identity. Government and enterprise surveys need real, verifiable participation — but voters won't open up if their answer can be tied back to them.`,
      strategy: `Built a **Midnight Network (Level 3: Half Moon) dApp** in **TypeScript/Compact**. Feedback is submitted with a **Zero-Knowledge proof** that the sender holds a valid credential — the ledger verifies authorization, records the message, and learns nothing about who wrote it. Contract deployed on Midnight Preview with a dashboard for on-chain inspection.`,
      results: `Contract live at \`e1c5d3b6…ce60465\` on Midnight Preview with **10/10 passing tests**, Apache-2.0 licensed, deployed 2026-07-30 and showcased at the Midnight Project v1. First-hand proof that privacy-preserving voting/survey systems are production-viable.`,
    },
  },
  {
    slug: "3d-herbvision",
    featuredOrder: 2,
    title: "3D-HerbVision",
    href: "",
    dates: "Mar 2026 - Aug 2026",
    date: "2026-03-16",
    active: true,
    featured: true,
    stars: 0,
    description:
      "Advanced AI-powered botanical research platform combining computer vision, natural language processing, and traditional medicine knowledge for comprehensive plant identification and analysis.",
    technologies: [
      "Python",
      "Computer Vision",
      "NLP",
      "Machine Learning",
      "Research",
    ],
    links: [
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/3D-HerbVision",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Identifying medicinal plants reliably is a research problem: visual similarity between species, regional naming differences, and fragmented traditional-medicine knowledge scattered across sources. Learners and researchers struggle to map a plant image to verified medicinal properties.`,
      strategy: `A **Python**-based research platform fusing **computer vision** (plant identification) with **NLP** (querying traditional medicine knowledge) — the repo's topics show the cross between medical imaging and medicinal-plant research, designed for R&D use.`,
      results: `Renamed and restructured during **Aug 2026** — still actively researched; positioned as a research-grade tool (computer vision + NLP + medical imaging) rather than a demo website.`,
    },
  },
  {
    slug: "remitflow",
    title: "RemitFlow — Cheapest Stellar Route",
    href: "https://rmtflow.vercel.app/",
    dates: "Apr 2026 - Jul 2026",
    date: "2026-04-12",
    active: true,
    featured: true,
    stars: 1,
    description:
      "An intelligent payment router that finds the cheapest cross-border route across Stellar anchors and rails — saving money on every remittance.",
    technologies: [
      "Stellar",
      "TypeScript",
      "Rust",
      "Next.js",
      "Node.js",
      "Express",
      "Docker",
    ],
    links: [
      {
        type: "Live",
        href: "https://rmtflow.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/RemitFlow",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Cross-border payments lose **3-5%** to fees and bad FX — and users can't compare routes because anchors quote opaque prices. Choosing a payment path is a guessing game.`,
      strategy: `Reframed as a **router** problem: evaluate multiple Stellar anchors and rails, settle via **Rust + Soroban smart contracts**, keep state in **PostgreSQL/Redis**, and surface live prices in a **Next.js** UI. Dockerized so the whole router spins up in one container.`,
      results: `Live at **rmtflow.vercel.app** with docs and a public demo; deployed under an active push cycle (Jul 2026) and shared on open-source channels.`,
    },
  },
  {
    slug: "tetris",
    featuredOrder: 3,
    title: "Tetris — DevSecOps on AWS EKS",
    href: "https://mpirescarvalho.github.io/react-tetris/",
    dates: "Jun 2025 - Jun 2026",
    date: "2025-06-18",
    active: true,
    stars: 1,
    description:
      "A comprehensive DevSecOps learning project: how to deploy a React Tetris game on AWS EKS with infrastructure provisioning, CI/CD, and integrated security scanning.",
    technologies: [
      "React",
      "AWS EKS",
      "Docker",
      "Kubernetes",
      "DevSecOps",
      "CI/CD",
    ],
    links: [
      {
        type: "Live",
        href: "https://mpirescarvalho.github.io/react-tetris/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/Tetris-game",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Nothing turns a deployment story into a repeatable one like shipping something universally known. The mission: deploy a Tetris game to **AWS EKS** and prove the whole pipeline — from infrastructure provisioning to continuous deployment — with **security scanning baked in**.`,
      strategy: `Uses **React** on the frontend; the repo walks the full DevSecOps lifecycle: Terraform-style EKS provisioning, Docker image build, CI/CD pipeline configuration, Node.js/Express tooling around it, and security scans integrated into CI.`,
      results: `Actively maintained through **Jun 2026**; functions as a teaching artifact for anyone wanting to see a secure, containerized, Kubernetes-driven delivery pipeline end to end.`,
    },
  },
  {
    slug: "finsight-api",
    title: "FinSight API",
    href: "https://finsight-api-r6rs.onrender.com/api/docs/",
    dates: "Apr 2026 - May 2026",
    date: "2026-04-03",
    active: true,
    stars: 0,
    description:
      "Modular TypeScript + Express backend for financial records — role-based access control and real-time analytics with Prisma, PostgreSQL, and live Swagger docs.",
    technologies: [
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Jest",
      "Docker",
      "CI/CD",
    ],
    links: [
      {
        type: "Docs",
        href: "https://finsight-api-r6rs.onrender.com/api/docs/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/FinSight-API",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Financial backends drift into spaghetti — auth in one place, records in another, analytics bolted on. FinSight needs a clean, modular core where roles, records, and live numbers all live together.`,
      strategy: `**TypeScript + Express** API with **Prisma + PostgreSQL**, **Jest** test coverage, **Docker Compose** for instant local rise, and CI/CD in place. RBAC keeps roles strict while real-time analytics stream from the same schema.`,
      results: `Fully documented (**Swagger UI live at /api/docs**), Dockerized, and CI-built — a ready-to-fork financial API skeleton with tests and auth baked in.`,
    },
  },
  {
    slug: "inventory-billing",
    title: "Inventory & Billing Management System",
    href: "https://inventory-billing-management-system.vercel.app/",
    dates: "Sep 2025 - May 2026",
    date: "2025-09-06",
    active: true,
    featured: true,
    stars: 4,
    description:
      "A modern inventory and billing platform for small and medium businesses — products, customers, vendors, transactions, and insightful reports in one system.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "TailwindCSS",
      "Recharts",
      "JWT",
      "Zod",
    ],
    links: [
      {
        type: "Live",
        href: "https://inventory-billing-management-system.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/Inventory-Billing-Management-System",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Small businesses still run inventory and billing on spreadsheets — duplicated data, no live stock visibility, no role-based access, invoices that take hours. In one system: products, customers, vendors, transactions, and reports.`,
      strategy: `**Next.js 15 + Express + MongoDB** full-stack, TypeScript end-to-end, **JWT auth with roles**, **Zod** validation, **Recharts** dashboards. A public Express API (Helmet + Morgan) keeps the data layer open, and Tailwind + shadcn/ui give it a polished feel.`,
      results: `Shipped live on Vercel, **4+ stars**, 5 forks, and growing open-source community (PRs welcome). Docs cover API routes, contributor guidelines, and setup — designed to be adopted by real stores.`,
    },
  },
  {
    slug: "rent-payment-splitter",
    title: "Rent Payment Splitter",
    href: "https://rent-payment-splitter.vercel.app/",
    dates: "Feb 2026 - May 2026",
    date: "2026-02-11",
    active: true,
    stars: 1,
    description:
      "Decentralized rent-payment splitting dApp on the Stellar testnet — connect your Freighter wallet, check your XLM balance, and send payments from one dashboard.",
    technologies: [
      "Stellar",
      "Soroban",
      "Rust",
      "Next.js",
      "TypeScript",
      "Vitest",
      "Freighter",
    ],
    links: [
      {
        type: "Live",
        href: "https://rent-payment-splitter.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/Rent-Payment-Splitter",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Splitting rent between roommates is messy, and crypto tools for shared expense rarely exist. The tricky part: **wallet compatibility** — users arrive with Freighter, Rabet, xBull, or Albedo, and the dApp must work with all of them.`,
      strategy: `**Stellar testnet + Soroban (Rust)** for the payments contract, **Next.js + TypeScript** frontend connecting through **Freighter / Rabet / xBull / Albedo**, with **Vitest** guarding the money math. UI for checking XLM balance right from one dashboard.`,
      results: `**Live Vercel demo** + CI/CD straight to the same place; a robust, documented template for Stellar-side shared-payment dApps.`,
    },
  },
  {
    slug: "ephemeral-chat",
    featuredOrder: 4,
    title: "Real-Time Ephemeral Chat System",
    href: "https://real-time-ephemeral-chat-system.vercel.app/",
    dates: "Nov 2025 - May 2026",
    date: "2025-11-07",
    active: true,
    featured: true,
    stars: 1,
    description:
      "Secure real-time chat with self-destructing rooms — anonymous, no sign-up, messages vanish when the room dies.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Elysia",
      "Upstash Realtime",
      "Upstash Redis",
      "TailwindCSS",
      "React Query",
    ],
    links: [
      {
        type: "Live",
        href: "https://real-time-ephemeral-chat-system.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/Real-Time-Ephemeral-Chat-System",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Ephemeral messaging is about trust — but chat apps are either a registration wall or approval of forever conversation. Users want temporary identities, instant delivery, rooms that destroy themselves, no account needed.`,
      strategy: `**Next.js + TypeScript** with **Elysia.js** API and **Upstash Realtime + Redis** for instant delivery and expiring room state. Managing the pub/sub lifecycle so a room literally cannot be revived after destruction was the hard part — TTLs, keys, and cleanup are all handled.`,
      results: `One-click **anonymous chat** live at Vercel: rooms self-destruct, no stale Redis state, dark-themed responsive UI, MIT-licensed and safe end to end.`,
    },
  },
  {
    slug: "ai-weather-app",
    title: "AI Weather App",
    href: "https://ai-weather-app-rho-two.vercel.app/",
    dates: "Dec 2025 - May 2026",
    date: "2025-12-13",
    active: true,
    stars: 1,
    description:
      "Intelligent weather forecasting combining real-time data with AI-powered insights — built with React, Vite, and powered by WeatherAPI + Google Gemini.",
    technologies: ["React", "Vite", "JavaScript", "WeatherAPI", "Google Gemini"],
    links: [
      {
        type: "Live",
        href: "https://ai-weather-app-rho-two.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/AI-Weather-App",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Weather APIs are numerins; users want plain language. Replace the raw forecast with an assistant that shows the weather and tells you what it means.`,
      strategy: `**React + Vite** front-against **WeatherAPI** for live data and **Google Gemini** for natural-language forecasts — a simple, replayable pattern you can copy to any weather + AI combo.`,
      results: `Live on Vercel with a clean glassy UI; actively pushed through May 2026 with prior data on the repo.`,
    },
  },
  {
    slug: "yuvahire",
    title: "YuvaHire — AI Job Portal",
    href: "https://yuva-hire-assignment.vercel.app",
    dates: "Jun 2025 - Feb 2026",
    date: "2025-06-11",
    active: true,
    stars: 2,
    description:
      "Modern job portal connecting college students with career opportunities — AI-powered job matching, real-time application tracking, and admin tools for colleges.",
    technologies: [
      "Next.js 15",
      "React 19",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
    ],
    links: [
      {
        type: "Live",
        href: "https://yuva-hire-assignment.vercel.app",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/YuvaHire",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Students hunt for jobs across scattered portals, colleges lose track of student placement, and HR filters thousands of resumes. Yuva is where the two sides meet with a single dashboard.`,
      strategy: `**Next.js 15 + React 19 + Node/MongoDB** portal with **AI-powered job matching**, real-time application tracking, and role-based admin tools for colleges. Express API backend, contributions-welcome culture.`,
      results: `Live at Vercel, **2+ stars**, actively maintained through **Feb 2026**; a full-stack reference for hiring platforms (match-first, admin-heavy).`,
    },
  },
  {
    slug: "task-management-system",
    title: "Taskly — Task Management System",
    href: "https://task-management-system-murex-phi.vercel.app",
    dates: "Oct 2025 - Feb 2026",
    date: "2025-10-03",
    active: true,
    stars: 1,
    description:
      "Taskly — a clean, minimal task management system with drag-and-drop boards, prioritization, and JWT-secured accounts.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Express",
      "MongoDB",
      "JWT",
      "Framer Motion",
      "Joi",
    ],
    links: [
      {
        type: "Live",
        href: "https://task-management-system-murex-phi.vercel.app",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/Task-Management-System",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Todo apps tricky or that collapse under five tasks; this service needs a board that scales with real users, priorities, and permissions without drowning in UI.`,
      strategy: `**Next.js + TypeScript** front-end with **Framer Motion** for buttery drag-and-drop boards; **Express + MongoDB** backend protected with **JWT + Joi** validation. Minimal, fast, secured — the classic project done to a real finish.`,
      results: `Live at Vercel, API + UI shipped together, maintained through Feb 2026.`,
    },
  },
  {
    slug: "ai-career-coach",
    title: "AI Career Coach",
    href: "https://ai-career-coach-sigma-blue.vercel.app",
    dates: "Sep 2025 - Feb 2026",
    date: "2025-09-15",
    active: true,
    stars: 1,
    description:
      "AI-powered coaching platform with smart resume building, interview prep, and personalized guidance — Next.js 15 + Google Gemini.",
    technologies: [
      "Next.js 15",
      "React 19",
      "JavaScript",
      "Prisma",
      "PostgreSQL",
      "Google Gemini",
    ],
    links: [
      {
        type: "Live",
        href: "https://ai-career-coach-sigma-blue.vercel.app",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/AI-Carrier-Coach",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Career advice dies in folders — static resumes, generic interview questions, no personal guidance. A coach that improves as you use it.`,
      strategy: `**Next.js 15 + React 19** with **Prisma + PostgreSQL** lake, and **Google Gemini** doing resume-building, interview prep, and coaching. Auth-first so every session is personalized.`,
      results: `Deployed on Vercel with full stack documented; 2+ months of active development through early 2026.`,
    },
  },
  {
    slug: "stegnox",
    title: "StegnoX — Steganography Tool",
    href: "https://stegnox.streamlit.app/",
    dates: "Feb 2025 - Nov 2025",
    date: "2025-02-22",
    active: true,
    stars: 0,
    description:
      "Secure image steganography tool for hiding and extracting secret data within images using advanced techniques.",
    technologies: ["Python", "Streamlit", "Steganography", "Security", "Edge"],
    links: [
      {
        type: "Live",
        href: "https://stegnox.streamlit.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/StegnoX",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Steganography tools are niche, but students and security-minded users need a visible lesson: how secrets fit inside images, and how to hide them without the file growing suspiciously.`,
      strategy: `**Python + Streamlit** web app with advanced hiding and extraction flows — a compact, interactive demo of hiding in plain sight, born from an AICTE internship project.`,
      results: `Deployed and shared at **stegnox.streamlit.app** — open for learning, extraction, and playing with the math behind the disguise.`,
    },
  },
  {
    slug: "boutique-to-box",
    title: "Boutique To Box — AI Fashion",
    href: "https://boutique-to-box.vercel.app/",
    dates: "Mar 2025 - Oct 2025",
    date: "2025-03-30",
    active: true,
    stars: 1,
    description:
      "AI-powered fashion platform — 3D avatars from body measurements, AI-generated clothing designs, and seamless tailor connectivity.",
    technologies: [
      "TypeScript",
      "Express",
      "Appwrite",
      "React",
      "3D Avatars",
      "AI",
    ],
    links: [
      {
        type: "Live",
        href: "https://boutique-to-box.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/Genesis-360/Boutique-To-Box",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Tailoring is stuck in fitting rooms and guesswork — customers can't see fit before the garment exists. Boutique to Box reframes fashion: measurements in, outfits out, without a single fitting.`,
      strategy: `**3D avatar customization** from body measurements + **AI-generated clothing designs** + direct tailor connection, on **Appwrite** (auth/db) with Express tooling — was built for **AceHack (Hacktoberfest 2025)** under the Genesis org.`,
      results: `Live at **boutique-to-box.vercel.app**, 11 forks and conference/open-source attention (Hacktober 2025), and the repo demonstrates a full AI-design-to-tailor assembly line.`,
    },
  },
  {
    slug: "movio",
    title: "Movie.io (Movio)",
    href: "https://movio-seven.vercel.app",
    dates: "Aug 2025",
    date: "2025-08-05",
    active: true,
    stars: 2,
    description:
      "An open-source anime & movie discovery and tracking platform inspired by Netflix — browse, search, and track what you watch.",
    technologies: ["React", "Vite", "TailwindCSS", "Appwrite", "TMDB API", "JavaScript"],
    links: [
      {
        type: "Live",
        href: "https://movio-seven.vercel.app",
        icon: Icons.globe,
      },
      {
        type: "GitHub",
        href: "https://github.com/x0lg0n/Movie.io",
        icon: Icons.github,
      },
    ],
    caseStudy: {
      challenge: `Discovering where to watch in one place without ads — and tracking what you've planned.`,
      strategy: `React + Vite front-end against the **TMDB API**, with **Appwrite** for users and watchlists.`,
      results: `**2★** on GitHub, MIT-licensed, live demo on Vercel; an evolving open-source discovery app.`,
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}