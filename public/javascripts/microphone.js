let blob;

class Microphone {
  constructor() {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(stream);
    }).catch((e)=>{
      console.log('oh shit', e)
    });
    this.chunks = [];
    this.reader = new FileReader();
  }

  record() {
    this.mediaRecorder.start();
    console.log('🔴 recording baby!');
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    }
  }
  stop() {
    return new Promise((resolve, reject) =>{
      try {
        this.mediaRecorder.onstop = (e) => {
          const blob = new Blob(this.chunks, {
            'type': 'audio/wav'
          });
          this.reader.readAsArrayBuffer(blob);
          this.chunks = []; // empty chunks
        }
        this.reader.addEventListener("loadend", function() {
          console.log('mic: sound buffer is available');
          resolve(this.reader);
        });
        this.mediaRecorder.stop(); // stopping will end reader loading
      }
      catch (e) {
        reject(e);
      }
    });
  }
  get() {
    // play with
    // context.decodeAudioData(reader.result, function(buffer) {
    //   playsound(buffer);
    // },
    // function(e) {
    //   console.log("error ", e)
    // });
    // console.log('get: reader', this.reader, 'result', this.reader.result);
    return this.reader.result;
  }
}
