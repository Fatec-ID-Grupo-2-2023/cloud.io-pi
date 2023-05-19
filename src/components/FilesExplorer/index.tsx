import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import GridIcon from '../../assets/blocks.svg';
import ListIcon from '../../assets/list.svg';
import useToggle from '../../helpers/useToggle';
import { ICloudioFile } from '../../models/cloud';
import { convertSizeFile } from '../../utils/convertUnits';
import { FileListItem } from './FileListItem';
import { IPath } from './model';
import './style.scss';

interface IProps {
    id?: string;
    title?: string | null;
    link?: string;
    linkText?: string | null;
    layout?: boolean;
    files: ICloudioFile[];
    breadcrumbs?: boolean;
}

export default function FilesExplorer({ id, title, link, linkText, layout, files, breadcrumbs = true }: IProps) {
    const [currentLayout, toggleLayout] = useToggle('list', 'grid');
    const [path, setPath] = useState<IPath[]>();
    const { t } = useTranslation();
    const history = useHistory();

    const currentFiles = path?.length ? path[path.length - 1].children : files;

    function handleBreadcrumbClick(id: string) {
        const newPath = path?.slice(0, path.findIndex((item) => item.id === id) + 1);
        setPath(newPath);
    }

    function onFileClick(id: string, name: string, children: ICloudioFile[], handleClick?: () => void) {

        if (children.length) {
            setPath([
                ...path || [],
                {
                    id,
                    name,
                    children,
                },
            ]);
        } else {
            handleClick && handleClick();
        }
    }

    return (
        <Box id={id} className='files-explorer'>
            <Box className='header'>
                {(path && breadcrumbs) ? (
                    <Breadcrumbs maxItems={3}>
                        <Link
                            underline='hover'
                            color='inherit'
                            onClick={() => setPath(undefined)}
                        >
                            {t('Files')}
                        </Link>
                        {path?.map(({ id, name }, index) => index === path.length - 1 ? (
                            <Typography key={index} color='text.primary'>{name}</Typography>
                        ) : (
                            <Link
                                key={index}
                                underline='hover'
                                color='inherit'
                                onClick={() => handleBreadcrumbClick(id)}
                            >
                                {name}
                            </Link>
                        ))}
                    </Breadcrumbs>
                ) : (
                    <Typography variant='h3' className='title'>{title}</Typography>
                )}
                <Box className='link-layout' >
                    {(link && linkText) && (
                        <Link
                            color='secondary'
                            onClick={() => history.push(link)}
                        >
                            <Typography>{linkText}</Typography>
                        </Link>
                    )}
                    {layout && (
                        <IconButton className='change-layout' onClick={toggleLayout}>
                            <img src={currentLayout === 'list' ? ListIcon : GridIcon} />
                        </IconButton>
                    )}
                </Box>
            </Box>
            <Grid
                container
                spacing={2}
                className='content'
            >
                {currentFiles.map(({ id, name, type, size, modifiedTime, handleClick, children }, index) => (
                    <FileListItem
                        key={index}
                        isList={currentLayout === 'list'}
                        fileName={name}
                        type={type}
                        size={size ? convertSizeFile(size) : undefined}
                        lastModified={modifiedTime}
                        onClick={() => onFileClick(id, name, children, handleClick)}
                    />
                ))}
            </Grid>
        </Box>
    );
}