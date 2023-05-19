import { Box, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import './style.scss';

interface IProps {
    icon: string;
    id?: string;
    className?: string;
    label?: string | null;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function TextFieldIcon({ id, icon, label, className, onChange }: IProps) {
    return (
        <Box id={id} className={`text-field-icon ${className}`}>
            <img src={icon} />
            <TextField id={id && `text-field-${id}`} label={label} variant='standard' onChange={onChange} />
        </Box>
    );
}