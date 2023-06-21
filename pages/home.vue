<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "~/stores/search";

const searchStore = useSearchStore();

const inputValue = ref("");

const onSearch = () => {
  searchStore.postSearchValue(inputValue.value);

  inputValue.value = "";
};

// https://github.dev/hakimov-dev/DuckDuckGo-clone
</script>

<template>
  <div class="searchBar flex flex-col items-center bg-black">
    <img src="~/assets/images/main-logo.png" alt="logo" />

    <div class="searchInput flex item-center justify-between shadow-2xl">
      <input type="text" v-model="inputValue" @keyup.enter="onSearch" />

      <a @click.prevent="onSearch">
        <img
          class="h-8"
          src="~/assets/images/search-icon.png"
          alt="search-icon"
        />
      </a>
    </div>
  </div>
</template>
