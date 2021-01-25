export function fromEntries(entries: [string, any][]): { [key: string]: any } {
    return entries.reduce((acc: { [key: string]: any }, [key, val]) => {
        acc[key] = val;
        return acc;
    }, {});
}
