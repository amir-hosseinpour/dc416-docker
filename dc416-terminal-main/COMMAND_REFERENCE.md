# Terminal Command Modification Guide

This guide explains how to modify the commands in the WebShell terminal.

## Overview

- **Configuration:** Most content (text, links, colors) is managed in `config.json`.
- **Logic:** Command logic is located in `src/commands/`.
- **Registration:** Commands are registered in `src/main.ts`.

## Modifying Specific Commands

### 1. `events`
- **Content:** Update the `events` array in `config.json`.
- **Logic:** `src/commands/events.ts`.
- **Formatting:** Supports `\n` for newlines and `\t` for indentation (4 spaces).

### 2. `rsvp`
- **Link:** Update `meetupLink` in `config.json`.
- **Logic:** `src/main.ts` (inside `commandHandler`, `case 'rsvp'`).

### 3. `about`
- **Greeting:** Update `aboutGreeting` in `config.json`.
- **Social Links:** Update `social` object in `config.json`.
- **Logic:** `src/commands/about.ts`.

### 4. `help`
- **List of Commands:** Update `src/commands/help.ts`.
- **Note:** If you add a new command, you must add it to the `COMMANDS` array in `src/main.ts` and the help list in `src/commands/help.ts`.

### 5. `banner` (Startup Message)
- **ASCII Art:** Update `ascii`, `mobileAscii`, `tinyAscii` in `config.json`.
- **Logic:** `src/commands/banner.ts`.

## Exceptions & Special Rules

- **`sudo` / `rm -rf`:** These are "easter egg" commands with hardcoded logic in `src/main.ts`. Changing them requires editing the `commandHandler` function directly.
- **`clear`:** Logic is built-in to `src/main.ts`.
