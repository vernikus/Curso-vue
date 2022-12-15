<script setup>
import { useCounterStore } from "@/store/counter.js";
import { storeToRefs } from "pinia";

const useCounter = useCounterStore();
const { increment } = useCounter;
const { count, double } = storeToRefs(useCounter); //Las referencias reactivas y los getters, se transforman en datos 'reactive', estos datos no pueden ser destructurados directamente, se tiene que usar el metodo 'storeToRefs' importado directamente de pinia, y así se puede hacer la destructuracion si problemas
</script>

<template>
  <section>
    <h1>Home counter : {{ count }}</h1>
    <h2>Double : {{ double }}</h2>
    <button @click="increment">Increment</button>
  </section>
</template>
