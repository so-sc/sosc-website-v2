---
title: AblateBench
description: A research pipeline that finds, removes, and evaluates the internal "refusal direction" in open-weight LLMs, with a rigorous refusal-vs-capability evaluation harness.
cover: ./cover.webp
date: 2026-08-26
techStack:
  - Python
  - PyTorch
  - Transformers
  - Modal
  - Hugging Face
  - pytest
maintainers:
  - Rajaykumar12
status: active
category: Research
tags:
  - llm
  - interpretability
  - abliteration
  - ai-safety
  - open-source
github: https://github.com/Rajaykumar12/AblateBench
documentation: https://github.com/Rajaykumar12/AblateBench/blob/main/README.md
community: false
---

# AblateBench

**AblateBench** is a complete pipeline to find, remove, and evaluate the internal **"refusal direction"** in open-weight large language models — a technique known as **abliteration**.

It reproduces the difference-in-means technique from [Arditi et al. (2024)](https://arxiv.org/abs/2406.11717) and wraps it in a self-built evaluation harness that measures not just whether refusals go away, but what the edit costs in model capability. All GPU compute runs on rented GPUs via [Modal](https://modal.com).

**Released model:** [rajaykumar12959/qwen3.8-27b-abliterated](https://huggingface.co/rajaykumar12959/qwen3.8-27b-abliterated) — refusal 99.3% → 0.0%, MMLU-Pro 65.1% → 61.8%.

---

## Key Features

### Direction Extraction & Ablation

* **Difference-in-Means Directions** – Computes a per-layer refusal direction from harmful vs. harmless prompt activations
* **Gram-Schmidt Purification** – Filters generic "a prompt was given" signal out of the refusal-specific direction
* **Two Ablation Methods** – A reversible runtime hook and a permanent weight edit, tested to be numerically equivalent
* **Layer/Coefficient Sweep** – Picks the operating point on the refusal-vs-capability tradeoff curve instead of guessing

### Evaluation Harness

* **Two-Tier Refusal Grader** – Rule-based classification with an LLM-judge fallback for ambiguous responses
* **Independent Capability Guard** – ARC-Easy as a quick sanity check, plus MMLU-Pro and harmless-prompt KL divergence
* **12-Category Eval Set** – 292 category-labeled prompts for measuring refusal behaviour

### Architecture Coverage

* **Llama & Qwen2.5** – Standard decoder architectures
* **Qwen3.5–3.8 Hybrid Models** – Edits linear-attention output projections that a naive edit would miss
* **Gemma 2/3 Sandwich-Norm Models** – Norm-aware orthogonalization, with tests that fail on the naive edit

---

## Results

### Qwen3.8-27B

Purified direction from **layer 37 of 64**, coefficient 1.0, run on a single H100 for ~$8 of Modal compute.

| Metric | Original | Abliterated |
|---|---|---|
| Refusal rate (292 prompts, 12 categories) | 99.3% | **0.0%** |
| MMLU-Pro (490 questions, 14 subjects) | 65.1% | **61.8%** (−3.3pp) |
| KL divergence on harmless prompts | — | **0.086 nats** |
| ARC-Easy (100 questions) | 1.000 | 1.000 |

### Key Insights

* **Purification matters** – Gram-Schmidt orthogonalization adds ~15pp of refusal suppression on Qwen2.5-7B at no capability cost
* **Layer selection is dominant** – The winning layer transfers by relative depth (~57–58%) across model sizes
* **Easy benchmarks hide the cost** – ARC-Easy reads 1.000 before and after; MMLU-Pro reveals the real 3.3pp drop

---

## How It Works

1. **Prepare data** – Builds harmful/harmless prompt sets and a capability MCQ subset on a shared Modal Volume
2. **Extract directions** – Runs one forward pass per prompt and computes a per-layer refusal direction
3. **Sweep** – Tests candidate layers across coefficients, grading refusal and capability
4. **Full pipeline** – Runs baseline, runtime-hook ablation, and permanent weight ablation at the winning operating point
5. **Benchmark** – Measures MMLU-Pro accuracy and harmless-prompt KL divergence against the base model
6. **Publish** – Reshards the edited checkpoint and pushes it to the Hugging Face Hub

---

## Tech Stack

### Core

* **Python 3.11** – Pipeline and evaluation code
* **PyTorch** – Activation extraction, hooks, and weight edits
* **Transformers** – Model loading across Llama, Qwen, and Gemma families

### Infrastructure

* **Modal** – Serverless GPU orchestration (H100 / B200)
* **Hugging Face Hub** – Model and dataset access, checkpoint publishing

### Testing

* **pytest** – 60 CPU-only unit tests, including architecture tests on tiny random models

---

## Project Goals

* Make abliteration reproducible and measurable, not a one-off trick
* Quantify the capability cost of refusal removal with benchmarks hard enough to show it
* Support modern hybrid and sandwich-norm architectures correctly
* Keep GPU runs cheap and predictable through bounded sweeps
