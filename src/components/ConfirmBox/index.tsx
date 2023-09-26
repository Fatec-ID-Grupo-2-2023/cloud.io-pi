import { Box, Button, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmIcon from '../../assets/check.svg';
import CloseIcon from '../../assets/close.svg';
import './style.scss';

export interface IProps {
    open: boolean;
    onConfirm: () => void;
    onClose: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

export default function ConfirmBox({ open, onConfirm, onClose, onCancel, title, message }: IProps) {
    const { t } = useTranslation();


    return (
        <Box>
            <Modal open={open} onClose={onClose}>
                <Box id="confirm-box">
                    <Typography variant='h6' className='confirm-title'>
                        {title}
                    </Typography>
                    <Typography variant='body1' className='confirm-message'>
                        {message}
                    </Typography>
                    <Box className='confirm-actions'>
                        <Button
                            onClick={onCancel}
                            startIcon={(<img src={CloseIcon} alt='close' className="icon" />)}
                            className="button cancel"
                        >
                            {t('Cancel')}
                        </Button>
                        <Button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            startIcon={(<img src={ConfirmIcon} alt='confirm' className="icon" />)}
                            className="button confirm"
                        >
                            {t('Confirm')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}