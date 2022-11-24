<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import CardList from '@/characters/components/CardList.vue'
import characterStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import type { Character } from '../interfaces/character';

const props = defineProps<{ title: string, visible: boolean }>();

const getCharactersCacheFirst = async (): Promise<Character[]> => {
    if( characterStore.characters.count > 0 ){
        return characterStore.characters.list;
    }

    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
}

const { isLoading, isError, data, error } = useQuery(
    ['characters'],
    getCharactersCacheFirst,
    {
        onSuccess( data ){
            characterStore.loadedCharacters(data);
        },
        // onError(error) {
        //     // Aquí se manejaria cualquier error en la promesa
        // }
    }
);


</script>

<template>
    <h1 v-if="characterStore.characters.isLoading">Loading...</h1>

    <div v-else-if="characterStore.characters.hasError">
        <h1>Error al cargar</h1>
        <p>{{ characterStore.characters.errorMessage }}</p>
    </div>

    <template v-else>
        <h2>{{ props.title }}</h2>
        <CardList :characters="characterStore.characters.list" />
    </template>

    
</template>


<style scoped>

</style>