import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { Character } from "../interfaces/character";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
    if( characters.value.length > 0 ){
        return characters.value;
    }

    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
}

const loadedCharacters = (data: Character[]) => {
    hasError.value = false;
    errorMessage.value = null;
    characters.value = data.filter(character => ![14,17,39].includes(character.char_id));
}

const useCharacters = () => {

    const { isLoading, } = useQuery(
        ['characters'],
        getCharacters,
        {
            onSuccess( data ){
               loadedCharacters(data);
            },
            // onSuccess: loadedCharacters,
            // onError(error) {
            //     // Aquí se manejaria cualquier error en la promesa
            // }
        }
    );

    return {
        // Properties
        characters,
        isLoading,
        hasError,
        errorMessage,
        // Getters
        count: computed( () => characters.value.length ),

        // Methods
    }
}

export default useCharacters;