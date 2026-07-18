import { Client, GatewayIntentBits, PermissionFlagsBits, ChannelType } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import * as readline from 'readline/promises';

dotenv.config();

// --- AUTOMATED SETUP FOR TOKEN ---
async function initializeBot() {
    if (!process.env.DISCORD_TOKEN) {
        console.log("==========================================");
        console.log("🍯 HONEYBOT - INITIAL SETUP");
        console.log("==========================================");
        console.log("It seems like this is your first run or the .env file is missing.");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const answer = await rl.question("\n>> Please paste your DISCORD_TOKEN here: ");
        
        fs.writeFileSync('.env', `DISCORD_TOKEN=${answer.trim()}`);
        console.log("\n✅ [SUCCESS] .env file created! Starting the bot...\n");
        
        process.env.DISCORD_TOKEN = answer.trim();
        rl.close();
    }

    startBot();
}

// --- MAIN BOT LOGIC ---
function startBot() {
    const DB_FILE = './database.json';

    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({}));
    }

    const getDatabase = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const saveDatabase = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 4));

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    client.once('clientReady', async () => {
        console.log(`[SYSTEM] HoneyBot is online as ${client.user.tag}.`);

        try {
            await client.application.commands.set([
                {
                    name: 'hp-setup',
                    description: 'Configure the honeypot trap channel.',
                    defaultMemberPermissions: PermissionFlagsBits.Administrator.toString(),
                    options: [{
                        name: 'channel',
                        description: 'The text channel to use as trap.',
                        type: 7,
                        required: true
                    }]
                }
            ]);
            console.log('[SYSTEM] Slash commands registered.');
        } catch (error) {
            console.error('[ERROR] Failed to register commands:', error);
        }
    });

    // --- INTERACTION HANDLING ---
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'hp-setup') {
            const targetChannel = interaction.options.getChannel('channel');
            const db = getDatabase();
            db[interaction.guildId] = targetChannel.id;
            saveDatabase(db);
            await interaction.reply({ content: `✅ **HoneyBot Active.** Channel ${targetChannel} configured as trap.`, ephemeral: true });
        }
    });

    // --- LIVE MONITORING ---
    client.on('messageCreate', async (message) => {
        if (message.author.bot || !message.guild) return;
        
        const db = getDatabase();
        const trapChannelId = db[message.guild.id];
        if (!trapChannelId || message.channel.id !== trapChannelId) return;
        
        if (message.member?.permissions.has('Administrator')) return;

        try {
            await message.delete().catch(() => {});
            await message.guild.members.ban(message.author.id, { 
                reason: 'Honeypot Security: Spam bot detected.' 
            });
            console.log(`[ACTION] Banned ${message.author.tag} in ${message.guild.name}.`);
        } catch (error) {
            console.error(`[ERROR] Failed to ban ${message.author.tag}:`, error);
        }
    });

    client.login(process.env.DISCORD_TOKEN);
}

// Avvio
initializeBot();