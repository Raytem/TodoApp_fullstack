import { useState, useEffect } from 'react';
import { IData } from '../models/IData';

interface State<T> {
    fetchData: () => Promise<void>,
    isLoading: boolean,
    error: Error | null
}

export function useFetch<T extends IData>(fetchFunction: () => Promise<void>) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    async function fetchData() {
        try {
            await fetchFunction();
            setIsLoading(false);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    }

    const state: State<T> = {
        fetchData, isLoading, error
    }

    return state;
}