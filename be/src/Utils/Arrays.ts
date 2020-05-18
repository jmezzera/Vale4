export const getRandomSubarray = <T>(arr: T[], size: number): T[] => {
    let shuffled = arr.slice(0);
    let i = arr.length;
    let temp: T;
    let index: number;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
};
