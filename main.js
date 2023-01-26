var audioContext;
var samples;
var liveCodeState = [];
var changed = false;
var prevCode = document.getElementById("code").value;

document.getElementById("code").style.width = "800px";
document.getElementById("code").style.fontSize = "14pt";

const startCtxBtn = document.querySelector(".start");
const setupSamplesBtn = document.querySelector(".setup-samples");
const playSampleBtn = document.querySelector(".play-sample");
const playSampleBtn2 = document.querySelector(".play-sample2");
const playSampleBtn3 = document.querySelector(".play-sample3");
const playSampleBtn4 = document.querySelector(".play-sample4");
const playSampleBtn5 = document.querySelector(".play-sample5");
const playSampleBtn6 = document.querySelector(".play-sample6");
const playSampleBtn7 = document.querySelector(".play-sample7");
const evaluateBtn = document.querySelector(".evaluate");

const samplePaths = [
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv_0.wav?v=1670522599910",
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv_1.wav?v=1670522604559",
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv__01.wav?v=1670522565009",
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv__02.wav?v=1670522577454",
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv__03.wav?v=1670522584277",
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv__04.wav?v=1670522590041",
  "https://cdn.glitch.global/885cfa9f-0b47-46a3-b20b-05c650e7020e/cxvv__05.wav?v=1670522595144",
];

startCtxBtn.addEventListener("click", () => {
  audioContext = new AudioContext();
  console.log("Audio Context Started");
});

setupSamplesBtn.addEventListener("click", () => {
  setupSamples(samplePaths).then((response) => {
    samples = response;
    console.log(samples);
    playSampleBtn.addEventListener("click", () => {
      const playing = playSample(samples[0], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });

    playSampleBtn2.addEventListener("click", () => {
      const playing = playSample(samples[1], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });

    playSampleBtn3.addEventListener("click", () => {
      const playing = playSample(samples[2], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });

    playSampleBtn4.addEventListener("click", () => {
      const playing = playSample(samples[3], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });

    playSampleBtn5.addEventListener("click", () => {
      const playing = playSample(samples[4], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });

    playSampleBtn6.addEventListener("click", () => {
      const playing = playSample(samples[5], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });

    playSampleBtn7.addEventListener("click", () => {
      const playing = playSample(samples[6], 0);
      console.log(playing);
      length = playing.buffer.duration * 1000;
      setTimeout(() => {
        playing.stop();
      }, length);
    });
  });
});

async function getFile(filePath) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return audioBuffer;
}

async function setupSamples(paths) {
  console.log("Setting up samples");
  const audioBuffers = [];

  for (const path of paths) {
    const sample = await getFile(path);
    audioBuffers.push(sample);
  }
  console.log("Set up done");
  return audioBuffers;
}

function playSample(audioBuffer, time) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioContext.destination);
  sampleSource.start(time);
  return sampleSource;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function playBeat(beat) {
  if (beat == "intro") {
    const playing = playSample(samples[0], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else if (beat == "drive") {
    const playing = playSample(samples[1], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else if (beat == "beat1") {
    const playing = playSample(samples[2], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else if (beat == "beat2") {
    const playing = playSample(samples[3], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else if (beat == "beat3") {
    const playing = playSample(samples[4], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else if (beat == "beat4") {
    const playing = playSample(samples[5], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else if (beat == "beat5") {
    const playing = playSample(samples[6], 0);
    length = playing.buffer.duration * 1000;
    setTimeout(() => {
      playing.stop();
    }, length);
  } else {
    console.log("Not a recongizeable beat");
    return 0;
  }
  return length;
}

async function scheduler() {
  var savedState = liveCodeState;
  for (let i = 0; i < liveCodeState.length; i++) {
    if (liveCodeState != savedState) {
      return;
    }
    var beat = liveCodeState[i];
    var length = playBeat(beat);
    await sleep(length);

    // reset i
    if (i == liveCodeState.length - 1) {
      i = -1;
    }
  }
}

evaluateBtn.addEventListener("click", () => {
  var code = document.getElementById("code").value;
  if (code == prevCode) {
    changed = false;
  } else {
    liveCodeState = [];
    changed = true;
    prevCode = code;
    var data = code.split(" ");
    liveCodeState = data;
    scheduler();
  }
});
