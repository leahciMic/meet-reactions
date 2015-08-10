# Meet reactions (POC)

This is a proof of concept allowing you to stream youtube videos into a meet.tokbox.com session.

Warning: This is a proof-of-concept, and ymmv. You're on your own.

## Compile tbmedia

Clone http://github.com/opentok/tbmedia and compile it for your platform (at the time of writing this, I
was only able to compile it with node 0.10.x).

### Link the built module

In `lib/player.js` you'll see `var tbmedia = require('../../tbmedia-module/tbmedia.js');`. Change this so it points
to your version of the built tbmedia module.


## Run

```sh
node index.js
```

It will run on port 5000, so head to http://localhost:5000 
