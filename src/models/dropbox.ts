export interface IDropboxAPIFiles {
    entries: IDropboxFile[];
    cursor: string;
    has_more: boolean;
}

export interface IDropboxFile {
    '.tag': 'file' | 'folder';
    id: string;
    name: string;
    client_modified?: string;
    path_display: string;
    size?: number;
}

export interface IDropboxStorage {
    used: number;
    allocation: {
        allocated: number
    };
}
