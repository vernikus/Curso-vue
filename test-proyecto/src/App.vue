

<template>
  <div>
    <h1>Title {{ title.toUpperCase() }}</h1>
    <!-- Se interpola (concatena )la variable-->
    <br />
    <!-- <h2 v-bind:style='colorBlue'>Im blue</h2>  v-bind es una manera de usar datos de una variable en un atributo-->
    <h2 :style="colorBlue">Im blue</h2>
    <!--Manera abreviada de usae v-bind -->

    <h2>{{ colors }}</h2>

    <h2 :style="`color: ${colors[2]}`">Im any color</h2>
    <!--Puedes concatenar con las backtips-->

    <h2>{{ active ? "Im active" : "Im disabled" }}</h2>
    <!--Se puede usar el operador ternario para hacer una validadcion sencilla -->

    <h2 v-if="active === true">Estoy activo</h2>
    <h2 v-else-if="active === false">
      Estoy inactivo
      <br />
      <span>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
        iusto, aperiam suscipit ut reiciendis dolorum quisquam sapiente esse
        unde quae atque labore nostrum aut ad, itaque beatae quibusdam pariatur
        quia?
        <!-- No hay problemas si dentro del contenedor hay más contenedores, el error solo se presenta si hay etiquetas entremedio del flujo de fuera -->
      </span>
    </h2>
    <p v-else>Estoy indeciso</p>
    <!-- Para usar if-else los bloques de codigo tienen que esta en secuencia  -->
    <h2 v-show="active">I have display</h2>
    <!-- Le da un display none -->
  </div>

  <ul class="arrays">
    <h2>Array fruits</h2>
    <li v-for="(fruit, index) in fruits" :key="fruit.name">
      <!--Manera en la que se usa un for, puede llevar como parametro el indice-->
      {{ index + 1 }}-{{ fruit.name }} - {{ fruit.price }} -
      {{ fruit.description }}
    </li>
  </ul>

  <ul class="objects">
    <h2>Object</h2>
    <!-- Para recorer un objero se reciben 3 parametros, el valor, la clabe y el index -->
    <li v-for="(value, property, index) in fruit" :key="value">
      {{ index }} - {{ property }} : {{ value }}
    </li>
  </ul>

  <ul class="for-if">
    <h2>For if</h2>
    <template v-for="(fruit, index) in fruits" :key="fruit.name">
      <li v-if="fruit.stock > 0">
        {{ index + 1 }} - {{ fruit.name }}: {{ fruit.price }}
      </li>
    </template>
  </ul>

  <div class="Event click">
    <!-- Se pueden pasar parametros si asi lo requiere la función -->
    <button class="clickOn" v-on:click.left="eventClick('text left')">Click left</button>
    <button class="clickOn" @click.right.prevent="eventClick('text right')">Click right</button> <!--Se pueden agregar modificadores a los eventos y se puede colocar el preventDefault-->
  </div>

  <div class="Reactivity">

    <h2>Recursive</h2>
    <h2 :style="`color: ${colorCounter}`">{{counter}}</h2>
    <button @click="operationsCounter('add')">Add counter</button>
    <button @click="operationsCounter('sub')">Sub counter</button>
    <button @click="operationsCounter('reset')">Resset counter</button>
    <button @click="addNumber()" :disabled="bloqCounter">Add number</button>
    <br>
    <p>{{favNumbers}}</p>
  </div>

</template>

<style>
h1 {
  color: coral;
}
</style>

<script setup>
import {ref,computed} from 'vue' //Importamos ref, que sirve para referenciar valores y dar reactividad al código

const title = "dinamic vue";
const colorBlue = "color:blue";
const colors = ["blue", "red", "cyan","green","grey"];
const active = false;
const fruits = [
  {
    name: "Apple",
    price: "$3.00",
    description: "An apple",
    stock: 10,
  },
  {
    name: "Pear",
    price: "$4.00",
    description: "A pear",
    stock: 0,
  },
  {
    name: "Orange",
    price: "$1.50",
    description: "An orange",
    stock: 20,
  },
];
const fruit = {
  name: "Pear",
  price: "$ 2.00",
  description: "A pear",
  stock: 10,
};
const eventClick = (text) => {
  console.log(text);
};
const counter = ref(0); //usamos ref('valor') para referenciar al valor
const favNumbers = ref([]);
const operationsCounter =(flag)=>{
  if(flag === 'add'){
    counter.value++; //para acceder al valor de la variable tenemos que hacer uso de .value 
  }else if (flag === 'sub'){
    counter.value--;
  }else counter.value = 0;
};
//Practicamente los computed son funciones autoejecutables
const colorCounter = computed (() =>{
  let color = colors[3]
  if(counter.value > 0){
    return color;
  }else if(counter.value < 0){
    return color = colors[1];
  }else return color= colors[4]
});

const addNumber = () =>{
  favNumbers.value.push(counter.value)
}

const bloqCounter = computed(()=>{
  const numberSearch = favNumbers.value.find(num => num === counter.value)
  if(numberSearch === 0) return true
  return numberSearch? true : false
})


</script>