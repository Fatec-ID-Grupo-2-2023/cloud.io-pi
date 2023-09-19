import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import FilesExplorer from '../../components/FilesExplorer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import SearchField from '../../components/SearchField';
import { GlobalContext } from '../../contexts/GlobalContext';
import { ICloudioOrigin, ICloudioType } from '../../models/cloud';
import { filterFiles } from '../../utils/filterFiles';
import './style.scss';

interface IParams {
    origin?: ICloudioOrigin;
    type?: ICloudioType;
}

export default function Files() {
    const { t } = useTranslation();
    const { cloudFiles } = useContext(GlobalContext);
    const [search, setSearch] = useState('');

    const { origin, type } = useParams<IParams>()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filteredFiles = filterFiles(cloudFiles ?? [], search, origin, type);

    return (
        <Box id='files'>
            <Header />
            <SearchField id='search-input' placeholder={t('Search')} onSearch={(value) => setSearch(value)} />
            <FilesExplorer
                id='file-explorer'
                title={t('Files')}
                files={filteredFiles}
                layout
            />
            {windowWidth <= 768 ? (
                <NavBar />
            ) : ('')}
        </Box>
    );
}
