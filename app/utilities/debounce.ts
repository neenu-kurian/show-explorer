let timeout: ReturnType<typeof setTimeout>;
export function debounce(callback: () => void, delay: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {callback()}, delay);
}