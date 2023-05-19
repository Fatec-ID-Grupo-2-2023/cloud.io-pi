import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import DotsIcon from '../../assets/dots.svg';
import DownloadIcon from '../../assets/download.svg';

interface IProps {
    download?: () => Promise<void>;
    isFolder: boolean;
}

export default function MenuButton({ download, isFolder }: IProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleDownload() {
        download && download();
        handleClose();
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton
                id='demo-positioned-button'
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <img src={DotsIcon} />
            </IconButton>
            <Menu
                className='menu-dots'
                aria-labelledby='demo-positioned-button'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    className='menu-item'
                    onClick={handleDownload}
                    disabled={isFolder}
                >
                    <img src={DownloadIcon} />
                    Download
                </MenuItem>
            </Menu>
        </>
    );
}