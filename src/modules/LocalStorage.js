const LS_KEY = 'OPSS2_todos';

const readFromLocalStorage = (key) => {
    const lsData = localStorage.getItem(key);
    return lsData ? JSON.parse(lsData) : [];
};

const saveToLocalStorage = (value, key) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export { readFromLocalStorage, saveToLocalStorage };
