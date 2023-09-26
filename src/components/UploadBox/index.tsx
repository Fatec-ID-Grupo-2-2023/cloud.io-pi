import { Alert, AlertColor, Box, Button, Modal, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICloudioUploadOptions } from '../../models/cloud';
import ConfirmBox from '../ConfirmBox';
import './style.scss';

interface IProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (_?: ICloudioUploadOptions) => void;
    defaultFilename?: string;
}

export default function UploadBox({ open, onClose, onConfirm, defaultFilename }: IProps) {
    const [alert, setAlert] = useState<AlertColor>();
    const [filename, setFilename] = useState('');
    const [confirm, setConfirm] = useState(false);
    const { t } = useTranslation();
    const extension = defaultFilename?.split('.').pop();
    const validateName = /^[a-zA-Z0-9-_\.\s]+$/;
    const isNameValid = validateName.test(filename ?? '');

    function onUpload() {
        try {
            onConfirm({ filename });
            onClose();
            setAlert('success');
        } catch (err) {
            setAlert('error');
        }
    }

    useEffect(() => {
        if (defaultFilename) {
            setFilename(defaultFilename);
        }
    }, [defaultFilename]);


    return (
        <Box>
            <ConfirmBox
                open={confirm}
                onCancel={() => {
                    setConfirm(false);
                    setFilename(defaultFilename ?? '');
                }}
                onClose={() => setConfirm(false)}
                onConfirm={() => onUpload()}
                title={t('RenameFileExtension')}
                message={t('RenameFileExtensionMessage')}
            />
            <Snackbar
                open={Boolean(alert)}
                autoHideDuration={3000}
                onClose={() => setAlert(undefined)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    severity={alert}
                >
                    {t('File uploaded')}
                </Alert>
            </Snackbar>
            <Modal open={open} onClose={onClose}>
                <Box id="upload-box">
                    <Typography variant='h6' className='upload-title'>
                        {t('UploadFile')}
                    </Typography>
                    <TextField
                        error={!isNameValid}
                        id="filename"
                        variant='standard'
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        helperText={isNameValid ? '' : t('InvalidFilename')}
                    />
                    <Button
                        onClick={() => {
                            if (filename.split('.').pop() !== extension) {
                                setConfirm(true);
                            } else {
                                onUpload();
                            }
                        }}
                        disabled={!isNameValid}
                        className="upload-button"
                    >
                        Upload
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}