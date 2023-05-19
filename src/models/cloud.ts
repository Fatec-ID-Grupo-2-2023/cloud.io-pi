export interface ICloudioStorage {
    usage: number;
    limit: number;
    accounts: ICloudioAccount[];
}

export interface ICloudioFile {
    id: string;
    name: string;
    extension?: string;
    type: ICloudioType;
    trashed: boolean;
    modifiedTime?: Date;
    handleClick?: () => void;
    size?: number;
    shared: boolean;
    origin: ICloudioOrigin;
    parent: string;
    children: ICloudioFile[];
}

interface ICloudioAccount {
    id: ICloudioOrigin;
    name: string;
    usage: number;
    limit: number;
}

export interface ICloudioCapacity {
    usage: number;
    limit: number;
}

export type ICloudioOrigin = 'google-drive' | 'dropbox' | 'onedrive' | 'all';

export type ICloudioType = 'folder' | 'image' | 'video' | 'audio' | 'document' | 'text' | 'zip' | 'code' | 'spreadsheet' | 'presentation' | 'pdf' | 'other' | 'all';