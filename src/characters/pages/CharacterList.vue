<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import CardList from '@/characters/components/CardList.vue'
import { useQuery } from '@tanstack/vue-query';
import type { Character } from '../interfaces/character';

const props = defineProps<{ title: string, visible: boolean }>();

const getCharacters = async (): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data.filter( character => ![14,17,39].includes( character.char_id ));
}

const { isLoading, isError, data: characters, error } = useQuery(
    ['characters'],
    getCharacters
);

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>

    <template v-else>
        <h2>{{ props.title }}</h2>
        <CardList :characters="characters!" />
    </template>

    
</template>


<style scoped>

</style>