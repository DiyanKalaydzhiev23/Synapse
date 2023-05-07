import ViewerStyles from './ImageViewer.module.css';
import 'animate.css';

export default function ImageViewerIcon(props) {
    return (
        <div className={`animate__animated animate__fadeInUpBig ${ViewerStyles.imageViewerAppIcon}`} onClick={() => props.setImageViewerFileName('')}>
            <img src="image-viewer.webp" alt="image viewer icon" />
        </div>
    );
}