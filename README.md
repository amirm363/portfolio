# Portfolio Landing Page Template

A modern and responsive portfolio landing page template built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Includes features like a theme switcher, contact form integration (potentially with Airtable), and project showcases.

## Features

- **Next.js App Router:** Utilizes the latest Next.js features for optimal performance and routing.
- **TypeScript:** Ensures type safety and improved developer experience.
- **Tailwind CSS & shadcn/ui:** Modern styling with utility-first CSS and pre-built UI components.
- **Responsive Design:** Mobile-first approach ensuring compatibility across devices.
- **Theme Switcher:** Allows users to toggle between light and dark modes.
- **Contact Form:** Built with `react-hook-form` and `zod` for validation. Includes backend action for submission (potentially integrates with Airtable).
- **Organized Structure:** Follows best practices for component and section organization.

## Tech Stack

- **Framework:** Next.js 15+
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4+, shadcn/ui
- **Form Management:** react-hook-form, Zod
- **Linting/Formatting:** ESLint
- **Package Manager:** pnpm

## Project Structure

```
.
├── public/             # Static assets (images, fonts)
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   │   ├── api/        # API routes (e.g., contact form submission)
│   │   └── sections/   # Reusable page sections (Header, Hero, Projects, etc.)
│   ├── components/     # Reusable UI components (atoms, molecules, organisms)
│   ├── lib/            # Utility functions, hooks, type definitions
│   ├── actions/        # Server actions (e.g., form handling, data fetching)
│   └── styles/         # Global styles (if any)
├── .env.local          # Environment variables (needs creation)
├── components.json     # shadcn/ui configuration
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── pnpm-lock.yaml      # pnpm lock file
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v20 or later recommended)
- pnpm (v9.0.4 or later recommended install: `npm install -g pnpm`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/amirm363/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Environment Variables

1.  Create a `.env.local` file in the root of the project.
2.  Add the following environment variables. You might need to adjust these based on your specific backend or data source setup (e.g., if using Airtable for the contact form):

    ```dotenv
    # Used to identify a specific user for fetching portfolio data (adjust as needed)
    USER_ID=your_user_id

    # Optional: Required if using Airtable for the contact form
    AIRTABLE_API_KEY=your_airtable_api_key
    AIRTABLE_BASE_ID=your_airtable_base_id
    AIRTABLE_TABLE_ID=your_airtable_table_id
    ```

    *   `USER_ID`: Might be used in actions like `src/actions/user-actions/user-info.action.ts` to fetch specific data. Define how you manage user data.
    *   `AIRTABLE_*`: These seem to be used in `src/actions/user-actions/contact-user.action.ts`. If you intend to use Airtable for the contact form, provide your credentials here. Otherwise, you might need to modify the contact action.

### Running Locally

1.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    This command uses Next.js Turbopack for faster development builds.

2.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev`: Starts the development server with Turbopack.
- `pnpm build`: Creates a production build of the application.
- `pnpm start`: Starts the production server (requires `pnpm build` first).
- `pnpm lint`: Lints the codebase using Next.js ESLint configuration.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
