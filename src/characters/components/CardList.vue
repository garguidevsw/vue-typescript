<script setup lang="ts">
// import { ref } from 'vue';
// import { useCharacters } from '@/characters/composables/useCharacters';
// import { useQuery } from '@tanstack/vue-query';
// import breakingBadApi from '@/api/breakingBadApi';
// import type { Character } from '@/characters/interfaces/character';
import CharacterCard from '@/characters/components/CharacterCard.vue'
import type { Character } from '../interfaces/character';
//* Manejo de la petición haciendo uso de Suspense
// const { data: characters } = await breakingBadApi.get<Character[]>('/characters');
// const characters = ref<Character[]>(data);

//* Manejo básico de la petición
// const characters = ref<Character[]>([]);
// const isLoading = ref<boolean>(true);
// breakingBadApi.get<Character[]>('/characters').then( resp => {
//     characters.value = resp.data;
//     isLoading.value = false;
// });

//* Manejo de la petición usando Composables Functions
// const { characters, isLoading, isError, error  } = useCharacters();


//* Manejo de la petición con Tanstack Query
// const getCharactersSlow = async():Promise<Character[]> => {
    
//     return new Promise( (resolve) => {
//         setTimeout( async() => {
//             const { data } = await breakingBadApi.get<Character[]>('/characters')
//             resolve(data.filter( character => ![14,17,39].includes( character.char_id )));
//         }, 3)
//     })  
// }   

// const { isLoading, isError, data: characters, error } = useQuery(
//     ['characters'],
//     getCharactersSlow,
//     // {
//     //     cacheTime: 1000 * 60,
//     //     refetchOnReconnect: 'always'
//     // }
// );

const props = defineProps<{ characters: Character[] }>();



</script>

<template>
    <!-- <h1 v-if="isLoading">Loading...</h1> -->
    <!-- <h1 v-if="isError">{{ error }}</h1> -->
    <div class="card-list">
        <CharacterCard 
            v-for="character of characters" 
            :key="character.char_id"
            :character="character"
        />
    </div>
</template>


<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>