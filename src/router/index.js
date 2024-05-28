  
import {createRouter, createWebHistory} from 'vue-router'
import Character from '../views/Character.vue'
import Episode from '../views/Episode.vue'
import Location from '../views/Location.vue'
import Home from '../views/Home.vue'
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
