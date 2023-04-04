export function dateFormatter(inpDate: Date): string {
    const date: Date = new Date(inpDate);

    const day: number = date.getDay();
    const dayStr: string = (day < 10) ? `0${day}` : `${day}`;

    const month: number = date.getMonth() + 1;
    const monthStr: string = (month < 10) ? `0${month}` : `${month}`;

    const year: number = date.getFullYear();
    const yearStr: string = `${year}`;

    const hours: number = date.getHours();
    const hoursStr: string = (hours < 10) ? `0${hours}` : `${hours}`;

    const minutes: number = date.getMinutes();
    const minutesStr: string = (minutes < 10) ? `0${minutes}` : `${minutes}`;

    const formattedDate: string = `${dayStr}.${monthStr}.${yearStr}, ${hoursStr}:${minutesStr}`;

    return formattedDate;
}