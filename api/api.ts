import {SAVE_DICTIONARY_ENDPOINT, FIND_WORD_ENDPOINT, FIND_DICTIONARY_BY_ID_USER} from "~config/config";

export const saveDictionary = async (id_user: string, id_dics: string, word: string) => {
    const payload = {
        "id_user": id_user,
        "dics": {
            "id_dics": id_dics,
            "word": word,
        },

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

export const findDictionarysByIdUser = async (id_user: string) => {
    try {
        const sanitizedWord = id_user.replace(/\n/g, '');
        const response = await fetch(`${FIND_DICTIONARY_BY_ID_USER}?id_user=${encodeURIComponent(sanitizedWord)}`, {
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