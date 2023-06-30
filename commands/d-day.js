const { SlashCommandBuilder } = require("@discordjs/builders");

// Function to calculate remaining days to the target date or until the next midnight in Korea time
function remainingDaysToTargetOrMidnightKorea(targetDate) {
    const koreaTimezoneOffset = 9; // UTC+9 for Korea timezone
    const currentDate = new Date();
    const currentKoreaHour = currentDate.getUTCHours() + koreaTimezoneOffset;

    if (targetDate) {
        const difference = new Date(targetDate) - currentDate;
        return Math.ceil(difference / (1000 * 60 * 60 * 24));
    } else {
        // Calculate the remaining hours and minutes until midnight in Korea time
        const remainingHours = 24 - currentKoreaHour - 1; // Minus one hour as we are calculating until the next midnight
        const remainingMinutes = 60 - currentDate.getUTCMinutes();

        // Convert remaining hours and minutes to milliseconds
        const remainingMilliseconds = remainingHours * 60 * 60 * 1000 + remainingMinutes * 60 * 1000;

        // Calculate the remaining days by dividing the remaining milliseconds by the number of milliseconds in a day
        return Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
    }
}

const currentDate = new Date();

// Get the current hour, minute, and second
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();
const currentSecond = currentDate.getSeconds();

// Format the current time as a string
const currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;

console.log(currentTime);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("군생활")
        .setDescription("윾승이 남은 군생활이 나옵니다.")
        .addStringOption((option) =>
        option.setName("date").setDescription("목표 일자 (YYYY-MM-DD)").setRequired(false)
        ),
    async execute(interaction) {
        const targetDate = interaction.options.getString("date");
        const remainingDays = remainingDaysToTargetOrMidnightKorea(targetDate);

        if (targetDate) {
        await interaction.reply(`남은 군생활: ${remainingDays}일!`);
        } else {
        await interaction.reply(`남은 군생활: ${remainingDays}일!`);
        }
    },
};