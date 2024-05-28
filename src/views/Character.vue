<script setup>
import { ref, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        status
        species
        gender
        image
        episode {
          name
        }
        created
      }
    }
  }
`

const route = useRoute()

const { result, loading, error, refetch } = useQuery(CHARACTERS_QUERY, null, { fetchPolicy: 'cache-and-network' })

const characters = ref([]);
const showMore = ref(false);
const isMenuOpen = ref(false);

function getFirstEpisode(episodes) {
  if (episodes && episodes.length > 0) {
    return episodes[0].name;
  }
  return 'Unknown';
}

function getLastEpisode(episodes) {
  if (episodes && episodes.length > 0) {
    return episodes[episodes.length - 1].name;
  }
  return 'Unknown';
}

watch(result, (newResult) => {
  characters.value = newResult?.characters?.results || [];
})

watch(loading, (newLoading) => {
  console.log('Characters Loading:', newLoading)
})

watch(error, (newError) => {
  console.log('Characters Error:', newError)
})

function toggleShowMore() {
  showMore.value = !showMore.value;
}

function toggleMenu() { 
  isMenuOpen.value = !isMenuOpen.value;
}

watch(() => route.path, async () => {
  if (route.path === '/characters') {
    await refetch()
  }
})
</script>

<template>
  <div class="bg-[#3b2d2d] text-white min-h-screen">
    <nav class="sticky top-0 z-50 bg-[#3b2d2d] px-4 py-2 flex justify-between items-center">
      <button @click="toggleMenu" class="text-white bg-transparent rounded-full border border-red-500 px-2 py-2 hover:bg-red-500 transition-colors">
        <svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <ul class="flex space-x-2 text-sm">
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/">Home</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/episodes">Episode</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/characters">Character</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/locations">Location</a></li>
      </ul>
      <div v-if="isMenuOpen" class="absolute top-12 right-4 bg-white text-black rounded-lg shadow-lg p-4">
        <p class="text-lg font-bold">Rebika Yihenew</p>
        <p class="text-sm mt-2">GitHub: <a href="https://github.com/yourusername" class="text-blue-500 hover:underline">yourusername</a></p>
        <p class="text-sm mt-2">Figma: <a href="https://www.figma.com/design/zRYAkx5yLpDFflh3jrO7CS/Untitled?node-id=0-1&t=t7iNwkwfRH7wuepM-0" class="text-blue-500 hover:underline">View Design</a></p>
      </div>
    </nav>

    <main class="p-8">
      <section class="mb-8">
        <h2 class="text-3xl font-bold mb-4">All Characters</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <p v-if="error">Something went wrong...</p>
          <p v-if="loading">Loading...</p>
          <template v-else>
            <div v-for="character in characters" :key="character.name" class="flex flex-col items-start gap-4 bg-gray-800 p-4 rounded-lg border border-red-500 shadow-md">
              <router-link :to="'/characters/' + character.id" class="character-link inline-block relative">
                <img :src="character.image" :alt="character.name" class="w-24 h-24 rounded-full border-4 border-red-500 transition-transform duration-200 hover:scale-105">
              </router-link>
              <div class="ml-4">
                <p><span class="font-bold">Name:</span> {{ character.name }}</p>
                <p><span class="font-bold">Species:</span> {{ character.species }}</p>
                <p><span class="font-bold">Gender:</span> {{ character.gender }}</p>
                <p><span class="font-bold">Status:</span> {{ character.status }}</p>
                <p><span class="font-bold">First Episode:</span> {{ getFirstEpisode(character.episode) }}</p>
                <p><span class="font-bold">Last Episode:</span> {{ getLastEpisode(character.episode) }}</p>
                <p class="font-bold">Episodes:</p>
                <ul>
                  <li v-for="(episode, index) in character.episode.slice(0, showMore ? character.episode.length : 5)" :key="index">{{ episode.name }}</li>
                  <li v-if="character.episode.length > 5">
                    <button @click="toggleShowMore" class="text-red-500 hover:text-red-700">Show {{ showMore ? 'less' : 'more' }}</button>
                  </li>
                </ul>
                <p><span class="font-bold">Created:</span> {{ character.created }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>
    </main>
    <footer class="bg-[#1e1e1e] p-16 text-center border-t border-gray-700">
  <div class="text-white">
    <p class="text-2xl font-bold mb-6">Rebika Yihenew</p>
    <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-8 md:space-y-0">
      <p class="text-gray-400 text-lg flex items-center">
        <svg class="w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        GitHub account: <a href="https://github.com/yourusername" class="text-red-500 hover:underline ml-1">yourusername</a>
      </p>
      <p class="text-gray-400 text-lg flex items-center">
        <svg class="w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.85 17.6a2.7 2.7 0 01-.7-.5L3 14.95l1.35-1.35a6 6 0 015.3-1.55M12 12v.01M12 3l9.6 9.6a2 2 0 010 2.83L12 24l-1.35-1.35"></path>
        </svg>
        Figma Design: <a href="https://www.figma.com/design/zRYAkx5yLpDFflh3jrO7CS/Untitled?node-id=0-1&t=t7iNwkwfRH7wuepM-0" class="text-red-500 hover:underline ml-1">View Design</a>
      </p>
    </div>
  </div>
</footer>
  </div>
</template>

<style scoped>
.character-link:hover img {
  transform: scale(1.05);
}
</style>
