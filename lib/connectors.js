var request = require('request');

module.exports = {
  getOpentokRtcSessionInfo : function(roomName, cb) {
    request('http://opentokrtc.com/' + roomName + '.json', function(err, res) {
      if (err) {
        cb(err);
        return;
      }
      var sessionInfo = JSON.parse(res.body);
      cb(null, sessionInfo);
    });
  },

  getMeetSessionInfo : function(roomName, cb) {
    request('http://meet.tokbox.com/'+roomName, {headers:{'Accept':'application/json'}}, function(err, res) {
      if (err) {
        cb(err);
        return;
      }
      var info = JSON.parse(res.body);
      var sessionInfo = {sid: info.sessionId, apiKey: info.apiKey, token: info.token, anvil: 'anvil-tbdev.opentok.com'};
      cb(err, sessionInfo);
    });
  }
};

