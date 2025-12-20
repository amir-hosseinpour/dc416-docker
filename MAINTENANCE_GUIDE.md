# DC416 Website Maintenance Guide

This guide outlines step-by-step procedures for maintaining the website, specifically for managing events and deploying updates.

## Managing Events

Events are displayed in the terminal via the `config.json` file in the terminal project.

### File Location
`dc416-terminal-main/config.json`

### Event Format
Events are stored in the `events` array. Each event is a sub-array with 4 elements:
```json
[
  "Title",
  "Speaker Name",
  "Description",
  "URL"
]
```

### Formatting Tricks
- **New Lines:** Use `\n` within the description string to create a line break.
- **Indentation:** Use `\t` within the description string to add indentation (renders as 4 spaces).

### 1. Adding a New Event
1. Open `dc416-terminal-main/config.json`.
2. Find the `events` array.
3. Add a new array block at the top of the list (to show it first).
   ```json
   [
     "Feb 15: New Event Title",
     "Speaker: Jane Doe",
     "What you'll learn:\n\t- Skill A\n\t- Skill B",
     "https://meetup.link"
   ],
   ```

### 2. Moving Current Events to Past
Currently, the terminal only displays "Upcoming Events" (or simply "Events"). To "move" an event to past:

1. **Option A (Delete):** Simply remove the event array block from `config.json`.
2. **Option B (Archive):** Move the event block to a separate (unused) file for record-keeping, or create a `past_events` key in `config.json` (note: this key is not displayed by the terminal, it serves only as storage).

## Website Update Workflow

### Step-by-Step Update Guide

1. **Make Changes:**
   - Edit the necessary files (e.g., `config.json` for content, `src/` for logic).
   - Refer to `dc416-terminal-main/COMMAND_REFERENCE.md` for specific command details.

2. **Verify Locally:**
   - Open a terminal in `dc416-terminal-main`.
   - Run `npm run dev`.
   - specific check: Verify the output of `events` or `help` matches your expectations.

3. **Build the Project:**
   - Run `npm run build`.
   - Ensure there are no errors (exit code 0).

4. **Deploy:**
   - (Insert organization specific deployment steps here, e.g., git push, docker build, etc.)
   - If using Docker:
     - `docker-compose up --build -d`

## Troubleshooting
- **JSON Errors:** If the terminal screen is blank, check `config.json` for syntax errors (missing commas, unescaped quotes).
- **Formatting:** If `\n` or `\t` shows literally, ensure you are editing the JSON string correctly.
