import { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import HomeStyles from './Home.module.css';

export default function Home() {
    const [displayVerticalBar, setDisplayVerticalBar] = useState('block');

    const refSpeech = useRef(null);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const removeVerticalLine = (e) => {
        const inputValue = e.target.value;
        const newDisplayValue = (inputValue ? 'none' : 'block')
        setDisplayVerticalBar(newDisplayValue);
    }

    const startRecording = () => {
        SpeechRecognition.startListening({ continuous: true, language: "en-US"});
        resetTranscript();
    };

    useEffect( () => {
        startRecording();

        setInterval(() => {
            if (refSpeech.current.value.includes("white")) {
                console.log("here");
            }
        },1000)
    }, []);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <div id={HomeStyles.searchBarWrapper}>
                <div id={HomeStyles.verticalBar} style={{display: displayVerticalBar}} ></div>
                <div id={HomeStyles.searchBar}>
                    <input ref={refSpeech} onInput={removeVerticalLine} type="text" value={transcript} placeholder='Write something stupid' />
                </div>
            </div>

            <div id={HomeStyles.outerTagsWrapper}>
                <div id={HomeStyles.tagsWrapper}>
                    <div className={HomeStyles.recentTag}>Tag one</div>
                    <div className={HomeStyles.recentTag}>Tag two</div>
                    <div className={HomeStyles.recentTag}>Tag three</div>
                </div>
            </div>
        </div>
    );
}