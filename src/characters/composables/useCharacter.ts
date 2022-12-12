import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { Character } from "../interfaces/character";

const characterSet = ref<{[id: string]: Character}>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);


const getCharacter = async( id: string ): Promise<Character> => {
    if( characterSet.value[id] ){
        return characterSet.value[id];
    }

    try {
        const { data } = await breakingBadApi.get<Character[]>(`/characters/${id}`);
        if(data.length > 0) return data[0];

        throw new Error(`No se encontro un personaje con el id ${ id }`);
        
    } catch (error: any) {
        throw new Error(error);
        
    }


}

const loadedCharacter = (character: Character) => {
    hasError.value = false;
    errorMessage.value = null;
    characterSet.value[character.char_id] = character;
}

const loadedWithError = (error: string) => {
    hasError.value = true;
    errorMessage.value = error;
} 

const useCharacter = (id: string) => {

    const { isLoading } = useQuery(
        ['characters', id],
        () => getCharacter(id),
        {
            onSuccess(character) {
                loadedCharacter(character);
            },
            onError: loadedWithError
        }
    );
    
    return {
        // Properties
        list: characterSet,
        hasError,
        errorMessage,
        isLoading,

        // getters
        character: computed<Character | null>( () => characterSet.value[id] ),

        // Methods
    }
}

export default useCharacter;