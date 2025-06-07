# ✨ måsstaden - A brutalist inspired website ✨

Welcome to **måsstaden**! This is a personal portfolio website meticulously crafted to showcase web development projects with a distinct **brutalist-inspired design aesthetic**. Built from the ground up with modern web technologies, måsstaden aims to deliver a unique, performant, and engaging user experience.

It was originally bootstrapped and developed iteratively in Firebase Studio.

<!-- Optional: Add a screenshot or GIF of the portfolio here -->
<!--
[![måsstaden Screenshot](https://example.com/path/to/screenshot.png)](https://your-live-portfolio-url.com)
-->
<!-- Optional: Live Demo Link
**🚀 [View Live Demo](https://your-live-portfolio-url.com) 🚀**
-->

## 🌟 Key Features

*   🎨 **Unique Brutalist Design**: Embraces raw, unpolished aesthetics with sharp edges, high contrast, visible structural elements, and bold typography.
*   💡 **Dynamic Accent Colors**: The UI's accent color intelligently shifts based on the page context (vivid pink for Home, yellowish-green for Projects sections), creating a dynamic visual experience.
*   🖼️ **Animated Project Cards**: Project cards feature an eye-catching animated gradient border on hover, adding a modern flair to the brutalist style.
*   🧩 **Single-Page Layout**: A streamlined experience with primary content, including a "Featured Projects" section, consolidated on the homepage.
*   🔎 **Project Detail Pages**: Clicking a project opens a dedicated page with more information, a large showcase image, and tech stack details.
*   🤖 **AI-Powered Bio**: The "About Me" section dynamically generates an engaging biography using **Genkit** and Google's **Gemini AI model**, with graceful fallbacks for service availability issues.
*   🖱️ **"Load More" Projects**: The "Featured Projects" section initially shows a subset of projects, with a "Load MØre" button to progressively reveal more, enhancing content discovery.
*   📱 **Responsive Design**: Adapts seamlessly across desktops, tablets, and mobile devices.
*   🚀 **SEO Optimized**: Implements best practices including dynamic metadata for project pages, Open Graph tags, and Twitter cards for enhanced shareability.
*   👁️ **Accessibility Conscious**: Built with semantic HTML and ARIA attributes where appropriate to improve user experience.
*   ✨ **Special 'Ø' Styling**: The letter 'O' is often replaced with a styled 'Ø' in headings and titles, adding a unique branding touch.

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (v15+ with App Router)
*   **UI Library**: [React](https://reactjs.org/) (v18+)
*   **Styling**:
    *   [Tailwind CSS](https://tailwindcss.com/) (Utility-First)
    *   CSS Variables & Global Styles for theming (`src/app/globals.css`)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) (scaffolded and customized)
*   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (with Google AI plugin for Gemini)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Package Manager**: npm
*   **Development Environment**: Firebase Studio

## 🧱 Design Philosophy

BruteFolio champions a **modern brutalist** approach. This means:
*   **Honest Materials**: Showing the structure and being upfront about the digital nature.
*   **Bold Typography**: Large, impactful text.
*   **High Contrast**: Clear separation between elements, often with a dark theme.
*   **Function Over Ornament**: Prioritizing usability and clear presentation, where "ornamentation" comes from the structure and interaction itself (like the animated borders).
*   **Deliberate "Rawness"**: Avoiding overly polished or skeuomorphic designs, with an emphasis on clear, defined edges and block shadows.

## 🚀 Getting Started Locally

To get måsstaden running on your local machine, follow these steps:

### Prerequisites:

*   [Node.js](https://nodejs.org/) (v20 or later recommended, as per `functions/package.json` engine requirement)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation:

1.  **Clone the repository:**
    ```bash
    git clone https://your-repository-url.git måsstaden
    cd måsstaden
    ```
    *(Replace `https://your-repository-url.git` with the actual URL of your Git repository if applicable)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    *   Create a `.env` file in the root of your project (you can copy it from `.env.example` if one exists, or create it from scratch).
    *   Add your Google Gemini API key:
        ```env
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
        ```
    *   Replace `"YOUR_GEMINI_API_KEY_HERE"` with your actual API key obtained from [Google AI Studio](https://aistudio.google.com/app/apikey). The AI-powered bio feature requires this key to function.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically start on `http://localhost:9002` (as configured in `package.json`).

## 🗂️ Content Management

Project details (titles, descriptions, images, technologies, etc.) are managed by directly editing the `public/projects.json` file. This simple JSON-based approach allows for easy updates without needing a complex CMS.

*   **File Location**: `public/projects.json`
*   **Structure**: Each project is an object within a JSON array. Refer to the existing structure in the file when adding new projects.
*   **Images**:
    *   Place project thumbnail images (e.g., `my-project-thumb.png`) and larger detail page images (e.g., `my-project-main.png`) in a suitable subdirectory within the `public` folder, for example, `public/images/projects/`.
    *   In `projects.json`, reference these images using their path relative to the `public` directory (e.g., `/images/projects/my-project-thumb.png`). Placeholder images from `https://placehold.co` are used by default if specific project images are not yet available.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://your-repository-url/issues) if you want to contribute.

*(This section can be expanded if the project becomes more open source or has specific contribution guidelines.)*

## 📄 License

[måsstaden](https://github.com/Kadav1/studio) © 2025 by [Alexander Zewebrand](https://creativecommons.org) is licensed under <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener noreferrer" style="display:inline-block;" target="_blank">Creative Commons Attribution 4.0 International<img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" style="height:1em;margin-left:3px;vertical-align:text-bottom;width:1em" alt="Creative Commons icon"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" style="height:1em;margin-left:3px;vertical-align:text-bottom;width:1em" alt="Attribution icon"></a>.

---

Thank you for checking out måsstaden! We hope you enjoy the unique aesthetic and functionality.
