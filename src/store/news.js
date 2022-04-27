import axios from "axios";

const state = ()=>({
    listNews :[],
    info : ''
})

const mutations = {
    setNews(state,param){
        state.listNews=param
    },
    setError(state,param){
        state.info=param
    },
}

const actions ={
    fetchNews(store,{query,country,category}){
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${query}&apiKey=95cdd8775c614964953b5a6b171036be`
    axios
    .get(url)
    .then((response)=>{
        store.commit('setNews',response.data.articles)
        console.log(response)
    })
    .catch((error)=>{
        store.commit('setError', error)
    })   
},
}

export default {
    state,
    mutations,
    actions
}