import { IconButton as IconButtonMUI } from '@mui/material';
import './style.scss';

interface IProps {
    icon: string;
    alt?: string;
    className?: string;
    onClick?: () => void;
}

export default function IconButton({ icon, alt, className, onClick }: IProps) {
    return (
        <IconButtonMUI className={`category-button ${className ?? ""}`} onClick={onClick}>
            <img src={icon} alt={alt} />
        </IconButtonMUI>
    );
}