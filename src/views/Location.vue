<script setup>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const LOCATION_QUERY = gql`
  query Locations {
    locations {
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
    }
  }
`

const route = useRoute()

const { result, loading, error, refetch } = useQuery(LOCATION_QUERY, null, { fetchPolicy: 'cache-and-network' })

const locations = ref([]);
const expandedLocations = ref({});
const isMenuOpen = ref(false); // Add this line

watch(result, (newResult) => {
  locations.value = newResult?.locations?.results || [];
})

watch(loading, (newLoading) => {
  console.log('Locations Loading:', newLoading)
})

watch(error, (newError) => {
  console.log('Locations Error:', newError)
})

function toggleResidents(locationName) {
  expandedLocations.value[locationName] = !expandedLocations.value[locationName];
}

function toggleMenu() { 
  isMenuOpen.value = !isMenuOpen.value;
}

watch(() => route.path, async () => {
  if (route.path === '/locations') {
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
      <!-- Add this dropdown menu -->
      <div v-if="isMenuOpen" class="absolute top-12 right-4 bg-white text-black rounded-lg shadow-lg p-4">
        <p class="text-lg font-bold">Rebika Yihenew</p>
        <p class="text-sm mt-2">GitHub: <a href="https://github.com/Soloparame/Project.git" class="text-blue-500 hover:underline">View Github</a></p>
        <p class="text-sm mt-2">Figma: <a href="https://www.figma.com/design/zRYAkx5yLpDFflh3jrO7CS/Untitled?node-id=0-1&t=t7iNwkwfRH7wuepM-0" class="text-blue-500 hover:underline">View Design</a></p>
      </div>
    </nav>

    <main class="p-8">
      <section class="mb-8">
        <h2 class="text-3xl font-bold mb-4">All Locations</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <p v-if="error">Something went wrong... {{ error.message }}</p>
          <p v-if="loading">Loading...</p>
          <template v-else>
            <template v-for="location in locations" :key="location.name">
              <div class="border border-red-500 rounded-md">
                <div class="p-4 bg-gray-800 rounded-lg shadow-md">
                  <router-link :to="'/locations/' + location.id" class="inline-block relative hover:bg-red-500 hover:text-white rounded-full transition-colors p-2">
                    <h3 class="text-xl font-semibold mb-2">{{ location.name }}</h3>
                  </router-link>
                  <p class="text-sm mb-2">Type: {{ location.type }}</p>
                  <p class="text-sm mb-4">Dimension: {{ location.dimension }}</p>
                  <div>
                    <h4 class="text-lg font-bold mb-2">Residents</h4>
                    <div class="grid grid-cols-1 gap-2">
                      <template v-for="(resident, index) in location.residents" :key="resident.name">
                        <div v-if="index < 5 || expandedLocations[location.name]" class="flex items-center bg-gray-700 p-2 rounded-lg mb-2">
                          <router-link :to="'/characters/' + resident.id" class="inline-block relative"><img :src="resident.image" alt="" class="w-10 h-10 rounded-full border-2 border-red-500 mr-4 hover:scale-110" /></router-link>
                          <router-link :to="'/characters/' + resident.id" class="inline-block relative"><p class="text-sm">{{ resident.name }}</p></router-link>
                        </div>
                      </template>
                      <button v-if="location.residents.length > 5" @click="toggleResidents(location.name)" class="mt-2 text-red-500 hover:text-red-700">
                        {{ expandedLocations[location.name] ? 'Show Less' : 'Show More' }}
                      </button>
                    </div>
                  </div>
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
            GitHub account: <a href="https://github.com/Soloparame/Project.git" class="text-red-500 hover:underline ml-1">View Github</a>
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
