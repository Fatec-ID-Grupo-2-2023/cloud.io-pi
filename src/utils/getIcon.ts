import CodeIcon from '../assets/code.svg';
import DropBoxIcon from '../assets/dropbox.svg';
import EmptyDocIcon from '../assets/empty-doc.svg';
import ExcelIcon from '../assets/excel.svg';
import FolderIcon from '../assets/folder.svg';
import GoogleDriveIcon from '../assets/google-drive.svg';
import ImageIcon from '../assets/image.svg';
import MusicIcon from '../assets/music.svg';
import OneDriveIcon from '../assets/one-drive.svg';
import PDFIcon from '../assets/pdf.svg';
import PPTIcon from '../assets/ppt.svg';
import TXTIcon from '../assets/txt.svg';
import VideoIcon from '../assets/video.svg';
import WordIcon from '../assets/word.svg';
import ZipIcon from '../assets/zip.svg';
import { ICloudioOrigin, ICloudioType } from '../models/cloud';

export function getFileIcon(type: ICloudioType): string {
    if (!type) return EmptyDocIcon;

    if (type === 'pdf') return PDFIcon;
    if (type === 'spreadsheet') return ExcelIcon;
    if (type === 'document') return WordIcon;
    if (type === 'presentation') return PPTIcon;
    if (type === 'text') return TXTIcon;
    if (type === 'zip') return ZipIcon;
    if (type === 'code') return CodeIcon;
    if (type === 'folder') return FolderIcon;
    if (type === 'image') return ImageIcon;
    if (type === 'video') return VideoIcon;
    if (type === 'audio') return MusicIcon;

    return EmptyDocIcon;
}

export function getOriginIcon(origin: ICloudioOrigin) {
    switch (origin) {
        case 'dropbox': return DropBoxIcon;
        case 'google-drive': return GoogleDriveIcon;
        case 'onedrive': return OneDriveIcon;
        default:
            console.error('Invalid cloud type');
            return '';
    }
}