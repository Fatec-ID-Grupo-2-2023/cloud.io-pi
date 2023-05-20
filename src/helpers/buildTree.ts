import { ICloudioFile } from '../models/cloud';

interface IFileMap {
    [key: string]: number;
}

export function buildTree(files: ICloudioFile[]) {
    const map: IFileMap = {};
    const tree: ICloudioFile[] = [];

    files.forEach((file, index) => {
        map[file.id] = index;
    });

    files.forEach((file) => {
        if (file.parent !== 'root') {
            files[map[file.parent]].children.push(file);
        } else {
            tree.push(file);
        }
    });

    return tree;
}

export function matchTree(tree: ICloudioFile[]) {
    let matchedTree: ICloudioFile[] = [];

    tree = tree.sort((a, b) => {
        const timeA = a.modifiedTime ? a.modifiedTime.getTime() : 0;
        const timeB = b.modifiedTime ? b.modifiedTime.getTime() : 0;

        return timeB - timeA;
    });

    const folders = tree.map(({ name }) => name);

    const duplicatedFolders = folders.filter((folder, index) => folders.indexOf(folder) !== index);

    duplicatedFolders.forEach(folder => {
        const sameFolders = tree.filter(({ name, type }) => name === folder && type === 'folder');

        const matchFolder: ICloudioFile = sameFolders.shift()!;

        sameFolders.forEach(folder => {
            matchFolder.children = [...matchFolder.children, ...folder.children];
        });

        matchedTree.push(matchFolder);
    });

    matchedTree = [...matchedTree, ...tree.filter(({ name }) => !duplicatedFolders.includes(name))];

    matchedTree.forEach(folder => {
        if (folder && folder.type === 'folder')
            folder.children = matchTree(folder.children);
    });

    return matchedTree;
}