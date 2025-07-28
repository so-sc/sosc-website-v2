export const blogFrontmatter = ({ name, author, date, title, slug }) => `---
author: "${author}"
cover: "/content/blogs/${slug}/cover.png"
date: "${date}"
description: ""
name: "${name}"
tags: ""
title: "${title}"
---
`;

export const eventFrontmatter = ({ name, slug, date }) => `---
name: "${name}"
date: "${date}"
location: ""
cover: "/content/events/${slug}/cover.png"
---
`;
