from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.schemas import Bio, Experience, Project, Skill, ContactSchema, Certification
from app.core.data import PROFILE_DATA, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA, CERTIFICATIONS_DATA
from app.services.email_service import EmailService

router = APIRouter()

# --- Dependency Injection ---
def get_email_service():
    return EmailService()

@router.get("/bio", response_model=Bio)
async def get_bio():
    return PROFILE_DATA

@router.get("/experience", response_model=List[Experience])
async def get_experience():
    return EXPERIENCE_DATA

@router.get("/projects", response_model=List[Project])
async def get_projects():
    return PROJECTS_DATA

@router.get("/skills", response_model=List[Skill])
async def get_skills():
    return SKILLS_DATA

@router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    return CERTIFICATIONS_DATA

@router.post("/contact")
async def contact_form(
    contact_data: ContactSchema,
    email_service: EmailService = Depends(get_email_service)
):
    """
    Handle contact form submissions.
    Uses Dependency Injection to access the EmailService.
    """
    try:
        await email_service.send_email(contact_data)
        return {"message": "Email sent successfully", "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
