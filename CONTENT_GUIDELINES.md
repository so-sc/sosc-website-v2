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
│   └── <track>.yaml
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

## Resource Guidelines (YAML)

Resources are grouped into **tracks** (Web Development, AI & Machine Learning, Cybersecurity…). Each track is one YAML file, and each file becomes a page at `/resources/<track>`.

### Location

```
src/content/resources/<track>.yaml
```

### Adding a resource

Open the track's file and append an entry under `resources:`. Copy an existing entry and edit it:

```yaml
- title: The Modern JavaScript Tutorial
  link: https://javascript.info/
  description: A thorough, well-written JavaScript tutorial, from basics to advanced topics.
  type: guide
  tags: [javascript]
```

### Field Rules

- **title**, **link**, **description**: required. Keep the description to one sentence on what the reader gets.
- **type**: `course` | `guide` | `docs` | `video` | `book` | `roadmap` | `cheatsheet` | `practice` | `tool` | `repo` | `article` | `podcast` | `community`.
- **tags**: optional, lowercase, used by search.
- **id**: optional. Only needed when the learning path refers to the resource. Defaults to the title in kebab-case.

### Learning paths

The `path:` list at the top of each file is the ordered "start here" route for that track. Each step has a `title`, an optional `note`, and `resources:`, a list of ids from the same file. Keep paths to 3–6 steps.

### Adding a track

Create `src/content/resources/<track>.yaml` with `title`, `tagline`, `description`, `order` (position on the hub), an optional `path`, and `resources`.

### Checks

`pnpm build` validates every file. A typo in `type`, a broken URL, a duplicate id or a path step pointing at a missing id fails the build, and the error names the file and the entry.

- No promotional or affiliate links.
- Prefer free resources.

### Images & Assets

- Use optimized images only.
- Use descriptive file names.

### What Not to Submit

- Promotional content.
- Offensive or political material.
- Copyrighted content without permission.
- Invalid Markdown or malformed YAML.

---

Well-written content helps the SOSC community grow. Thank you for contributing!

— Team SOSC
