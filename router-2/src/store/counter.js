import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const increment = () => count.value++;
  const double = computed(() => count.value * 2);
  return {
    count,
    increment,
    double,
  };
});
// export const useCounterStore = defineStore('counter',{ //como primer argumento recibe un identificador por cada uno de los archivos que estamos modularizando
//     state: ()=> ({
//         count:0
//     }),
//     actions:{ //dentro de las acciones podemos tener los diferentes metodos o funciones que se requieren
//         increment(){
//             this.count ++
//         }
//     },
//     getters:{ // los getters son las propiedades computadas
//         double: (state) => state.count * 2
//         // siempre se tiene que recibir el state, por esa razon se puede acceder directamente a sua propiedades
//     }
// })
