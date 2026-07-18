# HoneyBot - Discord Anti-Spam Honeypot

HoneyBot is a lightweight, automated security tool designed to protect your Discord server from spam bots by creating a "honeypot" trap channel. Any non-administrator user who types in this channel will be automatically banned.

## How to Set Up

### 1. Create your Discord Bot
Before running the bot, you need to register it on the Discord Developer Portal:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **"New Application"** and give it a name (e.g., HoneyBot).
3. In the left sidebar, click **"Bot"**.
4. Under **"Privileged Gateway Intents"**, enable:
   - **Message Content Intent** (CRITICAL for the bot to read messages).
   - **Server Members Intent**.
5. Click **"Reset Token"** (or "Copy Token") to get your bot's token. **Keep this secret!**

### 2. Installation
1. Download the HoneyBot folder as a **.zip** file.
2. Extract the contents to a folder on your computer.
3. Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 3. How to Run
Simply double-click the **`AVVIA_BOT.bat`** file to start the bot.

- **First-time setup:** A black window will open. It will automatically install the necessary libraries and ask you to paste your **Discord Bot Token**. After pasting it, the bot will create a configuration file (`.env`) and start immediately.
- **Subsequent runs:** You just need to double-click **`AVVIA_BOT.bat`** and the bot will launch instantly using your saved settings.

## Usage
Once the bot is online:
- Use the slash command `/hp-setup` in your server to configure the honeypot trap channel.
- Any user (except Administrators) who sends a message in that channel will be instantly banned.

---
*Created by DS .nicoki.*
