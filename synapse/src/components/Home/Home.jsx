import { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import HomeStyles from './Home.module.css';
import useInterval from '../../hooks/useInterval';
import Results from '../Results/Results';
import ImageViewer from '../ImageViewer/ImageViewer';
import video from '../../assets/logo.gif'

export default function Home() {
    const [displayVerticalBar, setDisplayVerticalBar] = useState('block');
    const [isWriting, setIsWriting] = useState(false);
    let [searchText, setSearchText] = useState("");
    const [lastTags, setLastTags] = useState([]);
    const [imageViewerFileName, setImageViewerFileName] = useState('');
    const [imageViewerPath, setImageViewerPath] = useState('');

    const refSpeech = useRef(null);
    const refLogoVisible = useRef(false);

    const phrases = [
        'sign',
        'synapse',
    ]

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

    useEffect(() => {
        startRecording();
        refLogoVisible.current = true; 
    }, []);

    useInterval(() => {
        if (phrases.filter((phrase) => refSpeech.current.value.includes(phrase)).length) {
            console.log('here');
            refSpeech.current.value = "";
            setIsWriting(true);
            resetTranscript();
        }

        if (isWriting) {
            setIsWriting(true);
            setSearchText(refSpeech.current.value);
        }

    }, 100)
    
    useEffect(() => {
        setTimeout(() => {
            setIsWriting(false);    
        },10000)     
    },[isWriting]);

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
                                <>
                                    <img src={video} alt="my-gif" id={HomeStyles.logo} className={'animate__animated animate__fadeIn'}/>
                                    <input
                                        type="text"
                                        value={refSpeech.current.value}
                                        placeholder='Write something stupid'
                                    />
                                </>
                                :
                                <>
                                    <input onChange={handleSearchInputChange} value={searchText} type="text" placeholder='Write something stupid' />
                                    <img style={refLogoVisible ? {display: 'none'} : {display: 'flex'}} src={video} alt="my-gif" id={HomeStyles.logo} className={'animate__animated animate__fadeOut'}/>
                                </>
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