import axios from "axios";
import { DropboxAuth } from 'dropbox';
import { ICloudioCapacity, ICloudioFile } from "../models/cloud";
import { IDropboxAPIFiles, IDropboxFile, IDropboxStorage } from "../models/dropbox";
import getFileType from '../utils/getFileType';

const api = axios.create({
    baseURL: 'https://api.dropboxapi.com/2',
});

export async function getDropboxFiles(token: string) {
    let rawFiles: IDropboxFile[] = [];
    let cursor = '';
    let hasMore = true;

    const { status, data } = await api.post<IDropboxAPIFiles>('/files/list_folder', {
        path: '',
        recursive: true
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (status !== 200) {
        throw new Error('Error fetching Dropbox files');
    }

    rawFiles = [...rawFiles, ...data.entries];
    cursor = data.cursor;
    hasMore = data.has_more;

    while (hasMore) {
        const { status, data } = await api.post('/files/list_folder/continue', {
            cursor
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (status !== 200) {
            throw new Error('Error fetching Dropbox files');
        }

        rawFiles = [...rawFiles, ...data.entries];
        cursor = data.cursor;
        hasMore = data.has_more;
    }

    const files = rawFiles.map<ICloudioFile>((file) => {
        const { id, name, client_modified, size } = file;

        const extension = name.split('.').pop();

        return {
            id,
            name,
            extension,
            type: getFileType(extension, file[".tag"] === 'folder'),
            size,
            handleClick: () => handleClick(token, file.path_display),
            shared: false,
            trashed: false,
            modifiedTime: client_modified ? new Date(client_modified) : undefined,
            origin: 'dropbox',
            parent: getParent(rawFiles, file.path_display),
            children: [],
        }
    });

    return files;
}

export async function getDropboxAbout(token: string): Promise<ICloudioCapacity> {
    const { status, data: { used, allocation: { allocated } } } = await api.post<IDropboxStorage>('/users/get_space_usage', null, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (status !== 200) {
        throw new Error('Error fetching Dropbox storage');
    }

    const response: ICloudioCapacity = {
        usage: used,
        limit: allocated
    }

    return response;
}

function getParent(files: IDropboxFile[], _path: string) {
    const path = _path.substring(0, _path.lastIndexOf('/'));

    const parentId = files.find(({ path_display }) => path_display === path)?.id ?? "root";

    return parentId;
}

export async function handleClick(token: string, path: string) {
    const { status, data: { link } } = await api.post('files/get_temporary_link', {
        path
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (status !== 200) {
        throw new Error('Error fetching Dropbox download link');
    }

    window.open(link, '_blank');
}

export async function dropboxLogin() {
    const clientId = import.meta.env.VITE_DROPBOX_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;

    const dropbox = new DropboxAuth({
        clientId,
        clientSecret
    });

    const domain = import.meta.env.VITE_DROPBOX_REDIRECT_DOMAIN;
    const authUrl = (await dropbox.getAuthenticationUrl(`${domain}/dropbox`)).toString();

    window.open(authUrl, '_self');
}