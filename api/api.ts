import {
    API_FIND_NEW_WORD,
    API_SAVE_WORD_NOT_FOUND, DELETE_DICTIONARY_BY_ID_DISC,
    FIND_DICTIONARY_BY_ID_USER,
    FIND_WORD_ENDPOINT,
    SAVE_DICTIONARY_ENDPOINT
} from "~config/config";

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

export const deleteDictionary = async (id_user: string, id_dics: string, word: string) => {
    const payload = {
        "id_user": id_user,
        "dics": {
            "id_dics": id_dics,
            "word": word,
        },

    };

    try {
        const response = await fetch(DELETE_DICTIONARY_BY_ID_DISC, {
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
            return "word not found";
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error request:", error);
        throw error;
    }
};

// find word when not found
export const genWordByN8N = async (data: string) => {

    try {
        const response = await fetch(API_FIND_NEW_WORD, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "data": data})
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        const match = result[0].output.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        const word  = JSON.parse(match[1]);
        return word;
    } catch (error) {
        console.error("Error sending POST request:", error);
        throw error;
    }
};

// save word when not found
export const saveWord = async (word: Object) => {

    try {
        const response = await fetch(API_SAVE_WORD_NOT_FOUND, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(word),
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