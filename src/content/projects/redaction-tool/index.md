---
title: Redaction Tool
description: An NLP-powered document redaction system using Flask and TypeScript for secure and automated text redaction.
date: 2024-03-10
techStack:
  - Flask
  - TypeScript
  - Python
  - NLP
maintainers:
  - haxzie
  - chaman-k
status: in-progress
category: AI/ML
tags:
  - flask
  - typescript
  - ai
  - nlp
github: https://github.com/so-sc/redaction-tool
documentation: https://github.com/so-sc/redaction-tool#readme
featured: false
---

## About

The Redaction Tool is an NLP-powered document redaction system designed to automatically identify and redact sensitive information from documents. Built with Flask backend and TypeScript frontend, it leverages natural language processing to provide secure and efficient text redaction.

## Features

- Automatic sensitive data detection using NLP
- Support for multiple document formats (PDF, DOCX, TXT)
- Customizable redaction rules
- Batch processing capabilities
- Audit trail and logging
- REST API for integration

## Tech Stack

### Backend
- **Flask** - Python web framework
- **spaCy** - Industrial-strength NLP
- **PyMuPDF** - PDF processing

### Frontend
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **TailwindCSS** - Styling

## Installation

```bash
# Clone the repository
git clone https://github.com/so-sc/redaction-tool.git

# Backend setup
cd backend
pip install -r requirements.txt
python app.py

# Frontend setup
cd frontend
npm install
npm run dev
```

## API Usage

```python
import requests

response = requests.post(
    "http://localhost:5000/api/redact",
    files={"document": open("document.pdf", "rb")},
    data={"rules": ["names", "emails", "phone_numbers"]}
)
```

## Contributing

We're actively looking for contributors! Check out our issues page for ways to help.
