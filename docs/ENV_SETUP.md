# ============================================================================

# CLERK AUTHENTICATION CONFIGURATION

# ============================================================================

# Get your keys from: https://dashboard.clerk.com/

# 1. Create a Clerk account at https://clerk.com

# 2. Create a new application

# 3. Go to "API Keys" in the dashboard

# 4. Copy your Publishable Key and Secret Key below

# Clerk Publishable Key (required - used in frontend)

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# Clerk Secret Key (required - used in backend/middleware)

CLERK_SECRET_KEY=sk_test_your_key_here

# ============================================================================

# CLERK ROUTING CONFIGURATION

# ============================================================================

# Where to redirect after signing in

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/flows

# Where to redirect after signing up

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/flows

# Sign-in page URL (using Clerk's default UI)

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

# Sign-up page URL (using Clerk's default UI)

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# ============================================================================

# BACKEND API CONFIGURATION

# ============================================================================

# Your backend API URL

# Example: http://localhost:8000 or https://api.yourapp.com

NEXT_PUBLIC_API_URL=http://localhost:8000

# ============================================================================

# INSTRUCTIONS

# ============================================================================

#

# 1. Create a Clerk account:

# - Go to https://clerk.com and sign up

# - Create a new application

#

# 2. Get your API keys:

# - Navigate to "API Keys" in the Clerk dashboard

# - Copy the Publishable Key to NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# - Copy the Secret Key to CLERK_SECRET_KEY

#

# 3. Update backend URL:

# - Set NEXT_PUBLIC_API_URL to your backend server address

#

# 4. Copy this file:

# - Copy ENV_SETUP.md and rename to .env.local

# - Or create .env.local manually with these values

#

# 5. IMPORTANT SECURITY NOTES:

# - Never commit .env.local to git

# - .env.local is already in .gitignore

# - Secret keys should NEVER be exposed to the frontend

# - Only NEXT*PUBLIC*\* variables are accessible in the browser

#
