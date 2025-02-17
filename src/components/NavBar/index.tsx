import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import FolderActiveIcon from '../../assets/folder-active.svg';
import FolderIcon from '../../assets/folder.svg';
import HomeActiveIcon from '../../assets/home-active.svg';
import HomeIcon from '../../assets/home.svg';
import './style.scss';

export default function NavBar() {
    const history = useHistory();
    // const { googleToken } = useContext(GlobalContext);

    function handleUpload(e: ChangeEvent<HTMLInputElement>) {
        console.log('entrei')
        console.log(e)
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log('entrei fundo')
            // uploadFile(file, googleToken?.access_token).then((response) => console.log(response));
        }
    }

    return (
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
                        onClick={() => history.push('/')}
                    >
                        {history.location.pathname === '/' ? (
                            <img src={HomeActiveIcon} alt={''} />
                        ) : (
                            <img src={HomeIcon} alt={''} />
                        )}
                    </IconButton>
                </Box>
                {/* <SpeedDial
                    ariaLabel='SpeedDial example'
                    className='speed-dial'
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        icon={(<img src={UploadFileIcon} alt={''} className='speed-dial-item' />)}
                        tooltipTitle={t('Upload')}
                        onClick={() => document.getElementById('upload-input')?.click()}
                    />
                </SpeedDial> */}
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
    );
}