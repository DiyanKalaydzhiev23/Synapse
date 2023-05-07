import { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import HomeStyles from './Home.module.css';
import useInterval from '../../hooks/useInterval';
import Results from '../Results/Results';
import ImageViewer from '../ImageViewer/ImageViewer';

export default function Home() {
    const [displayVerticalBar, setDisplayVerticalBar] = useState('block');
    const [isWriting, setIsWriting] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [lastTags, setLastTags] = useState([]);
    const [imageViewerFileName, setImageViewerFileName] = useState('');
    const [imageViewerPath, setImageViewerPath] = useState('');

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
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    };

    const handleSearchInputChange = (e) => {
        removeVerticalLine(e);
        setSearchText(e.target.value);
    }

    const handleSearchInputSpeechChange = (e) => {
        refSpeech.current.value = e.target.value
        // console.log(e.target.value);
    }

    useEffect(() => {
        startRecording();
    }, []);

    useInterval(() => {
        if (refSpeech.current.value.includes("hello")) {
            refSpeech.current.value = "";
            setIsWriting(true);
            setSearchText(transcript)
            resetTranscript();
        }
    }, 100)

    const handleKeyDown = (e) => {
        if (e.keyCode === 8) {
            setSearchText(e.target.value.slice(0, -1));
            console.log(e.target.value);

        }
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <>
            <div>
                <div id={HomeStyles.searchBarWrapper}>
                    <div id={HomeStyles.verticalBar} style={{ display: displayVerticalBar }} ></div>
                    <div id={HomeStyles.searchBar}>
                        {
                            isWriting
                                ?
                                <input
                                    onChange={handleSearchInputSpeechChange}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    value={refSpeech.current.value}
                                    placeholder='Write something stupid'
                                />
                                :
                                <input onChange={handleSearchInputChange} value={searchText} type="text" placeholder='Write something stupid' />
                        }
                        <input ref={refSpeech} type='text' style={{ display: 'none' }} value={transcript} />
                    </div>
                </div>
                {searchText === ''
                        ?
                    <div id={HomeStyles.outerTagsWrapper}>
                        <div id={HomeStyles.tagsWrapper}>
                            {Array.from(new Set(lastTags)).slice(0, 3).map(t => 
                                <div className={HomeStyles.recentTag} onClick={(e) => {setSearchText(e.target.textContent)}}>{t}</div>
                            )}
                        </div>
                    </div>
                        :
                    <Results 
                        tags={searchText} 
                        setLastTags={setLastTags} 
                        setImageViewerFileName={setImageViewerFileName} 
                        setImageViewerPath={setImageViewerPath}
                    />
                }

                <ImageViewer 
                    imageViewerFileName={imageViewerFileName} 
                    imageViewerPath={imageViewerPath}
                    setImageViewerFileName={setImageViewerFileName}
                />

                <div id={HomeStyles.fadeOutOverlay}></div>
            </div>
        </>

    );
}