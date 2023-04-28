import { useState, useRef, useEffect } from 'react';
import ResultsStyles from './Results.module.css';

export default function Result(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry =>{
            setVisible(entry.isIntersecting)});
        });

        observer.observe(domRef.current);
    }, []);

    return (
        <div className={`${ResultsStyles.result} fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
            <div className={ResultsStyles.infoWrapper}>
                <img className={ResultsStyles.resultImage} src={props.imageLink} />

                <div className={ResultsStyles.fileData}>
                    <p className={ResultsStyles.filename}>Test name</p>

                    <div className={ResultsStyles.filePathAndDateOfSave}>
                        <p className={ResultsStyles.filePath}>G:\Design\Projects_Design_Freelance\RetouchedIllustrations</p>
                        <p className={ResultsStyles.dateOfSave}>05.03.2023</p>
                    </div>
                </div>
            </div>  
        </div>
    );
}