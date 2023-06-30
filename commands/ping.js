const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("윾")
    .setDescription("아이고 윾승아"),
  async execute(interaction) {
    await interaction.reply("승");
  },
};
