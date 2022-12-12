import { onMounted, ref } from "vue";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "@/characters/interfaces/character";
import axios from "axios";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () => {

    onMounted( async() => {
        await loadCharacters();
    });

    const loadCharacters = async () => {

        if(characters.value.length > 0) return;

        isLoading.value = true;
        try {
            const { data } = await breakingBadApi.get<Character[]>('/characters');
            characters.value = data;
            isLoading.value = false;
        } catch (error) {
            hasError.value = true;
            isLoading.value = false;

            if( axios.isAxiosError(error) ){
                return errorMessage.value = error.message;
            }

            errorMessage.value = JSON.stringify(error);
        }
    }


    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }
}