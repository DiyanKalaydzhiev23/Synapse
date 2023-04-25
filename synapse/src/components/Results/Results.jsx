import Result from './Result';
import ResultsStyles from './Results.module.css';


export default function Results() {
    return (
        <>
        <div id={ResultsStyles.results}>
            <Result/>
            <Result/>
            <Result/>
            <Result/>
            <Result/>
            <Result/>
            <Result/>
            <Result/>
            <Result/>
        </div>
        </>
    );
}