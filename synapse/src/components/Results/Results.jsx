import Result from './Result';
import ResultsStyles from './Results.module.css';
import getImagesByTag from '../../services/getImage.ts';
import { useEffect, useState } from 'react';


export default function Results(props) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        getImagesByTag(props.tags).then((images) => setResults(images));
        console.log(results);
    }, [results]);

    return (
        <>
            <div id={ResultsStyles.results}>
                {results.map((r) => (
                    <Result key={r.imageLink} imageLink={r.imageLink} />
                ))}
            </div>
        </>
    );
}