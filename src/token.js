export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
};

export const setTokenInLocalStorage = (token) => {
    const serializedToken = JSON.stringify(token);
    localStorage.setItem('token', serializedToken);
};

export const clearTokenInLocalStorage = () => {
    localStorage.removeItem('token');
};