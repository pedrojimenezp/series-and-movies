(() => {

  "use strict";

  angular
    .module('SAM')
    .factory('moviesService', ($http) => {
      const API = 'http://www.omdbapi.com'
      const search = (query, page = 1)  => $http.get(`${API}?s=${query}&page=${page}`)
      const searchById = (id)  => $http.get(`${API}?i=${id}`)
      return {
        search,
        searchById
      }
    })
})()
