function MediaPlayer(source) {
  this.source = source;
  console.log("fps=", source.fps);
}

MediaPlayer.prototype.play = function() {
  var self = this;
  var BUFFERING_SIZE = 200;
  var audioQueue = [];
  var videoQueue = [];
  var fps = this.source.fps;

  if (fps != 0) {
    this.videoPlayer = setInterval(function() {
      if (videoQueue.length <= 0) {
        return;
      }
      self.onVideoFrame && self.onVideoFrame(videoQueue.shift());
    }, 1000 / fps);
  }

  var audioFreq = this.source.audioFreq;
  var twentyMsSamples = audioFreq / (1000 / 20);

  if (audioFreq != 0) {
    this.audioPlayer = setInterval(function() {
      if (audioQueue.length <= 0) {
        return;
      }
      self.onAudioFrame && self.onAudioFrame(audioQueue.shift());
    }, 26);
  }

  // obtain freqs for playback
  this.bufferingTimer = setInterval(function() {
    if (videoQueue.length > BUFFERING_SIZE) {
      return;
    }
    var frame = self.source.read();
    if (!frame) return;
    ((frame.isAudio) ? audioQueue : videoQueue).push(frame);
  }, 10);
};

MediaPlayer.prototype.stop = function() {
  clearInterval(this.bufferingTimer);
  clearInterval(this.videoPlayer);
  clearInterval(this.audioPlayer);
};

module.exports = MediaPlayer;
