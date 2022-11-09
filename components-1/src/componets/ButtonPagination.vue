<script setup>
const emit = defineEmits(['next','back'])
defineProps(['init','end','lengthPost'])
</script>

<template>
    <div class="btn-group" role="group" aria-label="Basic example">
        
        <button :disabled="init <= 0" 
        @click="emit('back')" 
        class="btn btn-outline-primary"
        >Previus</button>

        <button :disabled="end >= lengthPost" 
        @click="emit('next')" 
        class="btn btn-outline-primary"
        >Next</button>
    </div>
</template>