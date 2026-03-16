# myBLOG — Posts Application

A modern, high-performance web application for viewing posts, built with the latest frontend best practices. This project features full authentication, dynamic routing, pagination, and internationalization.

[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen)](YOUR_DEPLOY_LINK_HERE)

## 🚀 Live Demo
**Url:** [Visit Live Demo](YOUR_DEPLOY_LINK_HERE)

---

## 🛠 Tech Stack

The project is built with a focus on type safety, scalability, and performance:

* **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **State Management:** [Zustand](https://docs.pmnd.rs/zustand/) (Client-side state)
* **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (Server-side state)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
* **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (i18n support)
* **E2E Testing:** [Playwright](https://playwright.dev/)
* **Form Management:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation

---

## 💻 Getting Started

Follow these instructions to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/artiom-JSat/posts-app.git](https://github.com/artiom-JSat/posts-app.git)
   cd posts-app

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Run End-to-End tests:**
   ```bash
   npx playwright test
   ```

---

### ✨ Key Features

* Authentication Flow: Secure registration and login tabs with automated redirects.
* Dynamic Content: Fetches posts from a REST API with loading states and error handling.
* Pagination: Efficient client-side pagination integrated with URL search parameters.
* i18n Routing: Automatic language detection and localized routing (e.g., /en/posts, /de/posts).
* Responsive Design: Mobile-first approach ensuring a seamless experience across all devices.
* E2E Test Coverage: Critical user paths (Registration -> List -> Details -> Logout) are fully tested.

---

### 📄 License
This project is open-source and available under the MIT License (https://opensource.org/license/mit/).