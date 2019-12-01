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
    const audio = document.getElementById('audio');

    // event.data contains a blob representing the recording
    const { data } = event;
    audio.src = URL.createObjectURL(data);
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