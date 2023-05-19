import { Box } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilesExplorer from '../../components/FilesExplorer';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import SearchField from '../../components/SearchField';
import { GlobalContext } from '../../contexts/GlobalContext';
import { filterFiles } from '../../utils/filterFiles';
import './style.scss';

export default function Trash() {
    const { t } = useTranslation();
    const { trashedFiles } = useContext(GlobalContext);
    const [search, setSearch] = useState('');

    const filteredFiles = filterFiles(trashedFiles, search);

    return (
        <Box id='files'>
            <Header />
            <SearchField id='search-input' placeholder={t('Search')} onSearch={(value) => setSearch(value)} />
            <FilesExplorer
                id='file-explorer'
                title={t('Trash')}
                files={filteredFiles}
                layout
            />
            <NavBar />
        </Box>
    );
}