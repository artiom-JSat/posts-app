# myBLOG — Posts Application

A modern, high-performance web application for viewing posts, built with the latest frontend best practices. This project features full authentication, dynamic routing, pagination, and internationalization.

[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen)](https://rl-posts-app.vercel.app)

## 🚀 Live Demo
**Url:** [Visit Live Demo](https://rl-posts-app.vercel.app)

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
   git clone https://github.com/artiom-JSat/posts-app.git
   cd posts-app
   ```

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

<img width="1547" height="848" alt="Screenshot 2026-03-16 at 13 33 36" src="https://github.com/user-attachments/assets/1af62ce7-e2d7-44f0-a387-8c918f1d4f0f" />
<img width="1547" height="848" alt="Screenshot 2026-03-16 at 13 34 28" src="https://github.com/user-attachments/assets/5e7e6fb0-7025-4882-bff2-3677685ea49b" />
<img width="1547" height="848" alt="Screenshot 2026-03-16 at 13 34 54" src="https://github.com/user-attachments/assets/90233228-0272-4533-b8a4-792b05562097" />
<img width="1547" height="848" alt="Screenshot 2026-03-16 at 13 34 09" src="https://github.com/user-attachments/assets/4464d4f9-4e76-4b29-8712-d0f2653a1897" />