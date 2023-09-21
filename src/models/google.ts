export interface IGoogleAPIFiles {
    files: IGoogleFile[];
    nextPageToken: string;
}

export interface IGoogleFileOwner {
    displayName: string;
    photoLink: string;
    emailAddress: string;
}

export interface IGoogleFile {
    id: string;
    name: string;
    fileExtension?: string;
    trashed: boolean;
    modifiedTime: string;
    parents?: string[];
    webContentLink?: string;
    webViewLink: string;
    size?: number;
    shared: boolean;
    owners: IGoogleFileOwner[];
}

export interface IGoogleAPIAbout {
    storageQuota: {
        usage: string;
        limit: string;
        usageInDrive: string;
        usageInDriveTrash: string;
    };

}