![](https://upstash.com/blog/rag-chatbot-upstash-openai-clerk-nextjs/opengraph-image)

<p>
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#one-click-deploy"><strong>One-click Deploy</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>

## Introduction

NerdCoach is an intelligent bot that provides personalized career advice and analyzes your uploaded resume(s).

## One-click Deploy

You can deploy this template to Vercel with the button below:

[![](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/upstash/nerdcoach&env=OPENAI_API_KEY,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,UPSTASH_VECTOR_REST_URL,UPSTASH_VECTOR_REST_TOKEN,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

## Tech Stack + Features

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience.
- [Clerk](https://clerk.dev/) – Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git.
- [Upstash](https://upstash.com) - Serverless database platform. You are going to use Upstash Vector for storing vector embeddings and metadata, and Upstash Redis for storing per user chat history.
- [OpenAI](https://platform.openai.com/) - OpenAI is an artificial intelligence research lab focused on developing advanced AI technologies.

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development.
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience.
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons.
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance.

### Hooks and Utilities

- `useUser` –  React hook (by Clerk) to access the `user` object with current user's data.
- `useChat` – React hook (by Vercel) to create a conversational user interface for your chatbot application.

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style

## Author

- Rishi Raj Jain ([@rishi_raj_jain_](https://twitter.com/rishi_raj_jain_))
