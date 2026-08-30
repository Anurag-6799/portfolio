from app.models.schemas import Bio, Experience, Project, Skill, Certification

# --- Source of Truth for the whole site. Edit here, nowhere else. ---
# Convention: every Experience.description entry is "Workstream: what I built".
# The frontend bolds the part before the first colon.

PROFILE_DATA = Bio(
    name="Anurag Kumar Singh",
    title="Backend Engineer",
    bio=(
        "Backend engineer building high-throughput distributed systems in Python. At Vetic I work across a "
        "multi-service platform for veterinary clinics - designing REST APIs, modelling data in PostgreSQL and "
        "MongoDB, and using Redis for the hard parts: distributed locks, idempotency and caching. Most of what "
        "I enjoy sits at the seams of a system: where two services disagree about the same record, where a "
        "retry silently double-charges someone, where a cron quietly stops producing slots at 4am."
    ),
    location="Gurugram, India",
    learning_goals=(
        "Distributed systems patterns (idempotency keys, outbox, backpressure), AWS architecture, "
        "and Postgres/MongoDB performance work at scale."
    ),
    social_links={
        "github": "https://github.com/Anurag-6799",
        "linkedin": "https://www.linkedin.com/in/anurag-kumar-singh-ba30/",
        "email": "mailto:singhanurag6799@gmail.com",
    },
    education="B.Tech, Biotechnology | Netaji Subhas University of Technology (NSUT), New Delhi | 2020-2024",
)

EXPERIENCE_DATA = [
    Experience(
        id=1,
        company="Vetic",
        role="Backend Developer (SDE-1)",
        location="Gurugram, India",
        duration="May 2025 - Present",
        tech=[
            "Python", "Django REST Framework", "FastAPI", "PostgreSQL",
            "MongoDB", "Redis", "RabbitMQ", "Docker",
        ],
        description=[
            "SAP ERP Integration: Architected a strictly validated, multi-state Purchase Order workflow API in "
            "Django REST Framework that orchestrates the full PO lifecycle - draft, approval, amendment and "
            "closure - before anything is handed to the enterprise SAP system. Invalid state transitions are "
            "rejected at the boundary rather than discovered downstream in finance.",

            "Idempotent Transaction Gateway: Built the write path on Redis distributed locks so a retried or "
            "duplicated request can never create a second financial record, holding across 10,000+ monthly "
            "transactions. Paired it with a rollback framework that snapshots 100% of pre-mutation state, so any "
            "partially applied sync can be replayed or reversed with a full audit trail.",

            "Latency Optimisation: Replaced sequential outbound SAP calls with concurrent I/O, cutting ingestion "
            "time for large multi-line payloads from minutes to seconds without loosening validation.",

            "Cart & Promotion Engine: Designed a cart-level coupon grant system (FastAPI + MongoDB) that unified "
            "discounting across in-clinic and home-delivery carts. A single atomic grant per user, coupon and "
            "order moment ended double-consumption of usage limits, distributes proportional per-item discount "
            "shares to both carts, and only reverts a coupon when the last remaining leg is cancelled. Shipped "
            "with 35 unit tests covering the concurrency and revert paths.",

            "Real-Time Cart Consistency: Built an event-driven pipeline keeping primary and mirror carts in sync, "
            "batching multi-item updates into MongoDB bulk writes to cut round trips and adding concurrency "
            "safeguards that prevent overselling when two writers touch the same cart.",

            "Fault Tolerance: Added graceful degradation from Redis to persistent MongoDB storage when the cache "
            "layer is unreachable, so a cache outage becomes a latency event instead of an outage - sustaining "
            "99.99% API availability.",

            "Scheduling & Allocation: Extended the video-consultation slot engine and its doctor-ranking cron, "
            "which re-scores doctors every six hours on completion rate, show rate and medicine-attach AOV. "
            "Root-caused timezone and capacity defects that were silently starving overnight booking slots - the "
            "kind of bug that produces no errors, just an empty calendar.",

            "Zero-Downtime Data Migration: Drove a taxonomy migration from a many-to-many join table to a "
            "one-to-many foreign key across 11 services. Wrote the backfill and backup/restore tooling, verified "
            "the mapping against a production snapshot before cutover, and shipped a flag-driven HTTP 503 "
            "maintenance freeze over 70 write endpoints so no write could land mid-migration.",

            "Impact Analysis: Measured what the allocation features actually earned, using MongoDB aggregation "
            "pipelines and SQL over millions of invoice line items. Applied a difference-in-differences read to "
            "separate genuine incremental lift from ordinary product ramp - which corrected an earlier estimate "
            "that was several times too optimistic.",
        ],
    ),
    Experience(
        id=2,
        company="Ajna Capital",
        role="Full Stack Developer (Intern)",
        location="Chandigarh, India",
        duration="Apr 2024 - Sep 2024",
        tech=["Node.js", "Express.js", "JavaScript", "SQL"],
        description=[
            "Backend Performance: Profiled and refactored bottleneck Node.js/Express endpoints on an e-commerce "
            "platform, adding targeted database indexes that reduced server response times by 30% on user-facing "
            "features.",

            "Schema Design: Redesigned and normalised SQL schemas for product inventory and order history, "
            "removing redundancy that had been forcing expensive joins on every catalogue read.",

            "Quality: Wrote functional and regression test cases and ran cross-browser verification, cutting "
            "platform error rates by 20%.",
        ],
    ),
    Experience(
        id=3,
        company="Coding Blocks",
        role="Python Instructor (Intern)",
        location="Remote",
        duration="Dec 2023 - Feb 2024",
        tech=["Python", "Data Structures", "Algorithms"],
        description=[
            "Teaching: Taught Python fundamentals, data structures and problem-solving to beginner cohorts, and "
            "reviewed student code - which is still the fastest way I have found to learn to explain a system "
            "simply.",
        ],
    ),
]

