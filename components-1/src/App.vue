<script setup>
import ButtonCounter from './componets/ButtonCounter.vue';
import BlogSpot from './componets/BlogSpot.vue';
import ButtonPagination from './componets/ButtonPagination.vue'
import LoaderSpinner from './componets/LoaderSpiner.vue'
import {onMounted, ref} from 'vue'

const posts = ref([])


const favorite = ref('')

const favoritePost = (title)=> favorite.value = title

const postXpage = 10
const init = ref(0)
const end = ref(postXpage)

const loading = ref(true)

const next = () =>{
  init.value += postXpage
  end.value += postXpage
}
const back = () =>{
  init.value -= postXpage
  end.value -= postXpage
  
}

const fetchData = async () => {
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    posts.value = await res.json()
  }
  catch(error){
    console.log(error)
  }finally{
    loading.value = false
  }
}
fetchData()
// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(res => res.json())
// .then(data => posts.value = data)
//   .finally(()=> loading.value = false)

// onMounted(async() =>{
//   loading.value = true
//   try{
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//     posts.value = await res.json()
//   }
//   catch(error){
//     console.log(error)
//   }finally{
//     loading.value = false
//   }
// })


</script>

<template>
  <LoaderSpinner
    v-if="loading"
  />
  <section class="container" v-else>
    <!-- <ButtonCounter/> -->
    <h1>Page </h1>
    <h2>My favorite post: {{favorite}} </h2>
    <ButtonPagination class="mb-2"
    @next = 'next'
    @back = 'back'
    :init = 'init'
    :end = 'end'
    :lengthPost = 'posts.length'
    />
    <BlogSpot 
      v-for="post in posts.slice(init,end)"
      :key="post.id"
      :title="post.title"
      :id="post.id"
      :body="post.body"
      @favoritePost = 'favoritePost'
      class="mb-2"
    ></BlogSpot>
  </section>
</template>

<style>
</style>