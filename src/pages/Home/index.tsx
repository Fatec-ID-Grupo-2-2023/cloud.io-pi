import { Box, List, ListItem, ListItemButton, ListItemIcon, Modal, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import DocIcon from '../../assets/empty-doc.svg';
import ImageIcon from '../../assets/image.svg';
import MusicIcon from '../../assets/music.svg';
import VideoIcon from '../../assets/video.svg';
import CategoryButton from '../../components/CategoryButton';
import CloudAccount from '../../components/CloudAccount';
import CloudAccountEmpty from '../../components/CloudAccountEmpty';
import FilesExplorer from '../../components/FilesExplorer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import ProgressBar from '../../components/ProgressBar';
import { GlobalContext } from '../../contexts/GlobalContext';
import { ICloudioOrigin, ICloudioType } from '../../models/cloud';
import { dropboxLogin } from '../../services/fetchDropboxData';
import { convertSizeFile } from '../../utils/convertUnits';
import { filterRecentFiles } from '../../utils/filterFiles';
import { getOriginIcon } from '../../utils/getIcon';
import './style.scss';

export default function Home() {
    const { user, cloudStorage, cloudFiles } = useContext(GlobalContext);
    const { t } = useTranslation();
    const history = useHistory();

    const freeStorage = cloudStorage ? convertSizeFile(cloudStorage.limit - cloudStorage.usage) : 0;

    const [connectAccount, setConnectAccount] = useState(false);

    function handleClick(origin: ICloudioOrigin = 'all', type: ICloudioType = 'all') {
        history.push(`/files/${origin}/${type}`);
    }

    const recentFiles = filterRecentFiles(cloudFiles ?? []);

    console.log('jj')

    return (
        <Box id='home'>
            <Header />

            <Modal
                id='connect-account-modal'
                open={connectAccount}
                onClose={() => setConnectAccount(false)}
            >
                <Box id='connect-account-box' >
                    <Typography variant='h1' >
                        {t('ConnectAccount')}
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemButton
                                className='connect-account-item'
                                onClick={dropboxLogin}
                            >
                                <ListItemIcon
                                    className='connect-account-icon'
                                >
                                    <img src={getOriginIcon('dropbox')} alt='DropBox' />
                                </ListItemIcon>
                                <Typography variant='h2' >
                                    {t('DropBox')}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Modal>

            <section id='cloud-capacity' >
                <Typography variant='h1' >
                    {t('HiUser', { user: user?.displayName })}
                </Typography>
                <Typography variant='h2'
                    dangerouslySetInnerHTML={{
                        __html: t('FreeStorageMsg', { freeStorage })
                    }}
                />
                {cloudStorage ? (
                    <ProgressBar
                        usedCapacity={cloudStorage.usage}
                        totalCapacity={cloudStorage.limit}
                    />
                ) : null}
            </section>

            <section id='cloud-accounts' >
                {cloudStorage ? cloudStorage.accounts.map(({ id, name, usage, limit }, index) => (
                    <CloudAccount key={index} icon={getOriginIcon(id)} title={name} usage={usage} limit={limit} onClick={() => handleClick(id)} />
                )) : null}
                {cloudStorage && cloudStorage.accounts.length < 2 ? (
                    <CloudAccountEmpty onClick={() => setConnectAccount(true)} />
                ) : null}
            </section>

            <section id='file-categories' >
                <CategoryButton icon={DocIcon} onClick={() => handleClick('all', 'document')} />
                <CategoryButton icon={ImageIcon} onClick={() => handleClick('all', 'image')} />
                <CategoryButton icon={VideoIcon} onClick={() => handleClick('all', 'video')} />
                <CategoryButton icon={MusicIcon} onClick={() => handleClick('all', 'audio')} />
            </section>

            <section id='recent-files' >
                <FilesExplorer
                    id='recent'
                    title={t('RecentFiles')}
                    files={recentFiles}
                    linkText={t('ViewAll')}
                    link='/files'
                />
            </section>
            <NavBar />
        </Box >
    );
}