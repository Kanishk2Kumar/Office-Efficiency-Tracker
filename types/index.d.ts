interface WelcomeEmailProps {
  user_name: string;
  user_email: string;
  user_password: string;
  login_link: string;
  company_email: string;
}

interface ResetPasswordEmailProps {
  link: string;
  email: string;
}