import { Box, LinearProgress, Typography } from '@mui/material';
import { convertSizeFile } from '../../utils/convertUnits';
import './style.scss';

type IProps = {
    usedCapacity: number;
    totalCapacity?: number;
}

export default function ProgressBar({ usedCapacity, totalCapacity }: IProps) {
    const progress = totalCapacity ? (usedCapacity / totalCapacity) * 100 : usedCapacity;

    return (
        <Box className='progress-bar'>
            <LinearProgress
                color='primary'
                variant='determinate'
                className='progress'
                value={progress}
            />

            {totalCapacity ? (
                <Box className='labels'>
                    <Typography
                        variant='caption'
                        fontSize={10}
                        fontWeight={'medium'}
                    >
                        {convertSizeFile(usedCapacity)}
                    </Typography>
                    <Typography
                        variant='caption'
                        fontSize={10}
                        fontWeight={'medium'}
                    >
                        {convertSizeFile(totalCapacity)}
                    </Typography>
                </Box>
            ) : null}
        </Box>
    );
}