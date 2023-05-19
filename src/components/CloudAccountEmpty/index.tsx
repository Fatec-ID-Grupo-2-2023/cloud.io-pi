import { Card, CardActionArea, CardContent } from '@mui/material';
import AddIcon from '../../assets/add-circle.svg';
import './style.scss';

interface IProps {
    onClick: () => void;
}

export default function CloudAccountEmpty({ onClick }: IProps) {
    return (
        <Card className='cloud-account'>
            <CardActionArea onClick={onClick}>
                <CardContent className='content content-empty'>
                    <img src={AddIcon} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}