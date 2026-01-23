---
title: STUDYVAULT
description: description: A high-performance academic resource-sharing platform designed for students to share, discover, and engage with learning resources through smooth interactions and modern animations.
cover: ./StudyVault.webp
date: 2026-01-15
techStack:
  - Next.js (App Router)
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Storage
  - Tailwind CSS
  - Framer Motion
  - OpenAI API
maintainers:
  - Soniya Kolvekar
  - Varun 
status: active
category: Education / EdTech
tags:
  - education
  - edtech
  - student-platform
  - resource-sharing
  - ai-assistant
  - open-source
github: https://github.com/so-sc/STUDYVAULT
documentation: https://github.com/so-sc/STUDYVAULT/blob/main/README.md
community: false
---

# STUDYVAULT

STUDYVAULT is a high-performance, interactive academic resource-sharing platform designed for students to collaboratively share, discover, and manage academic materials.
It enables seamless contribution and engagement through a modern, animated, and highly user-friendly experience.

The platform is designed to feel **fluid, alive, and community-driven**, transforming static notes into a collaborative learning vault.

---

## ✨ Key Features

- **Domain-Restricted Authentication**
  - Secure login using Firebase Authentication
  - Access is restricted to verified institutional email domains.

- **Intuitive Academic Navigation**
  - Structured flow: **Department → Semester → Subject**
  - Global search inside subject folders for instant access

- **Modern UI & Animations**
  - Smooth, liquid-style transitions powered by **Framer Motion**
  - Elegant **Glassmorphism** design using Tailwind CSS

- **Contributor-Friendly Upload System**
  - Built-in PDF converter for standardized uploads
  - Rich metadata support for academic clarity

- **Engagement-Driven Resource Cards**
  - Displays contributor name, faculty name, views, and likes
  - Automatic view counter on PDF open
  - Interactive like button with milestone-based confetti animation 🎉

- **Side-car AI Assistant**
  - Persistent Notion-style sidebar chatbot
  - Helps students locate topics within uploaded notes

- **Admin Moderation Panel**
  - Dedicated dashboard for Class Representatives (CRs)
  - Upload approval and moderation at the class level

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Glassmorphism, Dark UI)
- **Animations:** Framer Motion
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **AI Assistant:** OpenAI / LLM-based chat integration
- **State Management:** React Context / Zustand
- **Deployment:** Vercel / Firebase Hosting

---

## 🎯 Project Goals

- Create a **centralized academic vault** for Sahyadri College students
- Ensure **secure and exclusive access** using institution email validation
- Promote **student collaboration** through contribution and engagement
- Enhance learning with **AI-assisted note discovery**
- Deliver a **polished, modern UX** that feels intuitive and enjoyable
- Enable **class-level moderation** without administrative overload

---

## 🤝 Contributing

Contributions are highly encouraged and appreciated.

You can contribute by:
- Improving UI/UX animations or accessibility
- Enhancing Firestore schema or security rules
- Extending AI assistant capabilities
- Optimizing performance and search logic
- Reporting bugs or suggesting new features

### Contribution Guidelines

1. Fork the repository
2. Create a new feature branch  
   ```bash
   git checkout -b feature/your-feature-name
