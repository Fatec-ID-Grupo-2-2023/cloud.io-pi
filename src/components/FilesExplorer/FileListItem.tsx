import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ICloudioOrigin, ICloudioType } from '../../models/cloud';
import { getFileIcon, getOriginIcon } from '../../utils/getIcon';

interface IProps {
    fileName: string;
    isList?: boolean;
    type: ICloudioType;
    lastModified?: Date;
    size?: string;
    onClick: () => void;
    origin: ICloudioOrigin;
}

export function FileListItem({ isList = true, fileName, type, lastModified, size, onClick, origin }: IProps) {
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
            <Card className={`card ${isList ? "list" : "block"}`}>
                <CardActionArea onClick={onClick}>
                    <CardContent className='content'>
                        <img className='file-icon' src={getFileIcon(type)} />
                        <Box className='text'>
                            <Typography variant='h3' >{fileName}</Typography>
                            {isList && (
                                <Typography variant='h4' >
                                    {lastModified && `${t('LastModifiedAt')} `}
                                    {lastModified?.toLocaleDateString()}
                                    {(lastModified && size) && ' - '}
                                    {size}
                                </Typography>
                            )}
                        </Box>
                        {type !== 'folder' && (
                            <Box className='file-origin-box'>
                                <img className='origin-icon' src={getOriginIcon(origin)} />
                            </Box>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}