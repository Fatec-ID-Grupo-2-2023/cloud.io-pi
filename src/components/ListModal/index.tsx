import { Box, List, ListItem, ListItemButton, ListItemIcon, Modal, Typography } from '@mui/material';
import { ListModalItem } from './model';
import './styles.scss';

interface IProps {
    title: string;
    open: boolean;
    onClose: () => void;
    items: ListModalItem[];
}

export default function ListModal({ title, items, open, onClose }: IProps) {
    return (
        <Modal
            className='connect-account-modal'
            open={open}
            onClose={onClose}
        >
            <Box className='connect-account-box'>
                <Typography variant='h1' >
                    {title}
                </Typography>
                <List>
                    {items.map(({ text, icon, onClick }, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                className='connect-account-item'
                                onClick={onClick}
                            >
                                <ListItemIcon
                                    className='connect-account-icon'
                                >
                                    <img src={icon} />
                                </ListItemIcon>
                                <Typography variant='h2' >
                                    {text}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
}