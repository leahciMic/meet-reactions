var ytdl = require('ytdl-core');
var fs = require('fs');
var tbmedia = require('../../tbmedia-module/tbmedia.js');
var MediaSink = tbmedia.MediaSink;
var OTKSession = tbmedia.OTKSession;
var OTKSubscriber = tbmedia.OTKSubscriber;
var OTKPublisher = tbmedia.OTKPublisher;
var OTKAudio = tbmedia.OTKAudio;
var MediaFrame = tbmedia.MediaFrame;
var MediaSource = tbmedia.MediaSource;
var VideoMixer = tbmedia.VideoMixer;
var temp = require('temp');

var room = process.env.room;
var video = process.env.video;

temp.track();

var MediaPlayer = require('../lib/mediaplayer.js');
var connectors = require('../lib/connectors.js');

connectors.getMeetSessionInfo(room, function(err, sessionInfo) {
  console.log('Got session info');
  var session = new OTKSession(sessionInfo.apiKey, sessionInfo.sid);

  session.onConnected = function() {
    console.log('Connected to session');
    var stream = temp.createWriteStream();
    console.log(stream.path);
    var youtubeStream = ytdl(video, { filter: function(format) { return format.container === 'mp4'; } });
    youtubeStream.pipe(stream);
    youtubeStream.on('end', function() {
      var ms = new MediaSource(stream.path);
      var mp = new MediaPlayer(ms);
      var pub = new OTKPublisher();
      var audioDevice = new OTKAudio();

      pub.onStreamCreated = function(stream) {
        mp.play();
        mp.onVideoFrame = function(frame) {
          pub.send(frame);
        };
        mp.onAudioFrame = function(frame) {
          audioDevice.write(frame);
        };
      };

      session.publish(pub);
      // mp.onAudioFrame = function(frame) {
      //   if (audioStarted) {
      //     audioDevice.write(frame);
      //   }
      // };
    });
  };

  if (sessionInfo.anvil) {
    session.connect(sessionInfo.token, sessionInfo.anvil);
  } else {
    session.connect(sessionInfo.token);
  }
});
