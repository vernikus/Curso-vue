import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesPokemons = defineStore("favorite", () => {
  const favorites = ref([]);
  if(localStorage.getItem('favorites')){
    favorites.value = JSON.parse(localStorage.getItem('favorites'))
  }
  const add = (poke) =>  {
    favorites.value.push(poke)
    localStorage.setItem('favorites',JSON.stringify(favorites.value))
};
  const deleted = (id) => {
    favorites.value = favorites.value.filter(poke => poke.id !== id)
    localStorage.setItem('favorites',JSON.stringify(favorites.value))
}

  const findPokemon = (name) => favorites.value.find( poke => poke.name === name )
  return {
    favorites,
    add,
    deleted,
    findPokemon
  };
});
