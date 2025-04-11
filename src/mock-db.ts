import { UserConfig } from "./lib/types/user.types";

const users: UserConfig[] = [
  {
    id: "1",
    name: "Amir Meisner",
    contactInfo: {
      email: "amirm363@gmail.com",
      phone: "052-473313",
      address: "Israel",
      city: "Netanya",
      state: "IL",
      zip: "12345",
    },
    socialLinks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/amir-meisner/",
        icon: "linkedin",
      },
      {
        name: "GitHub",
        url: "https://github.com/amir-meisner",
        icon: "github",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/amir.meisner",
        icon: "facebook",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/amir_meisner/",
        icon: "instagram",
      },
    ],
    profilePicture: "/images/profile-pic.png",
    bio: "I am a full stack developer with a passion for building scalable and efficient web applications.",
    skills: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Next.js",
        icon: "nextjs",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "TypeScript",
        icon: "typescript",
      },
      {
        name: "Python",
        icon: "python",
      },
      {
        name: "Docker",
        icon: "docker",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwindcss",
      },
      {
        name: "PostgreSQL",
        icon: "postgresql",
      },
      {
        name: "MongoDB",
        icon: "mongodb",
      },
      {
        name: "Git",
        icon: "git",
      },
      {
        name: "GCP",
        icon: "gcp",
      },
    ],
    projects: [
      {
        name: "Sharona Nails",
        description: "Sharona Nails is an AI-powered CRM for a nail salon.",
        image: "/images/project-1.png",
        url: "https://sharona-nails.vercel.app/",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        name: "AIT-well",
        description: "AIT-well is a platform for AI-powered wellness.",
        image: "/images/project-2.png",
        url: "https://project1.com",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
    ],
    experience: [
      {
        company: "Unichat",
        position: "Full-Stack & R&D Developer",
        startDate: "2023-06-01",
        endDate: "Present",
        description: [
          "Designed, developed, and maintained multiple AI-powered systems",
          "Built an AI-driven multi-chat platform, enabling users to interact with multiple AI models seamlessly",
          "Automated SEO agent system, generating high-quality content to enhance website rankings",
          "Managed and scaled a distributed microservices architecture (Node.js & Python), ensuring efficient system operations",
          "Researched and integrated cutting-edge AI models, optimizing automation and decision-making processes",
          "Implemented cloud-based infrastructure using GCP, ensuring scalability and reliability",
        ],
      },
      {
        company: "DeePlan",
        position: "Full-Stack Developer",
        startDate: "2022-04-01",
        endDate: "2023-06-01",
        description: [
          "Developed enterprise-level management systems, enabling companies to streamline internal processes",
          "Created custom organizational employee portals, improving data accessibility and workflow automation",
          "Provided continuous technical support and optimizations, ensuring smooth system operations",
        ],
      },
    ],
    navigationLinks: [
      {
        name: "About",
        url: "about",
      },
      {
        name: "Projects",
        url: "projects",
      },
      {
        name: "Experience",
        url: "experience",
      },
      {
        name: "Contact",
        url: "contact",
      },
    ],
  },
];

const getUserConfig = async (id: string): Promise<UserConfig | undefined> => {
  return users.find((user) => user.id === id);
};

export { getUserConfig };
