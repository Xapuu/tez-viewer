export function checkUniqueType(): (actionType: string) => string {
    const registeredTypes = new Set();
    return (actionType: string): string => {
        if (registeredTypes.has(actionType)) {
            throw new Error(`Action with type:"${actionType}" has already been registered`);
        } else {
            registeredTypes.add(actionType);
            return actionType;
        }
    };
}

export const uniqueType = checkUniqueType();
