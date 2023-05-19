import { debounce } from 'lodash';
import { useCallback } from 'react';
import SearchIcon from '../../assets/search.svg';
import TextFieldIcon from '../TextFieldIcon';

interface IProps {
    id?: string;
    placeholder?: string | null;
    onSearch: (value: string) => void;
}

export default function SearchField({ id, placeholder, onSearch }: IProps) {
    const delayedQuery = useCallback(
        debounce((q) => onSearch(q), 500),
        []
    );

    return (
        <TextFieldIcon
            id={id}
            icon={SearchIcon}
            label={placeholder}
            onChange={(e) => delayedQuery(e.target.value)}
        />
    );
}