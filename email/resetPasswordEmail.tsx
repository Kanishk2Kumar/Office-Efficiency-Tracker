import { Html, Head, Body, Container, Section, Text, Link } from '@react-email/components';

export const ResetPasswordEmail = ({ link, email }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-gray-100 font-sans text-base text-gray-800">
        <Container className="bg-white mx-auto max-w-[600px] p-4">
          <Section className="p-4">
            <h1 className="text-xl font-semibold mb-6">You have requested a password change</h1>
            <Text>
              We received a request to reset the password for your account. To proceed, please click the link below to create a new password:
            </Text>
            <Text className="mt-4">
              <Link href={link} className="text-blue-600 underline">
                {link}
              </Link>
            </Text>
            <Text className="mt-4">This link will expire in one hour.</Text>
            <Text className="mt-4">
              If you didn't request this password reset, please ignore this email or let us know immediately. Your account remains secure.
            </Text>
            <Text className="mt-6">
              Best regards,<br />GB Digitals Team
            </Text>
          </Section>
        </Container>
        <Container className="mx-auto max-w-[600px] text-sm text-gray-500 mt-4">
          <Text>
            The email was sent to {email}
            <br />
            You received this email because you are registered with GB Digitals
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;