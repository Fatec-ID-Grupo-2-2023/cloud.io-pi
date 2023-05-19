import DropBoxIcon from '../../assets/dropbox.svg';
import GoogleDriveIcon from '../../assets/google-drive.svg';
import OneDriveIcon from '../../assets/one-drive.svg';
import { ICloudioOrigin } from '../../models/cloud';

export default function getCloudIcon(cloud: ICloudioOrigin): string {
    switch (cloud) {
        case 'dropbox': return DropBoxIcon;
        case 'google-drive': return GoogleDriveIcon;
        case 'onedrive': return OneDriveIcon;
        default:
            console.error('Invalid cloud type');
            return '';
    }
}