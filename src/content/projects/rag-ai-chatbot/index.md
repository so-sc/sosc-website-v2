---
title: Multilingual AI Chat System
description: A fully open-source, cross-platform AI chat application supporting both text and voice, built with modern, high-performance open-source technologies.
cover: ./ai-chatbot.webp
date: 2026-01-14
techStack:
  - Groq (Llama 3.3-70b)
  - HuggingFace (all-MiniLM-L6-v2)
  - OpenAI Whisper
  - langdetect
  - FastAPI
  - Expo (React Native)
  - TypeScript
  - Python
maintainers:
  - Rajaykumar12
status: active
category: Platform
tags:
  - ai-chat
  - multilingual
  - voice
  - rag
  - full-stack
  - open-source
github: https://github.com/Rajaykumar12/AI-chat
documentation: https://github.com/Rajaykumar12/AI-chat/blob/main/README.md
community: false
---
---


echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# Multilingual AI Chat System


**Multilingual AI Chat System** is a fully open-source, cross-platform AI chat application supporting both text and voice, built with modern, high-performance open-source technologies.

This application features a robust Retrieval Augmented Generation (RAG) system that enables users to get answers directly from PDF and PPTX files placed in the `backend/documents` directory. Users can ask questions in English, Hindi, Tamil, or Telugu, using either text or audio input, and receive a text response based on the content of the documents. If the requested information is not found in the files, the system responds with "this information is not there in the documents." This makes the application ideal for multilingual, document-based Q&A scenarios in both research and community settings.

The project focuses on **multilingual support, extensibility, and developer experience**, making it suitable for research, learning, and community-driven AI chat applications.

---

## Key Features

- **Y-Shaped Pipeline** – Unified processing for both text and audio inputs
- **Retrieval Augmented Generation (RAG)** – Professional-grade RAG using FAISS vector store
- **Multilingual** – Supports English, Hindi, Tamil, and Telugu
- **Cross-Platform** – Works on iOS, Android, and Web
- **Local & Open Source** – No vendor lock-in, unlimited usage
- **Easy Extensibility** – Add new languages or document sources easily

---

## Tech Stack

Multilingual AI Chat System is built using modern AI and web technologies:

- **Groq (Llama 3.3-70b)** – Fast, free text generation
- **HuggingFace (all-MiniLM-L6-v2)** – Local semantic embeddings
- **OpenAI Whisper** – Local audio transcription
- **langdetect** – Local language detection
- **FastAPI** – Python backend
- **Expo (React Native)** – Cross-platform frontend
- **TypeScript** – Type-safe frontend development

---

## Project Goals

- Deliver a robust, multilingual AI chat experience
- Enable both text and voice input for users
- Provide an open-source base for experimentation and learning
- Maintain a clean and extensible architecture

---

## Contributing

Contributions are welcome! 
Check the [GitHub repository](https://github.com/Rajaykumar12/AI-chat) for details on how to contribute.

Note: CONTRIBUTING.md is coming soon!

Here is how you can contribute:

1. **Fork the project**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

This project is under the [MIT License](https://github.com/Rajaykumar12/AI-chat/blob/main/LICENSE)