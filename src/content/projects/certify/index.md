---
title: Certify
description: A full-stack certificate generation platform that transforms PowerPoint templates into personalized PDF certificates and delivers them via email.
cover: ./certify.webp
date: 2024-10-13
techStack:
  - Next.js
  - FastAPI
  - TypeScript
  - Python
  - Tailwind CSS
  - Cloudflare Workers
maintainers:
  - AkkilMG
status: completed
category: Productivity
tags:
  - certificates
  - automation
  - pdf-generation
  - email-automation
  - open-source
github: https://github.com/so-sc/Certify
documentation: https://github.com/so-sc/Certify/blob/master/README.md
community: false
---

# Certify

**Certify** is a modern, full-stack **certificate generation platform** built for the Sahyadri Open Source Community (SOSC).
It allows organizers to upload PowerPoint templates, generate personalized certificates at scale, and automatically deliver them via email — all through a clean and intuitive web interface.

Designed with automation and usability in mind, Certify eliminates manual certificate creation while maintaining high-quality outputs and professional email delivery.

---

## Key Features

### Smart Certificate Generation

* **Template-Based System** – Generate certificates from uploaded `.pptx` templates
* **URL-Based Templates** – Use remote PowerPoint templates via direct links
* **Dynamic Personalization** – Automatically replaces `{name}` and `{id}` placeholders
* **PPTX to PDF Conversion** – Produces high-quality, shareable certificates

### Template Management

* **Drag-and-Drop Uploads** – Simple UI for adding new certificate templates
* **Template Registry** – Local mapping of template IDs for quick access

### Automated Email Delivery

* **Gmail SMTP Integration** – Direct certificate delivery to recipients
* **Custom HTML Emails** – Professionally styled and customizable templates
* **Personalized Messaging** – Dynamic subject lines and email content

---

## Tech Stack

Certify is built using modern web tooling:

### Frontend

* **Next.js** – Server-rendered React application
* **TypeScript** – Type-safe development
* **Tailwind CSS & Bootstrap** – Responsive and clean UI design

### Backend

* **FastAPI** – High-performance Python backend
* **Uvicorn** – ASGI server for API hosting
* **python-pptx** – PowerPoint manipulation
* **Spire.Presentation** – PPTX to PDF conversion
* **Jinja2** – Email templating

### Infrastructure

* **Cloudflare Workers** – CDN for template and certificate storage

---

## API Capabilities

Certify exposes a clean REST API under `/api/v1`, including:

* Uploading templates
* Generating certificates from local or remote templates
* Sending generated certificates via email
* Health check and interactive API documentation via Swagger

---

## Project Goals

* Automate certificate generation for events and workshops
* Reduce manual effort for organizers
* Ensure high-quality, branded certificate outputs
* Provide an open-source foundation for further enhancements
