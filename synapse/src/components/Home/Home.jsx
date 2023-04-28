import { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import HomeStyles from './Home.module.css';
import useInterval from '../../hooks/useInterval';
import Results from '../Results/Results';

export default function Home() {
    const [displayVerticalBar, setDisplayVerticalBar] = useState('block');
    const [isWriting, setIsWriting] = useState(false);

    const refSpeech = useRef(null);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const removeVerticalLine = (e) => {
        const inputValue = e.target.value;
        const newDisplayValue = (inputValue === '' ? 'block' : 'none')
        setDisplayVerticalBar(newDisplayValue);
    }

    const startRecording = () => {
        SpeechRecognition.startListening({ continuous: true, language: "en-US"});
    };

    useEffect( () => {
        startRecording(); 
        
    }, []);
    
    useInterval(() => {
        if (refSpeech.current.value.includes("something")) {
                refSpeech.current.value = "";
                setIsWriting(true);
                resetTranscript();
            }
    }, 100)

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
            
    return (
<>
        <div>
            <div id={HomeStyles.searchBarWrapper}>
                <div id={HomeStyles.verticalBar} style={{display: displayVerticalBar}} ></div>
                <div id={HomeStyles.searchBar}>
                    {
                        isWriting
                            ?
                        <input onChange={removeVerticalLine} type="text" value={refSpeech.current.value} placeholder='Write something stupid' />
                            :
                        <input onChange={removeVerticalLine} type="text" placeholder='Write something stupid' />
                    }
                    <input ref={refSpeech} type='text' style={{display: 'none'}} value={transcript}/>
                </div>
            </div>

            {/* <div id={HomeStyles.outerTagsWrapper}>
                <div id={HomeStyles.tagsWrapper}>
                    <div className={HomeStyles.recentTag}>Tag one</div>
                    <div className={HomeStyles.recentTag}>Tag two</div>
                    <div className={HomeStyles.recentTag}>Tag three</div>
                </div>
            </div> */}

            <Results tags="world" />
         <div id={HomeStyles.fadeOutOverlay}></div>
        </div>
        </>

    );
}