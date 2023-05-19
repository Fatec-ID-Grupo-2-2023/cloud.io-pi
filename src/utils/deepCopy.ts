import { ICloudioFile } from "../models/cloud";

export function deepCopy(array: ICloudioFile[]): ICloudioFile[] {
    const copy = array.map<ICloudioFile>(file => ({
        id: file.id,
        name: file.name,
        extension: file.extension,
        type: file.type,
        size: file.size,
        handleClick: file.handleClick,
        shared: file.shared,
        trashed: file.trashed,
        modifiedTime: file.modifiedTime,
        origin: file.origin,
        parent: file.parent,
        children: []
    }));

    return copy;
}