export const personalInfo = {
    name: "Sohan Kusuma",
    initials: "SK",
    title: "Data Analyst • Machine Learning Engineer • Business Analyst",
    tagline: "Turning Data Into",
    taglineHighlight: "Decisions",
    subtitle:
        "I'm Sohan Kusuma, a Data Analyst & ML Engineer dedicated to transforming raw data into powerful insights and intelligent systems.",
    email: "sohankusumaukjobs@gmail.com",
    phone: "+44 7310 021889",
    location: "London, England, UK",
    linkedin: "https://www.linkedin.com/in/sohan-kusuma-a00048348",
    github: "https://github.com/sohankusumaukjobs",
    responseTime: "I'll respond within 24 hours.",
};

export const codeSnippet = [
    "const analyst = {",
    "  name: 'Sohan Kusuma',",
    "  focus: 'Data & ML Engineering',",
    "  skills: ['Python', 'Power BI', 'TensorFlow'],",
    "  passionate: true,",
    '  motto: "Data Tells Stories",',
    "};",
    "",
    "analyst.buildInsights();",
];

export const professionalSummary =
    "Data Analytics and Machine Learning graduate with hands-on experience in Python, SQL, and deep learning. Proven ability to process large datasets, perform rigorous exploratory data analysis (EDA), and deliver actionable insights. Recently certified in applying Generative AI to analytics workflows for SQL refinement, automation, and productivity improvements.";

export interface Experience {
    title: string;
    role: string;
    date: string;
    bullets: string[];
}

export const experiences: Experience[] = [
    {
        title: "Wildfire Detection System",
        role: "Data & ML Engineer",
        date: "2024 – 2025",
        bullets: [
            "Built an end-to-end ML pipeline for early wildfire detection using DenseNet-based CNNs (TensorFlow/Keras) on 2,700+ high-resolution images.",
            "Addressed class imbalance and brightness variation using augmentation and Multi-Scale Retinex preprocessing.",
            "Achieved 98.84% accuracy vs baseline; applied GridSearchCV and cross-validation for robustness.",
            "Visualised performance with Matplotlib/Seaborn and presented results to stakeholders.",
            "Used Generative AI tools to assist EDA, refine SQL queries, debug code snippets, and document workflows.",
        ],
    },
    {
        title: "Deloitte Australia",
        role: "Data Analyst (Job Simulation)",
        date: "Feb 2026",
        bullets: [
            "Completed a Deloitte job simulation involving data analysis and forensic technology.",
            "Created a data dashboard using Tableau to surface actionable insights.",
            "Used Excel to classify data and draw strategic business conclusions.",
        ],
    },
    {
        title: "BCG",
        role: "GenAI Developer (Job Simulation)",
        date: "Feb 2026",
        bullets: [
            "Built an AI-powered financial chatbot for BCG's GenAI Consulting team.",
            "Used Python (pandas) to manipulate and interpret complex financial data from 10-K and 10-Q reports.",
            "Applied rule-based logic to deliver user-friendly financial insights and analysis.",
        ],
    },
    {
        title: "Datacom",
        role: "Software Developer (Job Simulation)",
        date: "Feb 2026",
        bullets: [
            "Reviewed and improved a live web application; planned future feature roadmap.",
            "Identified root causes of bugs and implemented fixes to improve application stability.",
        ],
    },
    {
        title: "EDA & Dashboarding",
        role: "Data Analyst (Academic)",
        date: "",
        bullets: [
            "Built interactive Power BI dashboards (DAX, data modelling) to surface KPIs and region-based trends.",
            "Ran reproducible ML experiments using Scikit-learn; applied feature engineering and model selection best practices.",
        ],
    },
];

export interface TechCategory {
    category: string;
    items: string[];
}

export const techStack: TechCategory[] = [
    { category: "Languages", items: ["Python", "SQL", "Java", "C++", "React", "Node.js", "HTML"] },
    { category: "Data & BI", items: ["Power BI", "Tableau", "Excel", "Pandas", "NumPy"] },
    { category: "Machine Learning", items: ["TensorFlow", "Keras", "Scikit-learn", "CNN", "DenseNet"] },
    { category: "Cloud & Databases", items: ["AWS S3", "Microsoft Azure", "Snowflake", "Cloud Storage"] },
    { category: "GenAI & Automation", items: ["GPT Codex", "Claude", "Gemini", "Prompt Engineering", "Lovable"] },
    { category: "DevOps & Tools", items: ["Git", "Jupyter Notebook", "VS Code", "Anaconda"] },
];

export interface Project {
    title: string;
    description: string;
    tags: string[];
    badge?: string;
}

export const projects: Project[] = [
    {
        title: "Wildfire Detection System",
        description:
            "An end-to-end deep learning pipeline for early wildfire detection using DenseNet-based CNNs trained on 2,700+ high-resolution images. Achieved 98.84% accuracy with augmentation, Multi-Scale Retinex preprocessing, and GridSearchCV optimization. Results visualized with Matplotlib/Seaborn.",
        tags: ["Python", "TensorFlow", "Keras", "DenseNet", "CNN", "Scikit-learn", "Matplotlib"],
        badge: "Featured · Distinction",
    },
    {
        title: "AI Financial Chatbot (BCG GenAI Simulation)",
        description:
            "An AI-powered financial chatbot built for BCG's GenAI consulting team. Parses 10-K and 10-Q financial reports using Python and pandas, applying rule-based logic to deliver clear, user-friendly financial insights.",
        tags: ["Python", "Pandas", "GenAI", "Rule-Based Logic", "Financial Analysis"],
    },
    {
        title: "Deloitte Forensic Data Dashboard",
        description:
            "A Tableau dashboard built for a Deloitte forensic data analysis simulation. Used Excel-based data classification to surface critical insights and support strategic business decision-making.",
        tags: ["Tableau", "Excel", "Data Analysis", "Forensic Technology", "Power BI"],
    },
    {
        title: "Power BI KPI Dashboards (Academic)",
        description:
            "Interactive Power BI dashboards built with DAX and advanced data modelling to surface regional KPIs and business trends. Integrated reproducible ML experiments using Scikit-learn for end-to-end analytics delivery.",
        tags: ["Power BI", "DAX", "Scikit-learn", "Feature Engineering", "Excel"],
    },
];

export interface Certification {
    name: string;
    issuer: string;
    date: string;
}

export const certifications: Certification[] = [
    { name: "Deloitte Data Analytics Simulation", issuer: "Forage", date: "Feb 2026" },
    { name: "Datacom Software Dev Simulation", issuer: "Forage", date: "Feb 2026" },
    { name: "ChatGPT GenAI for Data Analytics", issuer: "Maven Analytics", date: "Feb 2026" },
    { name: "AWS S3 Basics", issuer: "Coursera", date: "Feb 2026" },
    { name: "Microsoft Power BI Essentials", issuer: "Udemy", date: "Jan 2026" },
    { name: "Cybersecurity Essentials", issuer: "Cisco", date: "2021" },
    { name: "Data Science & ML", issuer: "NIELIT", date: "2021" },
];

export interface Education {
    degree: string;
    institution: string;
    period: string;
    grade: string;
}

export const education: Education[] = [
    {
        degree: "MSc Computer Science",
        institution: "University of Hertfordshire, UK",
        period: "Jan 2024 – Jul 2025",
        grade: "Distinction ⭐",
    },
    {
        degree: "B.Tech Electronics & Instrumentation Engineering",
        institution: "Kakatiya Institute of Technology & Science, India",
        period: "2019 – 2023",
        grade: "GPA 7.5",
    },
];

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];
