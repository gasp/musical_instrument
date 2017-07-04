const pitch = 1.750;
const tracks = [null, null];


loadSample('samples/808lt/LT00.WAV', function (buffer){
    tracks[0] = buffer;
});
loadSample('samples/808cy/CY0000.WAV', function (buffer){
    tracks[1] = buffer;
});



function playSound(buffer, time){
    var player = context.createBufferSource();
    player.buffer = buffer;
    player.loop = false;
    player.connect(context.destination);
    player.start(time);
}

// this code will wake up every (wait_time) ms
// and schedule a load of drum triggers on the clock
// each time, remembering where it scheduled to in the future
// so it does not repeat anything
var wait_time = 0.750;
var got_up_to;

setInterval(function(){
    var now = context.currentTime;

    // how far into the future will we schedule?
    // we schedule beyond the next wait time as we cannot
    // rely on it being exactly 'wait_time' ms before
    // we get woken up again, therefore put in a few
    // extra events on the scheduler to cover any delays
    var max_future_time = now + (wait_time  * 1.5);
    if (got_up_to > now) {// already scheduled up to this point
        now = got_up_to;
    }

    while (now <= max_future_time){
      tracks.forEach((t) => {
        if (t !== null) {
          playSound(t, now);
        }
      })

      now += pitch;
    }
    got_up_to = now;

}, wait_time * 1000);


function loadSample(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function(){
        var audioData = request.response;
        context.decodeAudioData(audioData, function(buffer) {
            console.log(buffer);
            callback(buffer);
        });
    };
    request.send();
}
