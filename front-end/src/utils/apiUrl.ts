export const apiUrl = (path: string) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL

    return baseUrl + path
}