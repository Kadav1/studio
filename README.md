# Alex Zewebrand - Portfolio Website

Welcome to the codebase for Alex Zewebrand's personal portfolio website. This project showcases work, projects, skills, and digital art. It's built with a modern tech stack designed for performance, scalability, and an excellent developer experience.

## ✨ Features

*   **Responsive Design**: Optimized for viewing on various devices (desktops, tablets, and smartphones).
*   **Project Showcase**: Highlights key projects with descriptions, technologies used, and links.
*   **Artwork Gallery**: Displays digital art creations.
*   **Blog/Updates Section**: Shares insights, thoughts, and updates.
*   **Contact Form**: Allows visitors to get in touch easily.
*   **Smooth Animations**: Utilizes Framer Motion for subtle and engaging user interface animations.

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **AI (Optional)**: [Genkit (by Google)](https://firebase.google.com/docs/genkit) for generative AI features.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project by copying the `.env` file:
    ```bash
    cp .env .env.local
    ```
    Populate `.env.local` with your Firebase project configuration and any other necessary API keys. Refer to `src/lib/firebase.ts` for the expected Firebase environment variable names (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`).

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
# yarn dev
```

The application will be available at [http://localhost:9002](http://localhost:9002) (or another port if 9002 is in use).

If you are using Genkit for AI features, you might also need to run its development server:
```bash
npm run genkit:dev
# or, for watching changes:
# npm run genkit:watch
```

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode with Turbopack.
*   `npm run genkit:dev`: Starts the Genkit development server.
*   `npm run genkit:watch`: Starts the Genkit development server with file watching.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server (after building).
*   `npm run lint`: Lints the codebase using Next.js's default ESLint configuration.
*   `npm run typecheck`: Performs a TypeScript type check.

## 🎨 Customization

*   **Styling & Theme**: Modify Tailwind CSS configuration in `tailwind.config.ts` and global styles including CSS variables for colors in `src/app/globals.css`.
*   **Content**: Update content for various sections (Hero, Projects, Artworks, Blog, etc.) within their respective components in `src/components/sections/`.
*   **Navigation**: Modify header links in `src/components/layout/Header.tsx`.
*   **Firebase**: Configuration is in `src/lib/firebase.ts` and uses environment variables.

## 🌐 Deployment

This project is configured for deployment with Firebase App Hosting (see `apphosting.yaml`). You can also deploy it to other platforms that support Next.js applications like Vercel or Netlify.

---

This README provides a good overview for anyone interacting with your project.
