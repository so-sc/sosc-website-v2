---
title: Sankalp
description: A streamlined event and hackathon registration platform built by SOSC for seamless participant management and QR-based check-in.
cover: ./sankalp.webp
date: 2024-06-02
techStack:
  - Next.js
  - Express.js
  - TypeScript
  - MongoDB
  - Node.js
  - Tailwind CSS
status: completed
category: Platform
tags:
  - event-management
  - hackathon
  - registration
github: https://github.com/so-sc/Sankalp
demo: https://sankalp.sosc.org.in
documentation: https://github.com/so-sc/Sankalp/blob/master/README.md
community: true
maintainers:
  - so-sc
---

# Sankalp

**Sankalp** is a user-friendly, full-stack registration platform built by the **Sahyadri Open Source Community (SOSC)** to streamline event and hackathon registrations.

It serves as a unified system for participant onboarding, real-time administration, and secure QR-based attendee verification—reducing manual effort for organizers while improving the experience for users.

---

## Key Features

### For Participants

- **Email-verified accounts** with secure authentication
- **Event & Talk Registration** from a single dashboard
- **Hackathon Team Formation** (2–4 members) with problem statement submission
- **Personal Dashboard** to track registrations
- **Unique QR Codes** for fast check-in
- **Secure password recovery** via OTP

### For Administrators

- **QR Scanner** for instant check-in verification
- **Live Statistics Dashboard** (gender, student/employee, year, etc.)
- **Participant & Team Management** interface
- **Bulk Emailing** to specific groups
- **Role-based Access Control** (Maintainer, Admin, Marketing, Leads, Volunteers)
- **Excel Exports** for offline processing

---

## Tech Stack

### Frontend

- **Next.js (App Router)** + **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui + Radix UI**
- **TanStack Table**
- **Axios**
- **react-qr-reader**

### Backend

- **Express.js (TypeScript)**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **AES Encryption (crypto-js)**
- **Nodemailer**
- **xlsx for exports**
- **nodemon (dev)**

### DevOps

- **pnpm**
- **Monorepo with Concurrently**
- **Google Cloud App Engine**

---

## Architecture

Sankalp follows a clear separation of concerns:

- **`web/client`** → Next.js frontend (user dashboard, admin panel, forms, QR display)
- **`web/api`** → Express backend (auth, registration, admin, email, QR generation)
- **MongoDB** → Stores users, events, hackathon teams, and admin roles

Communication happens via REST APIs with JWT-based authentication.

---

## How It Works

![workflow-model](./workflow.webp)

---

## Project Goals

- Provide a **single source of truth** for SOSC registrations
- Reduce manual paperwork and chaos at events
- Enable **fast, reliable QR-based check-ins**
- Deliver real-time insights for organizers
- Maintain an **open-source, extensible platform**

---

## Self-Hosting & Deployment

Sankalp can be deployed on:

- Google Cloud App Engine (current setup)
- Any Node.js + MongoDB environment
- Local development using `pnpm start`

---

## Open Source & Community

Sankalp is developed in the open under **GPL-2.0** and maintained by SOSC.

Contributions, bug reports, and feature requests are welcome via GitHub issues and pull requests.
