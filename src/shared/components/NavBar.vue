<script setup lang="ts">

    import type { RouterLink } from '@/router/link-routes';

    interface Props {
        title?: string;
        links?: RouterLink[];
        showIcon?: boolean;
    }
    const props = withDefaults(defineProps<Props>(), {
        showIcon: true,
        links: () => []
    });
</script>

<template>
    <nav>
        <img v-if="props.showIcon" src="@/assets/logo.svg" alt="logo vue" height="25" width="25">
        <span v-if="props.title">{{ props.title }}</span>

        <RouterLink
            v-for="link of props.links"
            :key="link.path"
            :to="link.path">
            {{ link.title }}
        </RouterLink>
    </nav>
</template>


<style scoped>
    nav{
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: 10px;
        display: flex;
        align-items: flex-start;
    }

    img {
        margin-right: 5px;
    }

    span {
        margin-right: 10px;
    }

    a{
        margin-right: 5px;
    }
</style>