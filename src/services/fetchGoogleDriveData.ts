import axios from 'axios';
import { ICloudioCapacity, ICloudioFile } from '../models/cloud';
import { IGoogleAPIAbout, IGoogleAPIFiles, IGoogleFile } from '../models/google';
import getFileType from '../utils/getFileType';

const api = axios.create({
    baseURL: 'https://www.googleapis.com',
});

export async function getGoogleDriveFiles(token: string): Promise<ICloudioFile[]> {
    let rawFiles: IGoogleFile[] = [];
    let nextPageToken = '';

    do {
        const { data } = await api.get<IGoogleAPIFiles>('/drive/v3/files', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                fields: 'files(id,name,fileExtension,trashed,modifiedTime,parents,webContentLink,webViewLink,size,shared,owners(displayName,photoLink,emailAddress)),nextPageToken',
                pageToken: nextPageToken,
            }
        });


        rawFiles = [...rawFiles, ...data.files];
        nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    //remove trash and files that are not owned by the user
    const userFiles = rawFiles.filter(({ shared, trashed }) => !shared && !trashed);

    const files = userFiles.map<ICloudioFile>(({ id, name, fileExtension, size, webViewLink, webContentLink, shared, trashed, modifiedTime, parents }) => {
        return {
            id,
            name,
            extension: fileExtension,
            type: getType(webViewLink, fileExtension),
            size,
            handleClick: () => handleClick(webViewLink, webContentLink),
            shared,
            trashed,
            modifiedTime: new Date(modifiedTime),
            origin: 'google-drive',
            parent: parents ? parents[0] : '',
            children: [],
        }
    });

    const ids = files.map(({ id }) => id);
    const rootFolder = files.filter(({ parent }) => !ids.includes(parent))[0].parent;

    const tree = files.map((file) => {
        if (file.parent === rootFolder) {
            file.parent = 'root';
        }

        return file
    });

    return tree;
}

export async function getGoogleDriveAbout(token: string): Promise<ICloudioCapacity> {
    const { data: { storageQuota } } = await api.get<IGoogleAPIAbout>('/drive/v3/about', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            fields: 'storageQuota'
        }
    });

    const response: ICloudioCapacity = {
        usage: parseInt(storageQuota.usage),
        limit: parseInt(storageQuota.limit),
    }

    return response;
}

function getType(webViewLink: string, fileExtension?: string) {
    const isFolder = webViewLink.includes('https://drive.google.com/drive/folders/');

    if (!fileExtension && !isFolder) {
        if (webViewLink.includes('https://docs.google.com/spreadsheets/')) {
            fileExtension = 'xlsx';
        } else if (webViewLink.includes('https://docs.google.com/document/')) {
            fileExtension = 'docx';
        } else if (webViewLink.includes('https://docs.google.com/presentation/')) {
            fileExtension = 'pptx';
        }

    }

    const type = getFileType(fileExtension, isFolder);

    return type;
}

export async function uploadFile(file: any, token?: string) {
    const fileMetadata = {
        name: file.name
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    form.append('file', file);

    const response = api.post(
        '/upload/drive/v3/files',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/related'
            },
            params: {
                uploadType: 'media',
            },
            body: form
        }
    )

    return response;
}

function handleClick(webViewLink: string, webContentLink?: string) {
    if (webContentLink) {
        window.open(webContentLink, '_blank');
    } else {
        window.open(webViewLink, '_blank');
    }
}