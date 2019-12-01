const createAudio = src => {
    const element = document.createElement('audio');
    element.controls = true;
    element.src = src;
    element.className = 'audio';

    return element;
}

const addAudio = src => {
    const root = document.getElementById('root');
    const audio = createAudio(src);
    root.append(audio);
}

/*
    constraints (or MediaStreamConstraints):
    ex: { audio: true, video: true }
*/
const getMediaStream = (constraints) => navigator.mediaDevices.getUserMedia(constraints);

const startRecording = recorder => {
    console.log('call startRecording()', recorder)
    recorder.start();
}

const stopRecording = recorder => {
    console.log('call stopRecording()', recorder)
    recorder.stop();
}

const onRecordingReady = event => {
    console.log('call onRecordingReady', event);

    // event.data contains a blob representing the recording
    const { data } = event;
    const src = URL.createObjectURL(data);

    addAudio(src);
};

const init = async () => {
    console.info('%c%s', 'color: green;', 'window onload');

    const start = document.getElementById('start');
    const stop = document.getElementById('stop');

    try {
        const mediaStream = await getMediaStream({ audio: true });
        console.log(mediaStream);

        const recorder = new MediaRecorder(mediaStream);
        console.log(recorder);

        start.addEventListener('click', () => startRecording(recorder));
        stop.addEventListener('click', () => stopRecording(recorder));

        recorder.addEventListener('dataavailable', onRecordingReady);

    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('load', init)