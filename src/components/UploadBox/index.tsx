import { Alert, AlertColor, Badge, Box, Button, Checkbox, FormControlLabel, List, Modal, Snackbar, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '../../assets/star.svg';
import { GlobalContext } from '../../contexts/GlobalContext';
import { ICloudioUploadOptions } from '../../models/cloud';
import { filterFiles } from '../../utils/filterFiles';
import { getOriginIcon } from '../../utils/getIcon';
import ConfirmBox from '../ConfirmBox';
import IconButton from '../IconButton';
import FolderListItem from './FolderListItem';
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
    const { cloudStorage, recommendedOrigin, setRecommendedOrigin, cloudFiles } = useContext(GlobalContext);
    const { t } = useTranslation();
    const extension = defaultFilename?.split('.').pop();
    const validateName = /^[a-zA-Z0-9-_\.\s]+$/;
    const isNameValid = validateName.test(filename ?? '');
    const recommended = cloudStorage?.accounts.sort((a, b) => (a.limit - a.usage) + (b.limit - b.usage))[0]?.id;
    const [selectedOrigin, setSelectedOrigin] = useState(cloudStorage?.accounts.sort((a, b) => (a.limit - a.usage) + (b.limit - b.usage))[0]?.id);
    const [useRecommended, setUseRecommended] = useState(false);
    const filteredFiles = filterFiles(cloudFiles ?? [], undefined, undefined, "folder");
    const [selected, setSelected] = useState<string>();
    const [paths, setPaths] = useState({
        path: '',
        parent: ''
    })

    function onUpload() {
        try {
            onConfirm({ filename, origin: selectedOrigin, paths });
            setRecommendedOrigin(useRecommended);
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
                    {t('FileUploaded')}
                </Alert>
            </Snackbar>
            <Modal open={open} onClose={onClose}>
                <Box className="upload-box">
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
                    <List className="upload-folders">
                        {
                            filteredFiles.map((file, index) => (
                                <FolderListItem
                                    key={index}
                                    file={file}
                                    selected={selected}
                                    onSelect={(path, parent) => {
                                        setSelected(parent)
                                        setPaths({ path, parent })
                                    }}
                                />
                            ))
                        }
                    </List>
                    {!recommendedOrigin && cloudStorage && cloudStorage.accounts.length > 1 ? (
                        <Box className="upload-origin">
                            <Box className="icons">
                                {cloudStorage.accounts.map(({ id }, index) =>
                                    id === recommended ? (
                                        <Badge key={index} color={undefined} className="star-badge" badgeContent={<img src={StarIcon} className='star' />}>
                                            <IconButton icon={getOriginIcon(id)} onClick={() => setSelectedOrigin(id)} className={id === selectedOrigin ? "icon-active" : undefined} />
                                        </Badge>
                                    ) : (
                                        <IconButton
                                            key={index}
                                            icon={getOriginIcon(id)}
                                            onClick={() => {
                                                setSelectedOrigin(id);
                                                setUseRecommended(false);
                                            }}
                                            className={id === selectedOrigin ? "icon-active" : undefined}
                                        />
                                    ))}
                            </Box>
                            <Box className="recommended">
                                <FormControlLabel control={<Checkbox size="small" onClick={() => setUseRecommended(true)} onChange={() => setSelectedOrigin(recommended)} checked={useRecommended} />} label={t("UseAlwaysRecommended")} />
                            </Box>
                        </Box>
                    ) : null}
                    <Box className="upload-actions">
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            color="secondary"
                            className="cancel-button"
                        >
                            Cancel
                        </Button>
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
                </Box>
            </Modal>
        </Box>
    );
}