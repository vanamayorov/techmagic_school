interface ObjectShape {
    id: number;
    title: string,
    date: number
}

const arrOfObj: ObjectShape[] = [
    {
        id: 1,
        title: "ttile1",
        date: Date.now(),
    },
    {
        id: 2,
        title: "ttile2",
        date: Date.now(),
    },
    {
        id: 3,
        title: "ttile3",
        date: Date.now(),
    }
];

function updateObjectInArray<T>(
    initialArray: T[], 
    key: keyof T,
    value: T[keyof T],
    patch: Partial<T>): T[] {
    return initialArray.map(obj => obj[key] === value ? {...obj, ...patch} : obj);
}

console.log(updateObjectInArray(arrOfObj, "id", 2, {id: 123, title: "Title 2"}));
console.log(arrOfObj);