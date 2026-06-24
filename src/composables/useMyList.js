import { ref } from "vue";

const myList = ref(JSON.parse(localStorage.getItem("elflix-mylist") || "[]"));

const save = () => {
  localStorage.setItem("elflix-mylist", JSON.stringify(myList.value));
};

export function useMyList() {
  const addToList = (movie) => {
    if (!myList.value.find((m) => m.id === movie.id)) {
      myList.value.push(movie);
      save();
    }
  };

  const removeFromList = (movieId) => {
    myList.value = myList.value.filter((m) => m.id !== movieId);
    save();
  };

  const isInList = (movieId) => {
    return myList.value.some((m) => m.id === movieId);
  };

  const toggleList = (movie) => {
    if (isInList(movie.id)) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };

  return { myList, addToList, removeFromList, isInList, toggleList };
}
