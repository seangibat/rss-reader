(function(){
    'use strict';
    var text, utterance, settings = {};

    var textFn = function(str){
        text = str;
    }

    var settingsFn = function(set){
        if (!set) return settings;

        settings.voice = set.voice || settings.voice;
        settings.rate = set.rate || settings.rate;
        settings.pitch = set.pitch || settings.pitch;
        settings.volume = set.volume || settings.volume;
    }

    var speakFn =  function(){
        var _text = text.replace(/\n/g,' '), chunk;

        console.log(_text);

        var createNewChunkUtterance = function(){
            var chunk = _text.match(/(^.{1,250}[!.?])|(^.{1,250})/g);
            if (!chunk) return null;
            chunk = chunk[0];
            _text = _text.substring(chunk.length);
            utterance = new SpeechSynthesisUtterance(chunk);
            utterance.voice = settings.voice;
            utterance.rate = settings.rate || 1;
            utterance.pitch = settings.pitch || 1;
            utterance.volume = settings.volume || 1;
            return utterance;
        }

        var play = function(){
            speechSynthesis.cancel();
            var utterance = createNewChunkUtterance();
            if (!utterance) return;
            speechSynthesis.speak(utterance);
            utterance.onend = function(){
                play();
            };
        }

        if (speechSynthesis.speaking) stopFn();
        play();
    }

    var pauseFn = function(){
        speechSynthesis.pause();
    }

    var resumeFn = function(){
        speechSynthesis.resume();
    }

    var stopFn = function(){
        utterance.onend = null;
        speechSynthesis.cancel();
    }

    var voiceFn = function(name, lang){
        var v = speechSynthesis.getVoices().filter(function(voice) { 
            return (voice.name.indexOf(name) >= 0) && (lang ? (voice.lang.indexOf(lang) >= 0) : true)
        })[0];
        if (v) return settings.voice = v;
        return null;
    }

    voiceFn('Bruce');

    window.speaker = {
        speak    : speakFn,
        text     : textFn,
        settings : settingsFn,
        pause    : pauseFn,
        resume   : resumeFn,
        stop     : stopFn,
        voice    : voiceFn,
    }
})();