PROJECTS_DATA = [
    Project(
        id=1,
        title="SheetBase - Sheets to API Platform",
        tech_stack=["Python", "FastAPI", "PostgreSQL", "Redis", "OAuth2", "Alembic"],
        description=(
            "A Backend-as-a-Service that turns any Google Sheet into a secured, low-latency REST endpoint - so a "
            "non-technical team can keep editing a spreadsheet while the product reads it as a real API."
        ),
        features=[
            "Google OAuth2 flow with Fernet-encrypted refresh tokens",
            "Cache-aside Redis layer: ~600ms reads to under 20ms",
            "Write-time invalidation keeps cached rows honest",
            "Async stack: asyncpg + Alembic migrations",
            "Layered api / services / db architecture",
        ],
        date="2026",
        github_link="https://github.com/Anurag-6799/SheetBase_backend",
    ),
    Project(
        id=2,
        title="Redis Radar - VS Code Extension",
        tech_stack=["TypeScript", "Node.js", "Redis", "VS Code API"],
        description=(
            "An open-source Redis client that lives inside VS Code, so inspecting a key does not mean leaving the "
            "editor for a separate GUI or a redis-cli tab."
        ),
        features=[
            "Multi-profile connection management (local + remote)",
            "Glob key search and JSON pretty-printing",
            "TTL, type and size inspection at a glance",
            "Lazy-loading tree stays responsive on 1000s of keys",
            "Flush and delete actions with MIT licence",
        ],
        date="2026",
        github_link="https://github.com/Anurag-6799/Redis-Radar",
    ),
    Project(
        id=3,
        title="Corporate Expense Tracker",
        tech_stack=["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT"],
        description=(
            "A role-based expense approval API modelling the boring-but-easy-to-get-wrong parts: who may edit "
            "what, and which state transitions are legal."
        ),
        features=[
            "RBAC across employee / manager / admin roles",
            "JWT authentication with bcrypt password hashing",
            "pending -> approved / rejected state machine",
            "Ownership checks: no editing an already-approved claim",
            "Fixed-precision currency columns, no float rounding",
        ],
        date="2026",
        github_link="https://github.com/Anurag-6799/Corporate-Expense-Tracker",
    ),
    Project(
        id=4,
        title="Blog API",
        tech_stack=["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "OAuth2"],
        description=(
            "A clean-architecture blogging backend built to get the auth layer right: OAuth2 password flow, JWT "
            "issuance, and authorisation pushed into a reusable dependency instead of copy-pasted per route."
        ),
        features=[
            "OAuth2 + JWT auth as an injectable dependency",
            "Full CRUD with per-author authorisation on edit/delete",
            "Pydantic request/response validation",
            "Layered api / services / db separation",
        ],
        date="2026",
        github_link="https://github.com/Anurag-6799/Blog",
    ),
    Project(
        id=5,
        title="This Portfolio",
        tech_stack=["React", "Vite", "Tailwind CSS", "FastAPI", "Framer Motion"],
        description=(
            "The site you are reading. A FastAPI backend serves every section as JSON, so updating my experience "
            "is a data change rather than a frontend rewrite."
        ),
        features=[
            "FastAPI backend with Pydantic-validated content models",
            "React + Vite frontend, Framer Motion animations",
            "Contact form over SMTP with a mock-mode fallback",
            "GitHub Actions cron refreshes competitive-programming stats",
        ],
        date="2026",
        github_link="https://github.com/Anurag-6799/portfolio",
    ),
    Project(
        id=6,
        title="Human Resource Management System",
        tech_stack=["Node.js", "Express.js", "MongoDB", "Next.js"],
        description=(
            "A production HRMS running daily attendance and leave operations for a 50+ person team, with approval "
            "chains that follow the real reporting hierarchy."
        ),
        features=[
            "Zero downtime during business hours",
            "Hierarchy-aware approval workflows and RBAC",
            "Bulk-write processing for 1000+ records",
        ],
        date="2025",
        github_link=None,
    ),
]

SKILLS_DATA = [
    # Languages
    Skill(name="Python", category="Languages"),
    Skill(name="SQL", category="Languages"),
    Skill(name="JavaScript", category="Languages"),
    Skill(name="TypeScript", category="Languages"),
    Skill(name="C++", category="Languages"),

    # Backend
    Skill(name="FastAPI", category="Backend"),
    Skill(name="Django", category="Backend"),
    Skill(name="Django REST Framework", category="Backend"),
    Skill(name="Node.js", category="Backend"),
    Skill(name="Express.js", category="Backend"),
    Skill(name="Pydantic", category="Backend"),
    Skill(name="SQLAlchemy", category="Backend"),
    Skill(name="Alembic", category="Backend"),

    # Databases & Caching
    Skill(name="PostgreSQL", category="Databases & Caching"),
    Skill(name="MongoDB (Aggregation Pipelines)", category="Databases & Caching"),
    Skill(name="Redis (Distributed Locks)", category="Databases & Caching"),
    Skill(name="Cache-Aside Strategies", category="Databases & Caching"),
    Skill(name="Indexing & Query Optimization", category="Databases & Caching"),

    # Architecture
    Skill(name="System Design", category="Architecture"),
    Skill(name="Microservices", category="Architecture"),
    Skill(name="Event-Driven Systems", category="Architecture"),
    Skill(name="RESTful APIs", category="Architecture"),
    Skill(name="Concurrency & Idempotency", category="Architecture"),
    Skill(name="OAuth2 / JWT / RBAC", category="Architecture"),

    # Frontend
    Skill(name="React.js", category="Frontend"),
    Skill(name="Tailwind CSS", category="Frontend"),
    Skill(name="Vite", category="Frontend"),

    # DevOps & Tools
    Skill(name="Docker", category="DevOps & Tools"),
    Skill(name="Git", category="DevOps & Tools"),
    Skill(name="GitHub Actions", category="DevOps & Tools"),
    Skill(name="RabbitMQ", category="DevOps & Tools"),
    Skill(name="Linux", category="DevOps & Tools"),
    Skill(name="CI/CD", category="DevOps & Tools"),
    Skill(name="Grafana", category="DevOps & Tools"),
    Skill(name="AWS", category="DevOps & Tools"),
]

CERTIFICATIONS_DATA = [
    Certification(name="Foundation of Machine Learning", issuer="IIIT Hyderabad", date="Jul 2022", credential_link="https://drive.google.com/file/d/1RbUOY_OLmzdq0MBYk0oBLqmva02tNOSo/view?usp=sharing"),
    Certification(name="CodeChef SnackDown 2021", issuer="CodeChef", date="Dec 2021", credential_link="https://drive.google.com/file/d/1QY_VrggUqFuPD2fke0y0d-3HuPS-0m0R/view?usp=sharing"),
    Certification(name="Cracked Leaked Password Database", issuer="Goldman Sachs", date="Sep 2021", credential_link="https://drive.google.com/file/d/1VhAcwmONv7dQfgFE100Z5o8K_ToI7mhn/view?usp=sharing"),
    Certification(name="Applied Data Science with Python", issuer="IIT Roorkee", date="Aug 2021", credential_link="https://drive.google.com/file/d/1C1doj6e8J-CzXz5kYETFyCMQuWBnbzTK/view?usp=sharing"),
    Certification(name="Data Structures and Algorithms in C++", issuer="Coding Blocks", date="Jul 2021", credential_link="https://drive.google.com/file/d/116a4fU2WMixR054jNesihidhgUWggQHG/view?usp=sharing"),
]
