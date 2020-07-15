/*
    Аудио граф

    Source (источник звука) -> GainNode -> (модуль громкости) -> Destination (Выходной сигнал)
*/


(() => {
    /*
        Для cross browser
    */
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    let сtx = null;
    let track = null;

    const audio = document.getElementById('audio'); // re-name audioCtx (??)

    const start = document.getElementById('start');
    const stop = document.getElementById('stop');

    const init = () => {
        /*
            Создаем audio context
        */
        сtx = new AudioContext();
        console.log(сtx);

        /*
            * createMediaElementSource:
            -    используется для создания объекта MediaElementAudioSourceNode из существующих
            -    HTML элементов <audio> или <video> для дальнейших манипуляций со звуком и его воспроизведения.
        */
        track = сtx.createMediaElementSource(audio);
        console.log(track);

        /*
            * gainNode == volume (громкость)
            -    Интерфейс GainNode отвечает за изменение громкости;
            -    перевод - усиление

            * createGain
                - создает новый экземпляр gainNode;
        */
        const gainNode = сtx.createGain();
        console.log(gainNode);

        const volume = document.getElementById('volume');

        volume.addEventListener(`input`, event => {
            const value = event.target.value;

            /*
                gainNode.gain - величина усиления
            */

            /*
                * setValueAtTime(value, startTime)
                -   value - значение, на которое изменится параметр в данный момент времени;
                -   startTime - время в той же системе координат времени, что и AudioContext.currentTime;
            */

            /*
                gainNode.gain.setValueAtTime(value, сtx.currentTime) - Планирует изменение значения параметра в указанное время;

                либо напрямую:

                gainNode.gain.value = value - изменяем величину усиления громкости
            */
            gainNode.gain.setValueAtTime(value, сtx.currentTime);
        });

        track.connect(gainNode).connect(сtx.destination); // (??)
    };

    start.addEventListener('click', function () {
        if (!сtx) init();

        audio.play();
    });

    stop.addEventListener('click', function () {
        audio.pause();
    });

    audio.addEventListener('ended', () => console.log('track ended'), false);
})();
