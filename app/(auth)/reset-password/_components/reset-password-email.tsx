import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

type ResetPasswordMailTemplateProps = {
  username: string
  confirmationLink: string
}

function ResetPasswordMailTemplate({
  username,
  confirmationLink,
}: ResetPasswordMailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>Hello {username},</Text>
          <Text style={text}>
            You recently requested to reset your password. Click the button
            below to set a new password.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={confirmationLink}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>
            If you didn't request a password reset, we reccoment you change your
            password.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you're having trouble clicking the button, copy and paste this
            URL into your web browser:
            <br />
            <Link href={confirmationLink} style={link}>
              {confirmationLink}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function createResetPasswordEmail(props: ResetPasswordMailTemplateProps) {
  return <ResetPasswordMailTemplate {...props} />
}

export { ResetPasswordMailTemplate, createResetPasswordEmail }

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
}

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '10px 20px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}

const link = {
  color: '#5469d4',
}
