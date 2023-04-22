import React, { useEffect, useLayoutEffect, useRef } from "react";
import speechIcon from "./speechIcon.svg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Speech.css";

function Speech() {

    const refSpeech = useRef(null);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect( () => {
        startRecording();

        setInterval(() => {
        console.log(transcript.current);
        if (transcript.current.textContent.includes("box")) {
            console.log("here");
        }
    },100)
    }, []);

    useEffect( () => {

    }, [refSpeech.current]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

  const startRecording = () => {
      SpeechRecognition.startListening({ continuous: true, language: "en-US"});
      resetTranscript();
  };

    return(
        <>
            <div ref={refSpeech}>
                <img src={speechIcon} alt="" />
                </div>
                
            <p className="color">Transcript: {transcript}</p>
        </>
    )
}

export default Speech;