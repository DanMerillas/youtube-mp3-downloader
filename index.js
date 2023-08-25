const yt = require("yt-converter");
const readline = require('node:readline');
const ytlist = require('youtube-playlist');
const { Client, MusicClient } = require("youtubei");


const youtube = new Client();
let totalVideos = 1
let downloadedVideos = 0



const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });


rl.question('Url de youtube: ', (url) => {
    //console.log(`¡Hola, ${nombre}!`);

    if (url.toLocaleLowerCase().indexOf("playlist") === -1) {
        downloadOneMp3FromUrl(url);
    } else {
        getPlayList(url);
    }


    rl.close();
});

//const url = "https://www.youtube.com/watch?v=UsR08cY8k0A";

const getPlayList = async (url) => {
const playlist = await youtube.getPlaylist(url.split('?list=')[1]);
	console.log(playlist.videos.items.length); // first 100 videos;
    totalVideos = playlist.videos.items.length;
    playlist.videos.items.forEach(video => {
        downloadOneMp3FromUrl(video.id);
    });
}

const onClose = (data) => {
    downloadedVideos++;
    console.log(`Descarga finalizada: ${downloadedVideos} de ${totalVideos}`);
}

function downloadOneMp3FromUrl(url) {
    yt.getInfo(url).then(info => {

        console.log(`video: ${info.author.name} -> ${info.title}`);

        yt.convertAudio({
            quality: "highestaudio",
            url: url,
            itag: 140,
            directoryDownload: "./songs/",
            title: info.title,
        }, undefined, onClose);
    });
}
