const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, MessageSelectMenu, PermissionFlagsBits, SelectMenuBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Testing Command'),
  async execute(interaction, client) {


const embed = new EmbedBuilder()
        .setThumbnail(interaction.guild.iconURL())
    .setDescription(`> This is the "test" command for the Discord.js V14 Slash Command Handler`)
    .setFooter({ text: `Made with ❤️ by Clayy`, iconURL: 'https://images-ext-1.discordapp.net/external/X0X5kIzoq01JT28MJDqdA44ObBDQryHpuR1nJ-HOIME/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/694367588464984095/0cdead47bc5e66c7db71094c1c4ab353.png?format=webp&quality=lossless&width=171&height=171' })
    .setColor('#001546');



interaction.reply({ embeds:[embed] })


  }
}
