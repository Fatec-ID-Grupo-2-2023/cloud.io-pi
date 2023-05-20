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

export type IDropboxUser = IDropboxToken | undefined;

interface IDropboxToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    account_id: string;
}