from app.models.schemas import Bio, Experience, Project, Skill, Certification

# --- Source of Truth: Data extracted from User Screenshots ---

PROFILE_DATA = Bio(
    name="Anurag Kumar Singh",
    title="Software Developer",
    bio="Backend Engineer specialized in architecting fault-tolerant, high-performance distributed systems. Currently at Vetic, designing secure financial pipelines and multi-level caching strategies. Passionate about System Design, Cloud Architecture, and the Python ecosystem.",
    location="New Delhi, India",
    learning_goals="Currently mastering: AWS Cloud Architecture (Lambda, EC2), System Design Patterns (Circuit Breaker, Rate Limiting), and Microservices.",
    social_links={
        "github": "https://github.com/Anurag-6799", 
        "linkedin": "https://www.linkedin.com/in/anurag-kumar-singh-ba30/" 
    },
    education="B.Tech | Netaji Subhas University of Technology (NSUT) | 2020-2024"
)

EXPERIENCE_DATA = [
    Experience(
        id=1,
        company="Vetic",
        role="SDE",
        duration="May 2025 - Present",
        description=[
            "Engineered a secure financial transaction system using FastAPI that successfully manages the entire lifecycle of invoices and returns, safeguarding critical business data.",
            "Enhanced the user experience for the teleconsultation service by implementing key features like automated reminders and dynamic links.",
            "Architected and implemented a high-performance discount and coupon engine using a dynamic, multi-level Redis caching strategy to optimize real-time cart calculations.",
            "Improved platform stability by authoring and deploying scripts to manage and correct a legacy inventory database."
        ]
    ),
    Experience(
        id=2,
        company="Ajna Capital",
        role="Full Stack Developer (Intern)",
        duration="Apr 2024 - Sep 2024",
        description=[
            "Collaborated with cross-functional teams to build an e-commerce platform using JavaScript, Node.js, and SQL.",
            "Improved application stability by developing and executing comprehensive test cases for both functional and regression testing.",
            "Reduced platform error rates by 20% by conducting thorough cross-browser testing to ensure compatibility."
        ]
    ),
    Experience(
        id=3,
        company="Coding Blocks",
        role="Python Instructor (Intern)",
        duration="Dec 2023 - Feb 2024",
        description=[
             "Taught Python programming concepts."
        ]
    ),
    Experience(
        id=4,
        company="Dr. Baba Sahib Ambedkar Medical College",
        role="Lab Intern",
        duration="Jun 2023 - Aug 2023",
        description=[
            "Microbiology Lab Intern."
        ]
    )
]

PROJECTS_DATA = [
     Project(
        id=6,
        title="Enterprise Resource Planning (ERP) System",
        tech_stack=["Node.js", "Express.js", "MongoDB", "Next.js"],
        description="Deployed a production-grade HRMS supporting 50+ employees for daily operations including attendance and leave management, achieving zero downtime.",
        features=[
            "50+ Employees Support (Zero Downtime)",
            "User Hierarchy Workflows & RBAC",
            "Bulk-processing for 1000+ records"
        ],
        date="2025",
        github_link="https://github.com/Chilli3012"
    ),
     Project(
        id=1,
        title="Note App",
        tech_stack=["MERN", "JWT", "Tailwind CSS"],
        description="Full-stack MERN application for creating, editing, and managing notes.",
        features=["User authentication (JWT)", "Secure API endpoints (Express, MongoDB)", "Responsive React.js frontend"],
        date="Feb 2025 - Feb 2025",
        github_link="https://github.com/Chilli3012"
    ),
    Project(
        id=2,
        title="Car Rental",
        tech_stack=["PHP", "MySQL", "HTML/CSS"],
        description="Full stack responsive website simulating a platform that can manage up to 50 user accounts and car bookings.",
        features=["Car booking features", "Showcasing system ability to handle multiple transactions", "User registration and authentication"],
        date="Mar 2024 - Mar 2024",
        github_link="https://github.com/Chilli3012/Car-Rental"
    ),
    Project(
        id=3,
        title="Weather Forecasting Website",
        tech_stack=["React.js", "Bootstrap", "OpenWeatherAPI"],
        description="Live weather forecasting website designed to handle multiple API requests per second efficiently.",
        features=["Live API integration", "Autocomplete search feature for cities", "Comprehensive test plans"],
        date="May 2023 - May 2023",
        github_link="https://github.com/Chilli3012/Weather-App"
    ),
    Project(
        id=4,
        title="E-commerce Website (Front-end)",
        tech_stack=["HTML", "CSS", "Bootstrap", "JavaScript"],
        description="Responsive front-end e-commerce website featuring dynamic product listings and a modern UI.",
        features=["Dynamic product listings", "Interactive components", "Optimized for desktop browsers"],
        date="Feb 2023 - Feb 2023",
        github_link="https://github.com/Chilli3012/E-Commerce-front-end"
    ),
     Project(
        id=5,
        title="Real Time Face Recognition",
        tech_stack=["Python", "HaarCascades", "KNN"],
        description="Generated training data set of images to build a classifier to recognize faces.",
        features=["Extracted faces from live video", "HaarCascades Classifier", "KNN algorithm"],
        date="Jun 2022 - Jun 2022",
        github_link="https://github.com/Chilli3012"
    )
]

SKILLS_DATA = [
    # Languages
    Skill(name="Python", category="Languages"),
    Skill(name="C++", category="Languages"),
    Skill(name="JavaScript", category="Languages"),

    # Backend
    Skill(name="FastAPI", category="Backend"),
    Skill(name="Django", category="Backend"),
    Skill(name="Node.js", category="Backend"),
    Skill(name="Express.js", category="Backend"),

    # Database
    Skill(name="MongoDB (Aggregation Pipelines)", category="Database"),
    Skill(name="PostgreSQL", category="Database"),
    Skill(name="Redis (L1/L2 Caching strategies)", category="Database"),

    # Frontend
    Skill(name="React.js", category="Frontend"),
    Skill(name="Tailwind CSS", category="Frontend"),
    Skill(name="Bootstrap", category="Frontend"),

    # DevOps
    Skill(name="Docker", category="DevOps"),
    Skill(name="Git", category="DevOps"),
    Skill(name="GitHub Actions", category="DevOps"),
    Skill(name="Linux", category="DevOps"),
    Skill(name="CI/CD", category="DevOps"),

    # Cloud
    Skill(name="AWS", category="Cloud"),

    # Architecture (Core Concepts)
    Skill(name="System Design", category="Architecture"),
    Skill(name="Microservices", category="Architecture"),
    Skill(name="RESTful APIs", category="Architecture"),
    Skill(name="Data Structures & Algorithms", category="Architecture"),
    Skill(name="OOPS", category="Architecture")
]

CERTIFICATIONS_DATA = [
    Certification(name="Foundation of Machine Learning", issuer="IIIT Hyderabad", date="Jul 2022", credential_link="#"),
    Certification(name="CodeChef SnackDown 2021", issuer="CodeChef", date="Dec 2021", credential_link="#"),
    Certification(name="Cracked Leaked Password Database", issuer="Goldman Sachs", date="Sep 2021", credential_link="#"),
    Certification(name="Applied Data Science with Python", issuer="IIT Roorkee", date="Aug 2021", credential_link="#"),
    Certification(name="Data Structures and Algorithms in C++", issuer="Coding Blocks", date="Jul 2021", credential_link="#")
]
