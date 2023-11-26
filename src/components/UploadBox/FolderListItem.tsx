import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import ExpandLess from '../../assets/expand-less-arrow.svg';
import ExpandMore from '../../assets/expand-more-arrow.svg';
import { ICloudioFile } from "../../models/cloud";
import { getFileIcon } from "../../utils/getIcon";

interface IProps {
    file: ICloudioFile;
    tab?: number;
    onSelect?: (path: string, parents: string) => void;
    selected?: string;
}

export default function FolderListItem({ file, tab = 0, onSelect, selected }: IProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItemButton
                onClick={() => {
                    setOpen(!open)
                    onSelect && onSelect(file.name, file.id)
                }}
                selected={selected === file.id}
                sx={{ pl: 2 * tab }}
            >
                <ListItemIcon>
                    <img src={getFileIcon(file.type)} />
                </ListItemIcon>
                <ListItemText primary={file.name} />
                {file.children.length ? open ? <img src={ExpandLess} /> : <img src={ExpandMore} /> : null}
            </ListItemButton>
            {
                file.children.length ? (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                file.children?.map((_file, index) => (
                                    <FolderListItem
                                        key={index}
                                        file={_file}
                                        tab={tab + 1}
                                        selected={selected}
                                        onSelect={(path, parent) => onSelect && onSelect(`${file.name}/${path}`, parent)}
                                    />
                                ))
                            }
                        </List>
                    </Collapse>
                ) : null
            }
        </>
    );
}