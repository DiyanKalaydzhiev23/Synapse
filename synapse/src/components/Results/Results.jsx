import Result from './Result';
import ResultsStyles from './Results.module.css';
import getImagesByTag from '../../services/getImage.ts';
import { useEffect, useState } from 'react';


export default function Results(props) {
    const [results, setResults] = useState([]);
    const [timeLastRequest, setTimeLastRequest] = useState(2000);

    useEffect(() => {

        const currentTime = new Date();

        console.log(currentTime - timeLastRequest)

        if (currentTime - timeLastRequest >= 300) {
            setTimeLastRequest(currentTime);
        } else {
            return;
        }
        
        getImagesByTag(props.tags).then((images) => setResults(images));
    }, [props.tags]);

    return (
        <>
            <div id={ResultsStyles.results}>
                {results.map((r) => (
                    <Result key={r.id} imageData={r} />
                ))}
            </div>
        </>
    );
}