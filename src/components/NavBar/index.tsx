import { AppBar, Box, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Toolbar } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import FolderActiveIcon from '../../assets/folder-active.svg';
import FolderIcon from '../../assets/folder.svg';
import HomeActiveIcon from '../../assets/home-active.svg';
import HomeIcon from '../../assets/home.svg';
import UploadFileIcon from '../../assets/upload-file.svg';
import { GlobalContext } from '../../contexts/GlobalContext';
import UploadBox from '../UploadBox';
import './style.scss';

export default function NavBar() {
    const history = useHistory();
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState<File>();
    const { uploadGoogleFile, uploadDropboxFile } = useContext(GlobalContext);

    function handleUpload(e: any) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    }

    return (
        <>
            <UploadBox
                open={Boolean(selectedFile)}
                onClose={() => {
                    setSelectedFile(undefined);
                    const input = document.getElementById("upload-input") as HTMLInputElement;
                    input.value = '';
                }}
                onConfirm={(options) => {
                    if (selectedFile) {
                        switch (options?.origin) {
                            case "google-drive":
                                uploadGoogleFile(selectedFile, options);
                                break;
                            case "dropbox":
                                uploadDropboxFile(selectedFile, options);
                                break;
                        }
                    }
                }}
                defaultFilename={selectedFile?.name}
            />

            <AppBar id='navbar'>
                <input
                    className='navbar-input-action'
                    type="file"
                    id='upload-input'
                    onChange={handleUpload}
                />
                <Toolbar>
                    <Box className='navbar-side-box'>
                        <IconButton
                            onClick={() => history.push('/home')}
                        >
                            {history.location.pathname === '/home' ? (
                                <img src={HomeActiveIcon} alt={''} />
                            ) : (
                                <img src={HomeIcon} alt={''} />
                            )}
                        </IconButton>
                    </Box>
                    <SpeedDial
                        ariaLabel='SpeedDial example'
                        className='speed-dial'
                        icon={<SpeedDialIcon />}
                    >
                        <SpeedDialAction
                            icon={(<img src={UploadFileIcon} alt={''} className='speed-dial-item' />)}
                            tooltipTitle={t('Upload')}
                            onClick={() => document.getElementById('upload-input')?.click()}
                        />
                    </SpeedDial>
                    <Box className='navbar-side-box'>
                        <IconButton
                            onClick={() => history.push('/files')}
                        >
                            {history.location.pathname.startsWith('/files') ? (
                                <img src={FolderActiveIcon} alt={''} />
                            ) : (
                                <img src={FolderIcon} alt={''} />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}