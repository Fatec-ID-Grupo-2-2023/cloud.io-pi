import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useToggle(value1: any = true, value2: any = false) {
    const [value, setValue] = useState(value1);

    const toggle = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue((prevValue: any) => (prevValue === value1 ? value2 : value1));
    }, [value1, value2]);

    return [value, toggle] as const;
}