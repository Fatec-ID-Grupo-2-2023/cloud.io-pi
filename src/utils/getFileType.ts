import { ICloudioType } from '../models/cloud';

export default function getFileType(extension?: string, isFolder = false): ICloudioType {
    if (isFolder) return 'folder';
    if (!extension) return 'other';

    if (['pdf'].includes(extension)) return 'pdf';
    if (['xls', 'xlsx'].includes(extension)) return 'spreadsheet';
    if (['doc', 'docx'].includes(extension)) return 'document';
    if (['ppt', 'pptx'].includes(extension)) return 'presentation';
    if (['txt'].includes(extension)) return 'text';
    if (['zip', 'rar'].includes(extension)) return 'zip';
    if (['py', 'ipynb', 'java', 'js', 'cpp', 'cs', 'php', 'rb', 'swift', 'kt', 'm', 'go', 'rs', 'scala', 'pl', 'lua', 'ts', 'sql', 'html', 'css'].includes(extension)) return 'code';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(extension)) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm', '3gp', 'm4v', 'vob', 'ogv', 'ogg'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'wma', 'aac', 'flac', 'm4a', 'ogg', 'oga', 'mka', 'aiff', 'ape', 'opus'].includes(extension)) return 'audio';

    return 'other';
}