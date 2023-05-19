import { IconButton } from '@mui/material';
import './style.scss';

interface IProps {
    icon: string;
    alt?: string;
    onClick?: () => void;
}

export default function CategoryButton({ icon, alt, onClick }: IProps) {
    return (
        <IconButton className='category-button' onClick={onClick}>
            <img src={icon} alt={alt} />
        </IconButton>
    );
}