function round(num: number) {
    return num.toFixed(2).replace(/\.0+$/, '')
}

export function convertSizeFile(bytes: number): string {
    if (bytes < 1024) {
        return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
        return round(bytes / 1024) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return round(bytes / 1024 / 1024) + ' MB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024) {
        return round(bytes / 1024 / 1024 / 1024) + ' GB';
    } else {
        return round(bytes / 1024 / 1024 / 1024 / 1024) + ' TB';
    }
}