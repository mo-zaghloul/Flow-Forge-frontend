## How to add Shadcn component
Run `pnpm dlx shadcn@latest add button`

you'll find the component in added in `app/components/ui`, which you can import using `import { <Component Name> } from "@/components/ui/<Component Name>"`;

```
/
├── app/
│   ├── layout.tsx         # Main app layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
|   ├── (pages)/
|   |   ├─── landingpage/
|   |   |    └── page.tsx 
|   |   └─── canvas/
|   |        └── page.tsx 
│   └── components/
│       └── ui/            # <-- Your shadcn/ui components path
├── public/                # Static assets (images, fonts)
├── lib/                   # Utils, hooks, db connections, services
├── components/            # Other project-specific UI components
├── types/                 # Shared TypeScript types
├── next.config.js
├── package.json
└── tsconfig.json

```

Key elements and their purpose:
- `public/`: Stores static assets like images, fonts, and other files that are served directly by the web server.

- `app/`: This is the core of the App Router.
Route Segments (folders like `dashboard/`, `login/`): Define the application's routes. Each segment can contain `page.tsx` (for the page content) and `layout.tsx` (for a specific layout for that route or its children).
- `globals.css`: Global CSS styles for the application.
- `layout.tsx`: The root layout that wraps all pages in the application.
- `page.tsx`: The root page of the application.
- `components/`: Houses reusable UI components that are not specific to any particular route and can be shared throughout the application.
- `hooks/`: Contains custom React hooks for encapsulating reusable logic.
- `lib/`: Stores utility functions, database connections, authentication logic, or other third-party library integrations.
- `styles/`: If not using a utility-first CSS framework like Tailwind extensively, this folder can hold global styles or module-specific CSS files.
- `utils/`: Contains general helper functions, such as date formatting, validation, or other common utilities.
- `.env.local`: Stores environment variables specific to the local development environment.
- `next.config.js`: Configuration file for `Next.js`.
- `package.json`: Lists project dependencies and scripts.
- `tsconfig.json`: Configuration file for TypeScript, if used.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
├── public/                 # Static assets (images, fonts, etc.)
│   ├── app/                # App Router and associated files
│   │   ├── (auth)/         # Example route group for authentication
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx  # Specific layout for dashboard
│   │   │   └── page.tsx
│   │   ├── _components/    # Private components used within the app folder
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout for the entire application
│   │   └── page.tsx        # Root page
│   ├── components/         # Reusable UI components (shared across app)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, database connections, third-party integrations
│   ├── styles/             # Global styles or specific style modules (if not using Tailwind extensively)
│   └── utils/              # General utility functions and helpers
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration (if using TypeScript)
```
- Route Groups (`(auth)/`): Used for organizing routes without affecting the URL path. Useful for grouping related routes (e.g., authentication pages).