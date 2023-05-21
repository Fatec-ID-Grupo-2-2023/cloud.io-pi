import { ICloudioFile, ICloudioOrigin, ICloudioType } from '../models/cloud';

export function filterFiles(files: ICloudioFile[], byName?: string, byOrigin?: ICloudioOrigin, byType?: ICloudioType) {
    let filteredFiles = files;

    if (byName) {
        filteredFiles = filterByName(filteredFiles, byName);
    }

    if (byOrigin && byOrigin !== 'all') {
        filteredFiles = filterTree(filteredFiles, byOrigin, 'origin');
    }

    if (byType && byType !== 'all') {
        filteredFiles = filterTree(filteredFiles, byType, 'type');
    }

    return filteredFiles;
}

function filterByName(files: ICloudioFile[], _name: string) {
    const filteredFiles = files.filter((file) => file && file.name.toLowerCase().includes(_name.toLowerCase()));

    return filteredFiles;
}

function filterTree(files: ICloudioFile[], value: string, field: keyof ICloudioFile) {
    const filteredFiles: ICloudioFile[] = [];

    files.forEach(file => {
        if (file) {
            if (file.type !== 'folder') {
                if (file[field] === value) {
                    filteredFiles.push(file);
                }
            } else {
                const folder = filterTree(file.children, value, field);

                if (folder.length > 0) {
                    filteredFiles.push({ ...file, children: folder });
                }
            }
        }
    });

    return filteredFiles;
}

export function filterRecentFiles(files: ICloudioFile[], quantity = 5) {
    const filteredFiles = files.sort((a, b) => {
        const timeA = a.modifiedTime ? a.modifiedTime.getTime() : 0;
        const timeB = b.modifiedTime ? b.modifiedTime.getTime() : 0;

        return timeB - timeA;
    }).slice(0, quantity);

    return filteredFiles;
}