<script setup>
import { ref, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const EPISODE_QUERY = gql`
  query Episodes {
    episodes {
      results {
        id
        name
        air_date
        created
        characters {
          id
          name
          status
          species
          gender
          image
        }
      }
    }
  }
`

const { result, loading, error } = useQuery(EPISODE_QUERY)

const showAllCharacters = ref({})
const newComment = ref('')
const isMenuOpen = ref(false)

const toggleShowCharacters = (episodeName) => {
  showAllCharacters.value[episodeName] = !showAllCharacters.value[episodeName]
}

const submitComment = () => {
  console.log('Submitted comment:', newComment.value)
  newComment.value = ''
}

function toggleMenu() { 
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="bg-[#3b2d2d] text-white min-h-screen flex flex-col">
    <nav class="sticky top-0 z-50 bg-[#3b2d2d] px-4 py-2 flex justify-between items-center border-b border-gray-700">
      <button @click="toggleMenu" class="text-white bg-transparent rounded-full border border-red-500 px-2 py-2 hover:bg-red-500 transition-colors">
        <svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <ul class="flex space-x-2 text-sm">
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/">Home</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/episodes">Episodes</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/characters">Characters</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/locations">Locations</a></li>
      </ul>
      <div v-if="isMenuOpen" class="absolute top-12 right-4 bg-white text-black rounded-lg shadow-lg p-4">
        <p class="text-lg font-bold">Rebika Yihenew</p>
        <p class="text-sm mt-2">GitHub: <a href="https://github.com/yourusername" class="text-blue-500 hover:underline">yourusername</a></p>
        <p class="text-sm mt-2">Figma: <a href="https://www.figma.com/design/zRYAkx5yLpDFflh3jrO7CS/Untitled?node-id=0-1&t=t7iNwkwfRH7wuepM-0" class="text-blue-500 hover:underline">View Design</a></p>
      </div>
    </nav>

    <main class="p-8 flex-grow">
      <section class="mb-8">
        <h2 class="text-3xl font-bold mb-4">All Episodes</h2>
        <div class="space-y-8">
          <p v-if="error || loading" class="text-white">Loading episodes...</p>
          <template v-else>
            <template v-for="episode in result.episodes.results" :key="episode.id">
              <div class="episode-card bg-gray-800 rounded-lg p-6 border border-red-500 shadow-md">
                <router-link :to="'/episodes/' + episode.id" class="block text-center">
                  <h3 class="text-xl font-bold mb-4 text-center text-white rounded-full border-2 border-red-500 p-2 inline-block hover:bg-red-500 hover:text-white transition-colors">{{ episode.name }}</h3>
                </router-link>
                <p class="text-white mb-4">Air Date: {{ episode.air_date }}</p>
                <p class="text-white mb-4">Created: {{ episode.created }}</p>
                <p class="text-white mb-4">Characters:</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <template v-for="(character, index) in episode.characters.slice(0, showAllCharacters[episode.name] ? episode.characters.length : 8)" :key="character.id">
                    <div class="character-card text-center">
                      <router-link :to="'/characters/' + character.id" class="inline-block relative">
                        <img :src="character.image" alt="" class="rounded-full mb-2 mx-auto w-24 h-24 object-cover border-2 border-red-500 hover:scale-110 transition-transform duration-200" />
                      </router-link>
                      <p class="text-white">{{ character.name }}</p>
                    </div>
                  </template>
                </div>
                <div v-if="episode.characters.length > 8" class="text-center mt-4">
                  <button @click="toggleShowCharacters(episode.name)" class="show-button bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors">
                    {{ showAllCharacters[episode.name] ? 'Show Less' : 'Show More' }}
                  </button>
                </div>
                <div class="comments mt-8">
                  <h4 class="text-lg font-bold mb-2 text-white">Comments</h4>
                  <textarea v-model="newComment" class="comment-input w-full bg-gray-700 rounded-lg p-3 text-white" placeholder="Add a comment..."></textarea>
                  <button @click="submitComment" class="submit-button bg-red-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-red-600 transition-colors">Submit</button>
                </div>
              </div>
            </template>
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

