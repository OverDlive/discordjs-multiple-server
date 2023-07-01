const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("5대기")
    .setDescription("5대기 출동 여부를 알려줍니다."),
  async execute(interaction) {
    await interaction.reply("무조건 가라");
  },
};
