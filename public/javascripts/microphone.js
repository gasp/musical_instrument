class Microphone {
  constructor() {
    const that = this;
    navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
      that.stream = stream;
      that.mediaRecorder = new MediaRecorder(stream);
    });
    this.chunks = [];
    this.reader = new FileReader();
  }

  record() {
    this.mediaRecorder.start();
    this.mediaRecorder.ondataavailable = function(e) {
      this.chunks.push(e.data);
    }
  }
  stop() {
    const blob = new Blob(this.chunks, {
      'type': 'audio/wav'
    });
    this.chunks = []; // empty chunks

    reader.addEventListener("loadend", function() {
      // this should be promisified and/or sent to worker
      console.log('mic: sound buffer us available');
    });
    reader.readAsArrayBuffer(blob);
  }
  get() {
    // play with
    // context.decodeAudioData(reader.result, function(buffer) {
    //   playsound(buffer);
    // },
    // function(e) {
    //   console.log("error ", e)
    // });
    return reader.result;
  }
}
