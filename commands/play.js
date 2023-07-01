const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');

const youtubeApiKey = 'AIzaSyB-wBk4b7ZugvgzATyh8yf5TScWY3DiFu0';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("음성 채널에서 노래를 재생합니다.")
        .addStringOption(option =>
        option.setName('song')
            .setDescription('노래 제목 또는 YouTube URL')
            .setRequired(true)),
    async execute(interaction) {
        const song = interaction.options.getString('song');

        const member = interaction.member;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
        return await interaction.reply('음성 채널에 먼저 들어가야 합니다!');
        }

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            connection.on('error', (error) => {
                console.error('연결 오류:', error);
            });

            const player = createAudioPlayer();
            connection.subscribe(player);

            let videoURL;

            if (ytdl.validateURL(song)) {
                videoURL = song;
            } else {
                const searchOptions = { maxResults: 1, key: youtubeApiKey };
                const searchResults = await youtubeSearch(song, searchOptions);
                if (searchResults.results.length === 0) {
                return await interaction.reply('해당 노래에 대한 검색 결과가 없습니다.');
                }
                videoURL = searchResults.results[0].link;
            }

            const resource = createAudioResource(ytdl(videoURL), { inlineVolume: true });

            player.play(resource);

            player.on('error', (error) => {
                console.error('오디오 플레이어 오류:', error);
            });

            console.log('음성 연결:', connection);
            console.log('오디오 플레이어:', player);

            await interaction.reply('노래를 재생합니다!');
        } catch (error) {
            console.error('노래를 재생하는 중에 오류가 발생했습니다:', error);
            await interaction.reply('노래를 재생하는 중에 오류가 발생했습니다.');
        }
    },
};
