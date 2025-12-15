from typing import List, Optional, Dict
from pydantic import BaseModel, EmailStr, HttpUrl

# --- Contact Form Schema ---
class ContactSchema(BaseModel):
    name: str
    email: EmailStr
    message: str

# --- Portfolio Data Schemas ---
class Skill(BaseModel):
    name: str
    category: str

class Experience(BaseModel):
    id: int
    company: str
    role: str
    duration: str
    description: List[str]

class Project(BaseModel):
    id: int
    title: str
    tech_stack: List[str]
    description: str
    features: List[str]
    date: str
    github_link: Optional[str] = None # Added field

class Certification(BaseModel):
    name: str
    issuer: str
    date: str
    credential_link: Optional[str] = None # Added field

class Bio(BaseModel):
    name: str
    title: str
    bio: str
    location: str
    learning_goals: str
    social_links: Dict[str, str]
    education: str
