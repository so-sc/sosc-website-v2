# Contributing to SOSC Website

Thank you for your interest in contributing to the **Sahyadri OpenSource Community (SOSC) Website**

All contributions - content, documentation, or code are made **via Pull Requests**.

This document explains **how to contribute** and **what is expected** so your PR can be reviewed and merged smoothly.

---

## Ways to Contribute

You can contribute by:

- Writing or updating **Blogs**
- Adding or updating **Events**
- Showcasing **Projects**
- Adding **Learning Resources**
- Fixing bugs or improving UI
- Improving documentation

---

## Contribution Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a new branch
   ```bash
   git checkout -b ADD-my-contribution
   ```
4. Make your changes
5. Commit using the commit prefix convention
6. Push and open a Pull Request

**Commit Message Guidelines**

We follow a prefix-based commit format.

Use only one prefix per commit:

- ADD: Added files or content
- FEAT: New feature
- FIX: Bug fix
- SFIX: Security fix
- TYPO: Typo or documentation fix
- RFT: Refactored code
- WIP: Work in progress
- INIT: Initial setup

Example
git commit -m "ADD: docker resource for beginners"

## Content Contributions

All website content is written in Markdown or JSON and lives inside:

src/content/

Before adding content, read `CONTENT_GUIDELINES.md` carefully.

PRs not following the guidelines may be requested for changes.

## Pull Request Checklist

Before submitting your PR, ensure:
Correct folder and file structure
Naming conventions followed
Frontmatter / JSON fields are complete
Images (if any) placed correctly
Commit messages follow prefix rules
PR description clearly explains the change

## Community Guidelines

Be respectful and inclusive
Keep discussions constructive
Help new contributors where possible

## Need Help?

Open an issue
Ask maintainers for guidance
Refer to README.md and CONTENT_GUIDELINES.md

We’re happy to have you contribute.

— Team SOSC
