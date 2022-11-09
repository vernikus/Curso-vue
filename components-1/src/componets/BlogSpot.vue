<script setup>
defineProps(['title','id','colorText','body'])
const emit = defineEmits(['favoritePost'])
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{id}} - {{title}}</h5>
      <p :class="`text-${colorText}`">{{body}}</p>
      <button class="btn btn-outline-primary" @click="emit('favoritePost',title)">Favorite</button>
    </div>
  </div>
</template>