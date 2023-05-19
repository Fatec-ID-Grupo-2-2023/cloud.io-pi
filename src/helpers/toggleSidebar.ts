export default function toggleDrawer(toggle: () => void) {
    return function (event: React.KeyboardEvent | React.MouseEvent) {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        toggle();
    };
}