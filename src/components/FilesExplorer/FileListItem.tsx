import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ICloudioType } from '../../models/cloud';
import getFileIcon from './getFileIcon';

interface IProps {
    fileName: string;
    isList?: boolean;
    type: ICloudioType;
    lastModified?: Date;
    size?: string;
    onClick: () => void;
    // download?: () => Promise<void>;
}

export function FileListItem({ isList = true, fileName, type, lastModified, size, onClick }: IProps) {
    const { t } = useTranslation();
    return (
        <Grid
            item
            className='file-list-item'
            xs={isList ? 12 : 6}
            sm={isList ? 12 : 4}
            md={isList ? 12 : 3}
            lg={isList ? 12 : 2}
            xl={isList ? 12 : 2}
        >
            {isList ? (
                <Card className='card list'>
                    <CardActionArea onClick={onClick}>
                        <CardContent className='content'>
                            <img className='file-icon' src={getFileIcon(type)} />
                            <Box className='text'>
                                <Typography variant='h3' >{fileName}</Typography>
                                <Typography variant='h4' >
                                    {lastModified && `${t('LastModifiedAt')} `}
                                    {lastModified?.toLocaleDateString()}
                                    {(lastModified && size) && ' - '}
                                    {size}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    {/* <CardActions className='menu'>
                        <MenuButton download={download} isFolder={type === 'folder'} />
                    </CardActions> */}
                </Card>
            ) : (
                <Card className='card block'>
                    {/* <CardActions className='menu'>
                        <MenuButton download={download} isFolder={type === 'folder'} />
                    </CardActions> */}
                    <CardActionArea onClick={onClick}>
                        <CardContent className='content'>
                            <img className='file-icon' src={getFileIcon(type)} />
                            <Typography variant='h3' >{fileName}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </Grid>
    );
}