import { SAVE_DICTIONARY_ENDPOINT, FIND_WORD_ENDPOINT } from "~config/config";

export const saveDictionary = async (id_user: string, id_dics: string) => {
    const payload = {
        id_user,
        id_dics,
    };

    try {
        const response = await fetch(SAVE_DICTIONARY_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error sending POST request:", error);
        throw error;
    }
};

export const findWord = async (word: string) => {
    try {
        const sanitizedWord = word.replace(/\n/g, '');
        const response = await fetch(`${FIND_WORD_ENDPOINT}?word=${encodeURIComponent(sanitizedWord)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error request:", error);
        throw error;
    }
};