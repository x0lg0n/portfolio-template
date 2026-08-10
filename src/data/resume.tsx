import { Icons, type IconProps } from "@/components/icons";
import {
  HomeIcon,
  NotebookIcon,
  type LucideIcon,
} from "lucide-react";
import {
  SiDocker,
  SiGit,
  SiGo,
  SiKubernetes,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type IconComponent = (props: IconProps) => React.ReactNode;

export interface SocialLink {
  name: string;
  url: string;
  icon: IconComponent;
  navbar?: boolean;
}

export interface Contact {
  email: string;
  tel: string;
  formEndpoint: string;
  meeting: { calUsername: string };
  social: Record<string, SocialLink>;
}

export interface WorkExperience {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  image?: string;
  start: string;
  end: string | null;
  description: string;
}

export interface Education {
  school: string;
  href: string;
  degree: string;
  branch?: string;
  location?: string;
  logoUrl: string;
  start: string;
  end: string;
  tags?: string[];
}

export interface Contribution {
  repo: string;
  number: number;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface TweetItem {
  id: string;
}

export interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

export interface Data {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  coordinates?: string;
  githubUsername: string;
  description: string;
  building: { name: string; href: string; description: string };
  summary: string;
  avatarUrl: string;
  avatarGifUrl?: string;
  qrCodeUrl?: string;
  skills: { name: string; icon: IconComponent }[];
  navbar: NavItem[];
  contact: Contact;
  testimonials: Testimonial[];
  tweets: TweetItem[];
  work: WorkExperience[];
  education: Education[];
  contributions: Contribution[];
}

export const DATA: Data = {
  name: "Siddhartha Kunwar",
  initials: "SK",
  url: "https://x0lg0n.tech",
  location: "Delhi, India",
  locationLink:
    "https://www.google.com/maps/place/Connaught+Place,+New+Delhi,+Delhi+110001,+India/@28.6289016,77.2049872,15z/data=!3m1!4b1!4m6!3m5!1s0x390cfd37b741d057:0xcdee88e47393c3f1!8m2!3d28.6304203!4d77.2177216!16zL20vMDR4eDB4?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D",
  coordinates: "28.6289016° N, 77.2049872° E",
  githubUsername: "x0lg0n",
  description:
    "Software Engineer. I build things for the web and love turning ideas into products.",
  building: {
    name: "Orka",
    href: "https://orkahq.vercel.app/",
    description:
      "The AI-powered financial operating system for freelancers, agencies, and service businesses, powered by Stellar — ship invoices, track payments, and get AI-driven financial insights from one dashboard.",
  },
  summary:
    "Currently leading frontend and product work on [Orka](https://orkahq.vercel.app/) — an AI-powered financial operating system for freelancers and agencies on [Stellar](https://stellar.org/) ([Genesis-360](https://github.com/Genesis-360)). I also contribute to [Oreenza](https://oreenza.com/), shipping high-performance client websites for real businesses.\n I’ve built payment routers, zero-knowledge apps, real-time systems, and full-stack platforms. Open-source contributor ([GSSoC 2024,2025 & 2026](https://gssoc.girlscript.org/)), build-in-public developer, and currently exploring system design & Blockchain Developement — check out my [projects](/work), [blog](/blog) and [resume](/resume) to see what I've been shipping. Feel free to [shoot me an email](mailto:kumarsiddharthakain@gmail.com) if you'd like to chat!",
  avatarUrl: "/me.jpg",
  avatarGifUrl: "",
  qrCodeUrl: "/qr-code.png",
  skills: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Python", icon: SiPython },
    { name: "Go", icon: SiGo },
    { name: "Postgres", icon: SiPostgresql },
    { name: "Docker", icon: SiDocker },
    { name: "Kubernetes", icon: SiKubernetes },
    { name: "Java", icon: SiOpenjdk },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Prisma", icon: SiPrisma },
    { name: "Git", icon: SiGit },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "kumarsiddharthakain@gmail.com",
    tel: "+91 9354481754",
    formEndpoint: "https://formspree.io/f/your-form-id",
    meeting: { calUsername: "x0lg0n" },
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/x0lg0n",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/siddhartha-kunwar",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/x0lg0n",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@siddhartha.builds",
        icon: Icons.youtube,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "RiseIn",
      href: "https://risein.com",
      badges: [
        "React",
        "Next.js",
        "TypeScript",
        "Stellar SDK",
        "PostgreSQL",
        "Midnight SDK",
        "Tailwind CSS",
        "Wallets",
        "Sroban",
      ],
      location: "Remote",
      title: "Software Developer - Stellar & Midnight Programs",
      logoUrl: "/images/logos/risein.png",
      start: "Jan 2026",
      end: "Present",
      description:
        "Built and shipped multiple full-stack products including [Orka](https://orkahq.vercel.app/) (AI Financial OS with 100+ real users), [RemitFlow](https://rmtflow.vercel.app/), and [Wrangler](https://wrangler-midnight.vercel.app/). Owned end-to-end development — from backend architecture and APIs to frontend and product launch — during the [Stellar](https://stellar.org/) Journey to Mastery and [Midnight](https://midnight.network/) programs.",
    },
    {
      company: "Contra",
      href: "https://contra.com",
      badges: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      location: "Remote",
      title: "Freelance Developer",
      logoUrl: "/images/logos/contra.png",
      start: "Apr 2023",
      end: "Present",
      description:
        "Delivered web projects for clients including landing pages, dashboards, and full-stack applications. Focused on clean UI, performant frontend, and reliable backend implementations.",
    },
    {
      company: "Sen4a Recruiters",
      href: "https://www.sen4a-recruiters.com/",
      badges: ["NestJS", "GraphQL", "PostgreSQL", "Microservices", "Docker"],
      location: "Remote | Tokyo, Japan",
      title: "Backend Developer Intern",
      logoUrl: "/images/logos/sen4a.jpg",
      start: "Mar 2025",
      end: "Jun 2025",
      description:
        "Designed and built scalable NestJS microservices and GraphQL APIs for a recruitment platform. Optimized complex queries and improved backend performance and reliability for production workflows.",
    },
    {
      company: "Ceeras",
      href: "https://ceeras.com",
      badges: [
        "Penetration Testing",
        "OWASP",
        "Burp Suite",
        "Vulnerability Assessment",
      ],
      location: "Remote | India",
      title: "Cyber Security Intern",
      logoUrl: "/images/logos/ceeras.jpg",
      start: "Feb 2025",
      end: "Jun 2025",
      description:
        "Conducted penetration testing and security assessments, prepared detailed vulnerability reports, and helped implement remediations for client systems.",
    },
    {
      company: "Edunet Foundation",
      href: "https://edunetfoundation.org",
      badges: [
        "Reconnaissance",
        "Enumeration",
        "Vulnerability Scanning",
        "Kali Linux",
      ],
      location: "Remote | India",
      title: "Cyber Security Intern",
      logoUrl: "/images/logos/edunet.jpg",
      start: "Jan 2025",
      end: "Feb 2025",
      description:
        "Gained hands-on experience in offensive security fundamentals including reconnaissance, enumeration, and vulnerability scanning through practical lab environments.",
    },
    {
      company: "Asterics Compute",
      href: "https://edunetfoundation.org",
      badges: ["Node.js", "Microservices", "AWS", "Docker", "Load Balancing"],
      location: "Remote | Arunachal Pradesh, India",
      title: "Software Developer Intern",
      logoUrl: "/images/logos/asterics.jpg",
      start: "Nov 2024",
      end: "Jan 2025",
      description:
        "Developed and maintained a containerized Node.js microservices architecture on AWS for a production ticketing system, improving reliability and reducing response times through load balancing and database optimization.",
    },
  ],
  education: [
    {
      school: "Abdul Kalam Technical University",
      href: "https://aktu.ac.in/",
      degree: "Bachelor of Technology",
      branch: "Artificial Intelligence and Machine Learning",
      location: "Lucknow, India",
      logoUrl: "/images/logos/aktu.png",
      start: "2022",
      end: "2026",
      tags: ["AI/ML", "Deep Learning", "Python"],
    },
    {
      school: "Guru Harkrishan Public School",
      href: "https://ghpsloniroad.in/",
      degree: "Higher Secondary Education",
      branch: "Science Stream (PCM)",
      location: "Delhi, India",
      logoUrl: "/images/logos/ghps.jpg",
      start: "2019",
      end: "2021",
      tags: ["PCM", "Science"],
    },
    {
      school: "Guru Harkrishan Public School",
      href: "https://ghpsloniroad.in/",
      degree: "Secondary Education",
      branch: "Science Stream",
      location: "Delhi, India",
      logoUrl: "/images/logos/ghps.jpg",
      start: "2017",
      end: "2019",
    },
  ],
  contributions: [
    { repo: "Genesis-360/Orka", number: 37 }, // Project detail (Activity + Proposals + Timeline)
    { repo: "Genesis-360/Orka", number: 40 }, // Design system + shell + onboarding + RLS
    { repo: "Genesis-360/Orka", number: 41 }, // Blog
    { repo: "Genesis-360/Orka", number: 46 }, // Dev landing
    { repo: "Genesis-360/Orka", number: 45 }, // Documentation
    { repo: "Genesis-360/Orka", number: 14 }, // Auth
    { repo: "warpdotdev/warp", number: 9195 }, // Issue (not PR)
  ],
  testimonials: [
    {
      name: "Aditi Rao",
      role: "Engineering Manager, Fintech Startup",
      content:
        "Siddhartha delivers production-grade code with an eye for detail. He turns vague requirements into clean, performant features and communicates clearly throughout.",
    },
    {
      name: "Karan Joshi",
      role: "Founder, SaaS Company",
      content:
        "Working with Siddhartha felt like having a senior engineer who just gets it. Fast, reliable, and genuinely invested in the product outcome.",
    },
    {
      name: "Meera Iyer",
      role: "Product Designer, Design Studio",
      content:
        "Siddhartha is the rare developer who respects the design system. Pixel-perfect implementations, smooth animations, and zero context-switching friction.",
    },
  ],
  tweets: [
    {
      id: "2078530144629829949",
    },
    {
      id: "2082133812058996984",
    },
    {
      id: "2032831202558607842",
    },
    {
      id: "2075649352677388651",
    },
  ],
};
