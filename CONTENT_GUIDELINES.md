---
# Content Contribution Guidelines for SOSC Website

This document defines **what content to write**, **where it belongs**, and **how it must be formatted**. Following these guidelines ensures consistency across the SOSC website.
---

## Project Structure

Most content lives inside the following directories:

```
src/content/
├── blogs/
│   └── <blog-slug>/
│       └── index.md
├── events/
│   └── <event-slug>/
│       └── index.md
├── projects/
│   └── <project-slug>/
│       └── index.md
├── resources/
│   └── <resource-name>.json
```

### General Rules

- Use **kebab-case** for all folder and file names.
- Each blog, event, or project must be in its **own folder**.
- Each folder must contain an `index.md` file.
- The folder name should match the URL slug.

---

## Blog Guidelines

### Location

```
src/content/blogs/<blog-slug>/index.md
```

Images:

```
src/content/blogs/<blog-slug>/
```

### Mandatory Frontmatter

```md
---
date: 2018-08-02
author: haxzie
name: Musthaq Ahamad
title: Second blog post
tags: ["blog", "post"]
cover: "./cover.jpg"
description: "Short, single-line description of the blog."
---
```

### Recommended Structure

- **Introduction**
- **Background**
- **Main Content**
- **Key Takeaways**
- **Conclusion**

---

## Event Guidelines

### Location

```
src/content/events/<event-slug>/index.md
```

Images:

```
src/content/events/<event-slug>/
```

### Mandatory Frontmatter

```md
---
name: devhost:18
date: 2018-12-02
location: Seminar Hall
cover: "./cover.png"
---
```

---

## Project Guidelines

### Location

```
src/content/projects/<project-slug>/index.md
```

### Mandatory Frontmatter

```md
---
name: Safe Horizon
description: Disaster management platform with real-time alerts
tags: ["web", "opensource", "react"]
repo: https://github.com/org/project
demo: https://project-demo.com
status: active
---
```

### Recommended Structure

#### Overview

Provide a short summary of what the project is, the problem it solves, and who it is intended for. This section should help readers quickly understand the purpose and scope of the project.

#### Features

List the key functionalities or capabilities of the project. Use bullet points and focus on user-facing features rather than technical implementation details.

#### Tech Stack

Mention the main technologies, frameworks, languages, and tools used to build the project. This helps contributors understand the technical environment before getting started.

#### How to Contribute

Explain how others can contribute to the project. Include a link to the repository, brief setup or contribution steps, and a reference to `CONTRIBUTING.md` if available.

---

## Resource Guidelines (JSON)

Resources are stored as individual JSON files.

### Location

```
src/content/resources/
```

### Resource JSON Format

```json
{
  "title": "Docker for Beginners",
  "description": "A comprehensive guide to understanding and using Docker.",
  "type": "video",
  "category": "DevOps",
  "tags": ["docker", "containers"],
  "link": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
  "contributor": "community",
  "date": "2024-03-22"
}
```

### Field Rules

- **type**: `guide` | `article` | `video` | `roadmap` | `tools` | `repo` | `misc` | `course` | `book` | `cheatsheet` | `podcast` | `community` | `challenge` | `job-board`.
  - You can specify a single string or an array of strings (e.g. | `["course", "video"]`).
- **category**: `AI/ML` | `App Dev` | `Blockchain` | `Cloud` | `Competitive Programming` | `Computer Science` | `Cybersecurity` | `Data Science` | `Design` | `Development` | `DevOps` | `Game Dev` | `Open Source` | `Web Dev` | `Misc`.
- **contributor**: `community` | `external`
- **date**: Must follow the format `YYYY-MM-DD`.
- One resource per file.
- All fields are mandatory.
- No promotional or affiliate links.

### Images & Assets

- Use optimized images only.
- Use descriptive file names.

### What Not to Submit

- Promotional content.
- Offensive or political material.
- Copyrighted content without permission.
- Invalid Markdown or malformed JSON.

---

Well-written content helps the SOSC community grow. Thank you for contributing!

— Team SOSC
