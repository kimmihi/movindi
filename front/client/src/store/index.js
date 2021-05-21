import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    actors: [],
    reviews: [],
    whereUserWatch:{
      selectBoardType: null,
      selectPage: 1,
      selectArticleID: null
    }
  },
  getters: {
    getOneArticle(state) {
      return state.reviews.filter(review => review.id === state.whereUserWatch.selectArticleID)
    }
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies
    },

    // 커뮤니티 관련함수
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },
    UPDATE_SELECTED_ARTICLEID(state, review) {
      state.whereUserWatch.selectArticleID = review.id
    },
    RESET_SELECTE_ARTICLEID(state) {
      state.whereUserWatch.selectArticleID = null
    }
  },
  actions: {
    getMovies({ commit }) {
      axios.get('http://127.0.0.1:8000/api/v1/movies/')
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
    },

    // 커뮤니티 관련 함수
    getArticles({ commit }) {
      // review 타입 글을 가져온다.
      axios.get(`http://127.0.0.1:8000/api/v1/community/review/`)
        .then(res => {
          commit('SET_REVIEWS', res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    clickArticle({ commit }, review) {
      axios.get(`http://127.0.0.1:8000/api/v1/community/detail/${review.id}/`)
        .then(res => {
          commit('UPDATE_SELECTED_ARTICLEID', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    resetSelectArticleID({ commit }) {
      commit('RESET_SELECTE_ARTICLEID')
    },
  },
  modules: {
  }
})
