// getUserMedia block - grab stream
// put it into a MediaStreamAudioSourceNode

if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia ({audio: true})
    .then(function(stream) {
        var source = context.createMediaStreamSource(stream);
        // and use mediaRecorder
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

        // Create a biquadfilter
        var biquadFilter = context.createBiquadFilter();
        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.value = 1000;
        biquadFilter.gain.value = 50;

        // connect the AudioBufferSourceNode to the gainNode
        // and the gainNode to the destination, so we can play the
        // music and adjust the volume using the mouse cursor
        source.connect(biquadFilter);
        biquadFilter.connect(amp);

        // range.oninput = function() {
        //     biquadFilter.gain.value = range.value;
        // }
    })
    .catch(function(err) {
        console.log('The following getUserMedia error occured: ' + err);
    });
} else {
   console.log('getUserMedia not supported on your browser!');
}
