from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.models.schemas import ContactSchema
from app.core.config import settings
import logging

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("email_service")

class EmailService:
    @staticmethod
    async def send_email(contact_data: ContactSchema):
        """
        Sends an email using fastapi-mail if credentials exist,
        otherwise simulates it by printing to console.
        """
        
        # 1. Mock Mode (Default)
        if not settings.MAIL_USERNAME or not settings.MAIL_PASSWORD:
            logger.info("⚠️ SMTP Credentials not found. Running in MOCK mode.")
            email_content = f"""
            --------------------------------------------------
            [MOCK EMAIL SENT]
            To: {settings.MAIL_USERNAME or "admin@example.com"}
            From: {contact_data.email} ({contact_data.name})
            Subject: Portfolio Contact
            
            Message:
            {contact_data.message}
            --------------------------------------------------
            """
            print(email_content)
            return True

        # 2. Real Mode (SMTP)
        conf = ConnectionConfig(
            MAIL_USERNAME=settings.MAIL_USERNAME,
            MAIL_PASSWORD=settings.MAIL_PASSWORD,
            MAIL_FROM=settings.MAIL_FROM,
            MAIL_PORT=settings.MAIL_PORT,
            MAIL_SERVER=settings.MAIL_SERVER,
            MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
            MAIL_STARTTLS=True,
            MAIL_SSL_TLS=False,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=False
        )

        message = MessageSchema(
            subject=f"New Contact from {contact_data.name}",
            recipients=[settings.MAIL_USERNAME],  # Send to yourself
            body=f"""
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {contact_data.name}</p>
            <p><strong>Email:</strong> {contact_data.email}</p>
            <p><strong>Message:</strong></p>
            <p>{contact_data.message}</p>
            """,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        try:
            await fm.send_message(message)
            logger.info(f"✅ Real email sent to {settings.MAIL_USERNAME}")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to send email: {e}")
            raise e
