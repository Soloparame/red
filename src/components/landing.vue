<script>
import { RouterLink } from 'vue-router';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import VueCarousel from 'vue-carousel';

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        name
        image
        id
      }
    }
  }
`;

const LOCATIONS_QUERY = gql`
  query Locations {
    locations {
      results {
        name
        id
      }
    }
  }
`;

const EPISODES_QUERY = gql`
  query Episodes {
    episodes {
      results {
        name
        air_date
        id
      }
    }
  }
`;

export default {
  setup() {
    const { result: charactersResult, loading: charactersLoading, error: charactersError } = useQuery(CHARACTERS_QUERY);
    const { result: locationsResult, loading: locationsLoading, error: locationsError } = useQuery(LOCATIONS_QUERY);
    const { result: episodesResult, loading: episodesLoading, error: episodesError } = useQuery(EPISODES_QUERY);

    return {
      charactersResult,
      charactersLoading,
      charactersError,
      locationsResult,
      locationsLoading,
      locationsError,
      episodesResult,
      episodesLoading,
      episodesError
    };
  },
  data() {
    return {
      currentImageIndex: 0,
      imageUrls: [
        "images/1741ea7b74b89b3750858296138b1d90.jpg", 
        "images/rick-morty.avif",
        "images/ZDLEN74CD5HVLNMVM2PKASNIJA.avif"
      ],
      showMoreCharacters: false,
      showMoreLocations: false,
      showMoreEpisodes: false,
      isMenuOpen: false // Add this line
    };
  },
  computed: {
    currentImageUrl() {
      return this.imageUrls[this.currentImageIndex];
    },
    displayedCharacters() {
      if (this.showMoreCharacters) {
        return this.charactersResult?.characters?.results || [];
      } else {
        return this.charactersResult?.characters?.results?.slice(0, 8) || [];
      }
    },
    displayedLocations() {
      if (this.showMoreLocations) {
        return this.locationsResult?.locations?.results || [];
      } else {
        return this.locationsResult?.locations?.results?.slice(0, 6) || [];
      }
    },
    displayedEpisodes() {
      if (this.showMoreEpisodes) {
        return this.episodesResult?.episodes?.results || [];
      } else {
        return this.episodesResult?.episodes?.results?.slice(0, 6) || [];
      }
    }
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
      }, 5000);
    },
    toggleShowMoreCharacters() {
      this.showMoreCharacters = !this.showMoreCharacters;
    },
    toggleShowMoreLocations() {
      this.showMoreLocations = !this.showMoreLocations;
    },
    toggleShowMoreEpisodes() {
      this.showMoreEpisodes = !this.showMoreEpisodes;
    },
    toggleMenu() { // Add this method
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
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
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/episodes"> Episodes</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/characters">Characters</a></li>
        <li><a class="rounded-full px-3 py-2 border border-red-500 flex items-center justify-center text-white hover:bg-red-500 transition-colors" href="/locations">Locations</a></li>
      </ul>
      <!-- Add this dropdown menu -->
      <div v-if="isMenuOpen" class="absolute top-12 right-4 bg-white text-black rounded-lg shadow-lg p-4">
        <p class="text-lg font-bold">Rebika Yihenew</p>
        <p class="text-sm mt-2">GitHub: <a href="https://github.com/Soloparame/Project.git" class="text-blue-500 hover:underline">View Github</a></p>
        <p class="text-sm mt-2">Figma: <a href="https://www.figma.com/design/zRYAkx5yLpDFflh3jrO7CS/Untitled?node-id=0-1&t=t7iNwkwfRH7wuepM-0" class="text-blue-500 hover:underline">View Design</a></p>
      </div>
    </nav>
    <vue-carousel>
      <header class="relative h-screen bg-cover bg-center" :style="{ 'background-image': 'url(' + currentImageUrl + ')' }">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative z-10 flex items-start justify-between h-full p-8">
          <div class="text-left max-w-lg">
            <h1 class="text-5xl font-bold text-green-500 font-horror">Rick and Morty</h1>
            <div class="mt-4 text-lg text-white">
              <p class="mb-2"><span class="text-red-500 font-bold">Genre:</span> Animated Sci-Fi Comedy</p>
              <p class="mb-2"><span class="text-red-500 font-bold">Creator:</span> Justin Roiland & Dan Harmon</p>
              <p class="mb-2"><span class="text-red-500 font-bold">Stars:</span> Justin Roiland, Chris Parnell, Spencer Grammer, Sarah Chalke</p>
            </div>
            <p class="mt-6 text-lg text-white">"Rick and Morty" is an animated sci-fi comedy series that follows the adventures of an eccentric and alcoholic scientist named Rick Sanchez and his good-hearted but easily influenced grandson, Morty Smith. Together, they traverse through various dimensions, alternate realities, and bizarre planets, embarking on wild and often dangerous escapades.</p>
            <p class="mt-6 flex items-center text-lg text-white">Rating: ⭐⭐⭐⭐☆</p>
          </div>
        </div>
      </header>
    </vue-carousel>
    <main class="p-8 flex-grow">
      <section id="characters" class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-red-500">Characters</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <p v-if="charactersError">Something went wrong...</p>
          <p v-if="charactersLoading">Loading...</p>
          <div v-else v-for="character in displayedCharacters" :key="character.name" class="text-center relative">
            <router-link :to="'/characters/' + character.id" class="inline-block relative">
              <img :src="character.image" alt="" class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-red-500 mx-auto hover:opacity-75">
              <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">See Details</p>
            </router-link>
            <p class="mt-2">{{ character.name }}</p>
          </div>
        </div>
        <button v-if="charactersResult?.characters?.results.length > 8" @click="toggleShowMoreCharacters" class="mt-4 text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
          {{ showMoreCharacters ? 'Show Less' : 'Show More' }}
        </button>
      </section>
      <section id="locations" class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-red-500">Locations</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p v-if="locationsError">Something went wrong...</p>
          <p v-if="locationsLoading">Loading...</p>
          <div v-else v-for="location in displayedLocations" :key="location.name" class="border border-gray-700 rounded-lg p-4 hover:bg-gray-800">
            <router-link :to="'/locations/' + location.id" class="inline-block relative">
              <h3 class="text-xl font-semibold hover:text-red-500">{{ location.name }}</h3>
            </router-link>
          </div>
        </div>
        <button v-if="locationsResult?.locations?.results.length > 6" @click="toggleShowMoreLocations" class="mt-4 text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
          {{ showMoreLocations ? 'Show Less' : 'Show More' }}
        </button>
      </section>
      <section id="episodes" class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-red-500">Episodes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p v-if="episodesError">Something went wrong...</p>
          <p v-if="episodesLoading">Loading...</p>
          <div v-else v-for="episode in displayedEpisodes" :key="episode.name" class="border border-gray-700 rounded-lg p-4 hover:bg-gray-800">
            <router-link :to="'/episodes/' + episode.id" class="inline-block">
              <h3 class="text-xl font-semibold hover:text-red-500">{{ episode.name }}</h3>
            </router-link>
            <p class="mt-2 text-gray-400">Air Date: {{ episode.air_date }}</p>
          </div>
        </div>
        <button v-if="episodesResult?.episodes?.results.length > 6" @click="toggleShowMoreEpisodes" class="mt-4 text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
          {{ showMoreEpisodes ? 'Show Less' : 'Show More' }}
        </button>
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
            GitHub account: <a href="https://github.com/Soloparame/Project.git" class="text-red-500 hover:underline ml-1">View Git hub</a>
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
