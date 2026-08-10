export interface ResumeProjectItem {
  slug: string;
  title: string;
  stack: string[];
  date: string;
  bullets: string[];
}

export interface ResumeSkillGroup {
  name: string;
  skills: string[];
}

export interface ResumeAchievement {
  title: string;
  text: string;
}

export interface ResumeVariant {
  id: string;
  label: string;
  pdf: string;
  headline: string;
  summary: string;
  projects: ResumeProjectItem[];
  skills: ResumeSkillGroup[];
  achievements: ResumeAchievement[];
}

export const RESUME_VARIANTS: ResumeVariant[] = [
  {
    id: "fullstack",
    label: "Full Stack",
    pdf: "/resume/Siddhartha-Resume-Full-Stack.pdf",
    headline: "Full Stack / Backend Engineer — Software Developer",
    summary:
      "Full Stack & Blockchain Engineer with experience building production NestJS microservices, Next.js applications, and cloud infrastructure. Shipped Orka (AI Financial OS) to 100+ real users and contributed to the Stellar ecosystem. Strong focus on clean backend architecture, API design, and shipping real products. Comfortable working remotely with international teams.",
    projects: [
      {
        slug: "orka",
        title: "Orka",
        stack: [
          "Next.js 16",
          "TypeScript",
          "Rust",
          "PostgreSQL",
          "Supabase",
          "Stellar/Soroban",
        ],
        date: "Jun 2026",
        bullets: [
          "Built and launched a full-stack AI financial platform for agencies and freelancers covering proposals, contracts, milestones, escrow, and payments; reached 100+ real users, open-sourced the project, and launched on LaunchLlama.",
          "Designed the complete backend and database architecture supporting organizations, projects, clients, contracts, milestones, and financial transactions.",
        ],
      },
      {
        slug: "ephemeral-chat",
        title: "Real-Time Ephemeral Chat System",
        stack: ["Next.js 16", "Redis", "TypeScript", "Tailwind CSS"],
        date: "Feb 2026",
        bullets: [
          "Achieved sub-50ms message delivery latency for active sessions by architecting a high-performance Pub/Sub messaging layer using Redis and Next.js server actions.",
          "Enforced 100% data privacy and storage efficiency by implementing an automated TTL (Time-to-Live) mechanism that permanently purges chat rooms and history after 10 minutes of inactivity.",
        ],
      },
      {
        slug: "3d-herbvision",
        title: "3D HerbVision",
        stack: [
          "YOLOv8",
          "NeRF",
          "Three.js",
          "FastAPI",
          "Computer Vision",
        ],
        date: "Sep 2025",
        bullets: [
          "Trained YOLOv8 on a custom dataset of 22 medicinal plant species, achieving 91.8% mAP@0.5 and 82.4% mAP@0.5:0.95.",
          "Implemented Neural Radiance Fields for high-quality 3D reconstruction (SSIM 0.941) and built an interactive web viewer using Three.js.",
        ],
      },
    ],
    skills: [
      {
        name: "Languages",
        skills: ["TypeScript", "JavaScript", "Rust", "Java", "Python", "SQL"],
      },
      {
        name: "Backend",
        skills: [
          "Node.js",
          "NestJS",
          "Express.js",
          "REST APIs",
          "GraphQL",
          "gRPC",
          "Microservices",
          "Clean Architecture",
        ],
      },
      {
        name: "Database",
        skills: [
          "PostgreSQL",
          "Redis",
          "MongoDB",
          "Supabase",
          "Prisma",
          "Knex.js",
        ],
      },
      {
        name: "DevOps & Cloud",
        skills: [
          "AWS",
          "Docker",
          "GitHub Actions",
          "Bitbucket CI/CD",
          "Terraform",
          "Linux",
        ],
      },
      {
        name: "Frontend",
        skills: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        name: "Engineering",
        skills: [
          "System Design",
          "API Design",
          "Database Design",
          "Authentication",
          "OAuth 2.0",
          "Event-Driven Architecture",
          "Open Source",
          "Remote Collaboration (Slack, Notion, Linear, Zoom)",
        ],
      },
    ],
    achievements: [
      {
        title: "Publications",
        text: 'Published research work on "AI Based Medical Plant Detection and 3D Reconstruction (3D HerbVision)" — an end-to-end system using YOLOv8 (91.8% mAP@0.5) and Neural Radiance Fields for photorealistic 3D plant reconstruction.',
      },
      {
        title: "Product Launch",
        text: "Built & launched Orka (AI Financial OS) — 100+ real users, live on LaunchLlama, preparing a Product Hunt launch, and applied for Stellar ecosystem funding.",
      },
      {
        title: "Stellar Ecosystem",
        text: "Earned $250 from the Stellar ecosystem through builder programs and contributions (RiseIn, Build Station, etc.).",
      },
      {
        title: "Certifications",
        text: "OCI DevOps Professional, OCI Generative AI Professional, Machine Learning Specialization",
      },
    ],
  },
  {
    id: "blockchain",
    label: "Backend (Blockchain)",
    pdf: "/resume/Siddhartha-Resume-Blockchain.pdf",
    headline: "Blockchain & Full Stack Engineer — Founding Engineer",
    summary:
      "Backend & Full Stack Engineer focused on Stellar and Midnight. Shipped production dApps including Orka (100+ users), RemitFlow, and Wrangler (ZK feedback). Experienced in Soroban, Zero-Knowledge Proofs, NestJS, and Next.js. Open to remote Founding Engineer, Blockchain Developer, and DevRel roles.",
    projects: [
      {
        slug: "orka",
        title: "Orka",
        stack: [
          "Next.js 16",
          "TypeScript",
          "Rust",
          "PostgreSQL",
          "Supabase",
          "Stellar/Soroban",
        ],
        date: "Jun 2026",
        bullets: [
          "Built and launched a full-stack AI financial platform for agencies and freelancers covering proposals, contracts, milestones, escrow, and payments; reached 100+ real users and open-sourced the project on LaunchLlama.",
          "Designed the complete backend and database architecture supporting organizations, projects, clients, contracts, milestones, and financial transactions.",
        ],
      },
      {
        slug: "wrangler",
        title: "Wrangler",
        stack: [
          "Midnight Network",
          "Zero-Knowledge Proofs",
          "Compact",
          "Next.js",
          "TypeScript",
        ],
        date: "Jun 2026",
        bullets: [
          "Built a decentralized application on the Midnight Network that enables anonymous, mathematically verifiable feedback using Zero-Knowledge Proofs; implemented Compact smart contracts with ZK circuits for private authorization.",
          "Delivered a full Next.js frontend and wallet integration with a privacy model that keeps submitter identity completely private while making feedback publicly auditable.",
        ],
      },
      {
        slug: "remitflow",
        title: "RemitFlow",
        stack: ["Next.js 16", "Stellar", "Soroban", "TypeScript", "Tailwind CSS"],
        date: "Feb 2026",
        bullets: [
          "Developed a decentralized payment routing platform on Stellar that aggregates real-time rates from multiple anchors and automatically selects the lowest-cost corridor.",
          "Implemented Soroban smart contracts, Freighter wallet integration, and SEP-10 authentication.",
        ],
      },
      {
        slug: "3d-herbvision",
        title: "3D HerbVision",
        stack: ["YOLOv8", "NeRF", "Three.js", "FastAPI", "Computer Vision"],
        date: "Sep 2025",
        bullets: [
          "Built an AI system for medicinal plant detection (91.8% mAP@0.5) and photorealistic 3D reconstruction using Neural Radiance Fields.",
          "Shipped an interactive Three.js viewer for inspecting the reconstructed plants.",
        ],
      },
    ],
    skills: [
      {
        name: "Blockchain",
        skills: [
          "Stellar",
          "Soroban Smart Contracts",
          "Freighter Wallet",
          "SEP-10",
          "Anchors",
          "Cross-border Payments",
        ],
      },
      {
        name: "Languages",
        skills: ["TypeScript", "JavaScript", "Rust", "Java", "Python", "SQL"],
      },
      {
        name: "Backend",
        skills: [
          "Node.js",
          "NestJS",
          "Express.js",
          "GraphQL",
          "Microservices",
          "Clean Architecture",
        ],
      },
      {
        name: "Database",
        skills: [
          "PostgreSQL",
          "Redis",
          "MongoDB",
          "Supabase",
          "Prisma",
          "Knex.js",
        ],
      },
      {
        name: "DevOps & Cloud",
        skills: [
          "AWS",
          "Docker",
          "GitHub Actions",
          "Bitbucket CI/CD",
          "Terraform",
          "Linux",
        ],
      },
      {
        name: "Frontend",
        skills: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        name: "Engineering",
        skills: [
          "System Design",
          "API Design",
          "Smart Contract Integration",
          "Open Source",
        ],
      },
    ],
    achievements: [
      {
        title: "Publications",
        text: 'Published research work on "AI Based Medical Plant Detection and 3D Reconstruction (3D HerbVision)" — an end-to-end system using YOLOv8 (91.8% mAP@0.5) and Neural Radiance Fields.',
      },
      {
        title: "Product Launch",
        text: "Built & launched Orka (AI Financial OS) — 100+ real users, live on LaunchLlama, preparing Product Hunt launch, and applied for Stellar Community Funds.",
      },
      {
        title: "Stellar Ecosystem",
        text: "Earned $250 from the Stellar ecosystem through builder programs and contributions (RiseIn, Build Station, etc.).",
      },
      {
        title: "Certifications",
        text: "OCI DevOps Professional, OCI Generative AI Professional, Machine Learning Specialization",
      },
    ],
  },
];