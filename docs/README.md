# Flow Forge Documentation

Documentation for the Flow Forge visual workflow automation platform.

## Authentication

### [ENV_SETUP.md](./ENV_SETUP.md)

Environment configuration guide for Clerk authentication. Use this template to create your `.env.local` file with the required Clerk API keys and configuration.

### [BACKEND_AUTH_SETUP.md](./BACKEND_AUTH_SETUP.md)

Comprehensive guide for backend developers on integrating Clerk authentication. Includes:

- JWT token structure and validation
- Implementation examples for Node.js, Python, and Go
- Security best practices
- Testing strategies
- Performance optimization tips

---

## Quick Start

1. **Setup Authentication**:

   - Follow [ENV_SETUP.md](./ENV_SETUP.md) to configure your environment
   - Share [BACKEND_AUTH_SETUP.md](./BACKEND_AUTH_SETUP.md) with your backend team

2. **Get Clerk API Keys**:

   - Sign up at https://clerk.com
   - Create a new application
   - Copy your API keys from the dashboard

3. **Test the Flow**:
   - Start your dev server: `npm run dev`
   - Navigate to a protected route
   - Sign in with Clerk
   - Verify authentication is working

---

## Support

For issues or questions:

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord](https://clerk.com/discord)
- [JWT.io](https://jwt.io) - Decode and inspect tokens
