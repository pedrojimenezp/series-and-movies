(() => {

  "use strict";

  angular
    .module('SAM')
    .factory('moviesService', ($http) => {
      const API = 'http://www.omdbapi.com' //Api que se va a consumir

      //Buscar por query
      const search = (query, page = 1)  => $http.get(`${API}?s=${query}&page=${page}`)

      //Buscar por Id
      const searchById = (id)  => $http.get(`${API}?i=${id}`)

      //Retornar las dos funciones para que se puedan consumir fuera
      return {
        search,
        searchById
      }
    })
})()
