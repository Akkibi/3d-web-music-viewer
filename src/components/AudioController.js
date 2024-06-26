import gsap from "gsap";
class AUDIO_CONTROLLER {
  setup() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.audio = new Audio();
    this.audio.volume = 0.25;
    this.audio.crossOrigin = "anonymous";
    this.audioSource = this.ctx.createMediaElementSource(this.audio);

    this.analyzer = new AnalyserNode(this.ctx, {
      fftSize: 1024,
      smoothingTimeConstant: 0.8,
    });

    this.fdata = new Uint8Array(this.analyzer.frequencyBinCount);

    this.audioSource.connect(this.analyzer);
    this.audioSource.connect(this.ctx.destination);

    gsap.ticker.add(this.tick);
  }

  updateSong(preview) {
    this.audio.src = preview;
    this.audio.currentTime = 0;
    this.audio.play();
  }
  tick = () => {
    this.analyzer.getByteFrequencyData(this.fdata);
  };
  pause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}

const AudioController = new AUDIO_CONTROLLER();
export default AudioController;
