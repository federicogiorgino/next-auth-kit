# Next Auth Kit

A simple and flexible authentication solution built with Next.js and NextAuth.js. This kit provides easy-to-integrate authentication methods, including email-based and OAuth authentication (GitHub).

## Features
- Supports multiple authentication strategies (email verification, GitHub OAuth).
- Secure secret management with environment variables.
- Simple setup for Next.js apps.

## Installation
Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/next-auth-kit.git
cd next-auth-kit
```

## Install the required dependencies.

```bash
pnpm install
```
## Set up your .env file by copying the example provided and filling in your values.

```bash
cp .env
```


## Make sure you have the necessary credentials for the following services:

- Resend for email verification
- GitHub OAuth for GitHub login

## Update your .env file with the appropriate values:

```bash
DATABASE_URL=your-database-url
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
EMAIL_VERIFICATION_CALLBACK_URL=http://localhost:3000/email-verified
EMAIL_SENDER=onboarding@resend.dev
RESEND_API_KEY=your-resend-api-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```
Configuration
Environment Variables
You need to set the following environment variables to run the app correctly:

DATABASE_URL: Connection string to your database.
BETTER_AUTH_SECRET: Secret used for JWT signing (ensure it's unique and secret).
BETTER_AUTH_URL: The URL where your app is hosted.
EMAIL_VERIFICATION_CALLBACK_URL: URL used for email verification callback.
EMAIL_SENDER: Email address from which the verification emails are sent (use Resend's email service).
RESEND_API_KEY: Your API key from Resend (for sending email verification links).
GITHUB_CLIENT_ID: Client ID from your GitHub OAuth application.
GITHUB_CLIENT_SECRET: Client Secret from your GitHub OAuth application.
Running the Application
Start the Next.js app in development mode:

```bash
npm run dev
```
The app will be running on http://localhost:3000. 

License
MIT License