<script setup>
import { computed } from 'vue';

    const props = defineProps({
        list: Array,
        columns: Number
    })

    const column_array = computed(() => {
        let col_array = [];
        for(let i = 0; i < props.columns; i++) {
            col_array[i] = [];
        }
        props.list.forEach((value, index) => {
            col_array[index % props.columns].push(value);
        })

        return col_array;
    })

</script>

<template>
    <div class="is-flex is-flex-direction-row is-justify-content-space-around">
        <ul v-for="column in column_array">
            <li v-for="item in column"><slot :value="item"></slot></li>
        </ul>
    </div>
</template>