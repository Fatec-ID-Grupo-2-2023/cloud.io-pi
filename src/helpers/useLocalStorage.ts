import { useState } from 'react';

type IResponse<T> = [
    T,
    (_: T) => void
]

export function useLocalStorage<T>(key: string, initialValue: T): IResponse<T> {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.error(err);
            return initialValue;
        }
    });

    function setValue(value: T) {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.error(err);
        }
    }

    return [storedValue, setValue];
}