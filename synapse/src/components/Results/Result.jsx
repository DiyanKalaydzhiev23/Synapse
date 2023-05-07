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
        <div 
            className={`${ResultsStyles.result} fade-in-section ${isVisible ? 'is-visible' : ''}`} 
            onClick={() => { props.setImageViewerFileName(props.imageData.fileName); props.setImageViewerPath(props.imageData.imageLink); }} 
            ref={domRef}
        >
            <div className={ResultsStyles.infoWrapper}>
                <img className={ResultsStyles.resultImage} src={props.imageData.imageLink} />

                <div className={ResultsStyles.fileData}>
                    <p className={ResultsStyles.filename}>{props.imageData.fileName}</p>

                    <div className={ResultsStyles.filePathAndDateOfSave}>
                        <p className={ResultsStyles.filePath}>{props.imageData.path}</p>
                        <p className={ResultsStyles.dateOfSave}>{props.imageData.dateSaved}</p>
                    </div>
                </div>
            </div>  
        </div>
    );
}