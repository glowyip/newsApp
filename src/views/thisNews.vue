<template>
  <v-app>
      <v-app-bar
     app
     color="primary"
     dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-app-bar-title class="text-h7 pl-0 ma-auto">News App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-col class="mt-6" sm="4" >
        <v-text-field
          v-model="keyword"
          @keyup.enter="searchTitle(keyword)"
          placeholder="Search"
          clearable
          rounded
          outlined
          text-sm
          dense
          append-icon="mdi-magnify"
        >
        </v-text-field>
      </v-col>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="primary"  
      dark
      temporary  
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            News App
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        
      <v-list >
        <v-list-item-group >

          <v-list-item @click="fetchNews({query,category:'general', country:'id'})">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="drawer=!drawer">
              Home
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-col>

            <v-list-item-content @click="drawer=!drawer">
              Country
            </v-list-item-content>
             <v-list-item-content>
                <v-radio-group 
                v-model="radioGroup" 
                dense
                >
                  <v-radio value="id" label="Indonesia" @click ="fetchNews({query,category,country:'id'})" @change="country='id'"></v-radio>
                  <v-radio value="us" label="United State"  @click ="fetchNews({query,category,country:'us'})" @change="country='us'"></v-radio>
                  <v-radio value="kr" label="Korea"  @click ="fetchNews({query,category,country:'kr'})" @change="country='kr'"></v-radio>
                </v-radio-group>
              </v-list-item-content>

            </v-col>
          </v-list-item>

          <v-list-item>
            <v-col>

            <v-list-item-content @click="drawer=!drawer">
             Category
            </v-list-item-content>
             <v-list-item-content >
                <v-radio-group 
                v-model="radioGroup" 
                dense
                >
                  <v-radio label="Technology" value="technology" @click ="fetchNews({query,category:'technology',country})" @change="category='technology'"></v-radio>
                  <v-radio label="Business" value="business" @click ="fetchNews({query,category:'business',country})" @change="category='business'"></v-radio>
                  <v-radio label="General" value="general" @click ="fetchNews({query,category:'general',country})" @change="category='general'"></v-radio>
                </v-radio-group>
              </v-list-item-content>

            </v-col>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

      <v-row 
      no-gutters
      >
     <v-col v-for="(news,index) in listNews" :key='index' >
        <v-card class="ma-auto mb-5 " max-width="300">
           <v-img height="200px" :src="`${news.urlToImage}`"></v-img>
            <v-card-title>{{news.title}}</v-card-title>
            <v-card-text>{{news.description}}</v-card-text>
            <v-card-actions>
               <v-btn :href="news.url" small color="primary">Read More</v-btn>
            </v-card-actions>
        </v-card> 
      </v-col>
      </v-row>
  </v-app>
</template>

<script>
export default {
    data:()=>({
        keyword:'',
        drawer : false,
        category : 'general',
        country:'id',
        query:''
    }),
    computed:{
        listNews(){
            return this.$store.state.news.listNews
        }
    },
    methods:{
      fetchNews({query,country,category}){
         this.$store.dispatch('news/fetchNews',{
          query,
          country,
          category,
          })
        },
      searchTitle(query){
        if(this.keyword!=''){
        this.fetchNews({
          query,
          category : this.category,
          country :this.country
        }),
        this.keyword=''
        }else{
        this.fetchNews({
          query: '',
          country : this.country|| 'id',
          category : this.category|| 'general',
        })
        }
      }
    },
    mounted(){
        this.fetchNews({
          query:'',
          country : this.country|| 'id',
          category : this.category|| 'general',
        })
    }
}
</script>