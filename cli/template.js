export const blogFrontmatter = ({ name, author, date, title }) => `---
author: "${author}"
cover: "./cover.png"
date: "${date}"
description: ""
name: "${name}"
tags: ""
title: "${title}"
---
`;

export const eventFrontmatter = ({ name,  date }) => `---
name: "${name}"
date: "${date}"
location: ""
cover: "./cover.png"
---
`;
