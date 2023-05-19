import { ICloudioFile } from '../../models/cloud';

export interface IPath {
    id: string;
    name: string;
    children: ICloudioFile[];
}

export type ILayout = 'grid' | 'list';