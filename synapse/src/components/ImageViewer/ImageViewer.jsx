import ViewerStyles from './ImageViewer.module.css';
import ImageViewerIcon from './ImageViewerIcon';
import 'animate.css';

export default function ImageViewer(props) {
    if (!props.imageViewerFileName) {
        return (<></>);
    }

    return (
        <>
            <div className={`animate__animated animate__fadeInUpBig ${ViewerStyles.viewerWrapper}`} style={{backgroundImage: `url(${props.imageViewerPath})`}}>
                <div className={ViewerStyles.navigation}>
                    <div>
                        <img src="close-button.svg" className={ViewerStyles.closeBtn} onClick={() => props.setImageViewerFileName('')} alt="close button" />
                    </div>
                    
                    <h3 className={ViewerStyles.fileName}>
                        {props.imageViewerFileName}
                    </h3>
                    
                    <div className={ViewerStyles.expandBtn}>
                        <img src="expand-button.svg" className={ViewerStyles.expandImage}  alt="close button" />
                    </div>
                </div>
            </div>

            <ImageViewerIcon 
                imageViewerFileName={props.imageViewerFileName} 
                setImageViewerFileName={props.setImageViewerFileName}
            />
        </>
    );
}