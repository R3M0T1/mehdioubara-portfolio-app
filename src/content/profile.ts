export const skillGroups = {
  languages: [
    "Python",
    "Java",
    "C#",
    "C++",
    "Go",
    "PHP",
    "TypeScript",
    "JavaScript",
  ],
  frameworks: [
    ".NET",
    "Laravel",
    "Django",
    "FastAPI",
    "Node.js",
    "Vue.js",
    "React.js",
    "Nuxt.js",
  ],
  databases: ["PostgreSQL", "MongoDB", "MySQL", "MariaDB"],
  tools: [
    "Docker",
    "Azure",
    "AWS",
    "Oracle Cloud",
    "GitHub Actions",
    "GNS3",
    "WebSocket",
  ],
} as const;

export type RoleFocus = "all" | "backend" | "web3" | "fullstack" | "devops";

export const roleTones = {
  all: "purple",
  backend: "blue",
  web3: "mint",
  fullstack: "pink",
  devops: "orange",
} as const;

export const contact = {
  email: "oubara.mehdi@gmail.com",
  phone: "+212 657-162581",
  linkedinUrl: "https://www.linkedin.com/in/mehdi-oubara",
  linkedinLabel: "linkedin.com/in/mehdi-oubara",
} as const;
