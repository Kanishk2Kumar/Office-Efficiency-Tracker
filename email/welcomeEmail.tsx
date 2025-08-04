import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
} from '@react-email/components';

export const WelcomeEmail = ({
  user_name,
  user_email,
  user_password,
  login_link,
  company_email,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-[#fff8f1] font-sans text-base text-[#333]">
        <Container className="max-w-[600px] mx-auto p-6 bg-white rounded">
          <Section>
            <Text className="text-lg font-semibold mb-4">
              Welcome to the GB Digitals family, {user_name}!
            </Text>

            <Text>Your account has been successfully created. Here are your login details:</Text>

            <ul className="list-disc pl-6 my-3">
              <li>
                <strong>Email:</strong> {user_email}
              </li>
              <li>
                <strong>Password:</strong> {user_password}
              </li>
            </ul>

            <Text className="mt-6">
              <Link
                href={login_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#fc0038] text-white px-4 py-2 rounded no-underline"
              >
                Login to GB Digitals
              </Link>
            </Text>

            <Text className="mt-6">
              If you need help, contact us at{' '}
              <Link href={`mailto:${company_email}`} className="text-[#fc0038] underline">
                {company_email}
              </Link>.
            </Text>

            <Text className="mt-6">
              Best regards,
              <br />
              The GB Digitals Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;