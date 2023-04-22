import { useState } from 'react';
import HomeStyles from './Home.module.css';

export default function Home() {
    const [displayVerticalBar, setDisplayVerticalBar] = useState('block');

    const removeVerticalLine = (e) => {
        const inputValue = e.target.value;
        const newDisplayValue = (inputValue ? 'none' : 'block')
        setDisplayVerticalBar(newDisplayValue);
    }

    return (
        <div>
            <div id={HomeStyles.searchBarWrapper}>
                <div id={HomeStyles.verticalBar} style={{display: displayVerticalBar}} ></div>
                <div id={HomeStyles.searchBar}>
                    <input onInput={removeVerticalLine} type="text" placeholder='Write something stupid' />
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