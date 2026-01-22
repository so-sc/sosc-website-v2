<p align="center">
<img src="https://raw.githubusercontent.com/haxzie/sosc-website/master/src/images/logo_main.png"/>
</p>
<h1 align="center">Sahyadri OpenSource Community</h1>

The official website for **Sahyadri OpenSource Community (SOSC)** - a student-driven community dedicated to promoting open-source culture, collaborative learning, and technical innovation.

All contribution to this website including contents are made through Pull Requests. If you are new to Git and GitHub and don't know how to submit a Pull Request, please refer our friendly guide on submitting your first pull request at [gitme.js.org](https://gitme.js.org).


**Live Website**: [www.sosc.org.in](https://www.sosc.org.in)

---

## About

This website serves as a central hub for:
- Community events and workshops
- Technical blog posts and insights
- Project showcases from our members
- Learning resources curated for all skill levels

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

## Creating Content

## Using the CLI 

The easiest way to create new content is using our CLI tool:

```bash
npm run add
```

Select the content type (blog, event, project, or resource) and follow the prompts. The CLI automatically creates the proper folder structure and template.

## Manual Creation

If you prefer to create content manually, ensure you follow the structure and frontmatter requirements below.

#### Creating a new blog post:

Create a folder in `src/content/blogs/` with your slug name (e.g., `my-first-blog`). Inside, create `index.md`.

**Frontmatter Example:**
```yaml
---
title: "Getting Started with Open Source"
description: "A comprehensive guide to making your first contribution."
date: 2023-10-15
author: "github-username"
cover: "./cover-image.png"
tags: "opensource, git"
---
```

#### Creating a new event:

Create a folder in `src/content/events/` with the event slug. Inside, create `index.md`.

**Frontmatter Example:**
```yaml
---
name: "DevHost 2023"
date: 2023-11-20
location: "Seminar Hall"
cover: "./event-banner.png"
---
```

*Note: Place image assets in the same folder as the markdown file and reference them relatively.*

For complete details on all content types including Projects and Resources, refer to [CONTENT_GUIDELINES.md](CONTENT_GUIDELINES.md).

---

## Contributing

We welcome contributions from everyone. Whether you are fixing bugs, adding features, improving documentation, or creating content, your help is appreciated.

### Contribution Workflow

1. **Fork** the repository.
2. **Create a branch** for your feature or fix.
   ```bash
   git checkout -b FEAT-your-feature-name
   ```
3. **Make your changes** and commit using the convention below.
4. **Push** to your fork and **submit a Pull Request**.

### Commit Message Conventions

We follow a prefix-based commit format to ensure a clean history:

- `ADD`: Added files or content
- `FEAT`: New feature
- `FIX`: Bug fix or correction
- `SFIX`: Security fix
- `TYPO`: Typo or documentation fix
- `RFT`: Refactored code
- `WIP`: Work in progress
- `INIT`: Initial setup

**Example**: `FEAT: add dark mode toggle to navbar`

For detailed guidelines, please read [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Contributors

Meet our contributors:

- [**JustModo**](https://github.com/JustModo)
- [**R Ajay Kumar**](https://github.com/Rajaykumar12)
- [**Hitha Badikillaya S U**](https://github.com/HithaBadikillaya)
- [**Kushal SM**](https://github.com/mrkushalsm)
- [**Vivek Neeralagi**](https://github.com/VivekNeer)
- [**Manas S**](https://github.com/Manas-salian)
- [**Pratheek G Shetty**](https://github.com/techshetty)
- [**Prathyusha K**](https://github.com/Prathyusha-K-05)
-  [**Soniya Kolvekar**](https://github.com/soniya-kolvekar)
- [**Meghna Suresh**](https://github.com/Meghna-Suresh104)
- [**Nithin K**](https://github.com/nithink-code)

---
