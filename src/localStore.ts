export {};

export const saveQueryToLocal = (query: string) => {
    localStorage.setItem("inputSearch", query);
    console.log(query);
};
export const loadQuery = (inputVal) => {
    const getStoredInput = localStorage.getItem("inputSearch");
    if (getStoredInput) {
        inputVal.value = getStoredInput;
        console.log(getStoredInput);
    }
};

export const removeItem = () => {
    localStorage.removeItem("inputSearch");
};

export const clickToSaveLocal = (inputVal) => {
    saveQueryToLocal(inputVal.value);
    console.log(inputVal.value);
};
