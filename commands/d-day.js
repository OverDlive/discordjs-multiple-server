const { SlashCommandBuilder } = require("@discordjs/builders");

// Function to calculate the remaining days from the current date to a target date
function remainingDaysToTarget(targetDate) {
    let currentDate;
    let difference;

    if (targetDate === "2024-05-13") {
        currentDate = new Date();
        difference = new Date(targetDate) - currentDate;
    } else {
        currentDate = new Date(targetDate);
        difference = new Date("2024-05-13") - currentDate;
    }

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("군생활")
        .setDescription("전역날까지 남은 날짜 계산하기")
        .addStringOption((option) =>
        option.setName("date").setDescription("목표 일자 (YYYY-MM-DD)").setRequired(false)
        ),
    async execute(interaction) {
        const targetDate = interaction.options.getString("date");
        const remainingDays = targetDate ? remainingDaysToTarget(targetDate) + 1 : remainingDaysToTarget("2024-05-13");
        let response;

        if (remainingDays === 0) {
        response = "오늘은 전역입니다!";
        } else if (remainingDays > 0) {
        response = `# 전역날까지 ${remainingDays}일 남았습니다.`;
        } else {
        response = "전역했다. 윾승아";
        }

        if (targetDate) {
        response += ` (기준 날짜: ${targetDate})`;
        }

        await interaction.reply(response);
    },
};
