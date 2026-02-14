---
title: SlideX
description: An Express-based app that lets you control presentation slides over WiFi from any remote device.
cover: ./slidex.webp
date: 2018-01-01
techStack:
  - Node.js
  - Express.js
  - Socket.io
  - node-key-sender
  - ip
  - qrcode-terminal
maintainers:
  - haxzie
status: completed
category: Utility
tags:
  - remote-control
  - wifi
  - pwa
github: https://github.com/so-sc/slidex
npm: https://www.npmjs.com/package/slidex
documentation: https://github.com/so-sc/slidex/blob/master/README.md
community: false
---

# SlideX (slide-express)

**SlideX (slide-express)** is a lightweight Express application that allows you to control presentation slides over WiFi using any remote device such as a smartphone or tablet.

It runs a small local web server on your machine, generates a QR code, and provides a web-based remote control interface that works within your local network—effectively turning your phone into a wireless presentation clicker.

---

## Key Features

- **Wireless Slide Control** – Navigate slides from any device on the same network
- **QR Code Access** – Instant connection via a terminal-generated QR code
- **PWA Support** – Installable as a Progressive Web App on mobile devices
- **Lightweight & Fast** – Minimal setup with simple CLI usage
- **Self-Hostable** – Runs entirely on your local machine
- **Open Source** – Community-driven and extensible

---

## How It Works

1. SlideX starts a local Express server
2. Your machine’s local IP is detected automatically
3. A QR code + URL is displayed in the terminal
4. Your phone connects via browser
5. SlideX sends real-time commands to your system to control slides

---

## Tech Stack

SlideX is built using:

- **Node.js** – Runtime environment
- **Express.js** – Web server and API
- **Socket.io** – Real-time communication between devices
- **node-key-sender** – Simulates keyboard inputs for slide navigation
- **ip** – Local network IP detection
- **qrcode-terminal** – Generates scannable QR codes in the terminal

---

## Project Goals

- Remove dependency on physical presentation remotes
- Provide a simple, reliable, and local-first solution
- Keep setup minimal and beginner-friendly
- Enable easy customization and extension

---

## Open Source & Community

SlideX is maintained within the **Sahyadri Open Source Community (SOSC)** and is open to contributions from students and developers interested in real-time web applications.

---

## Contributing

Pull requests are welcome. Please:

- Work on issues labeled **help wanted** or **good first issue**, or
- Open an issue to propose new features before implementing them.
