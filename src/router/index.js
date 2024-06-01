  
import {createRouter, createWebHistory} from 'vue-router'
import Character from '../components/Character.vue'
import Episode from '../components/Episode.vue'
import Location from '../components/Location.vue'
import Home from '../components/Home.vue'
import CharacterDetails from '../components/CharacterDetails.vue';
import LocationDetails from '../components/LocationDetails.vue';
import EpisodeDetails from '../components/EpisodeDetails.vue';


  const router= createRouter(
    { history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
           {
                path:"/",
                name:"Home",
                component: Home,
           },
           {
            path:"/characters",
            name:"character",
            component: Character,
          },
          {
               path:"/Episodes",
               name:"episode",
               component: Episode,
          },
          {
               path:"/Locations",
               name:"location",
               component: Location,
          },
          { path: "/characters/:id",
            name: "CharacterDetails",
           component: CharacterDetails,
           props: true,
          },
          { path: '/locations/:id', 
            name: "LocationDetails",
            component: LocationDetails, 
            props: true,
          },
          { path: '/episodes/:id', 
           name: "EpisodeDetails",
            component: EpisodeDetails, 
            props: true,
          }
       
    ]
   }
)


export default router
