(() => {

  "use strict";

  angular
    .module('SAM')
    .controller('homeController', function ($scope, $location, moviesService) {
      this.searchDone = false //Exta variable es para saber is se hizo o no una busqueda y mostrar el mensaje correspondiente
      this.posts = []
      this.query = ""
      this.totalPages = 0
      this.currentPage = 1
      this.firstLoadMore = true;

      // funcion encargada de buscar los posts utilizando el el moviesService
      this.searchPosts = () => {
        moviesService.search(this.query, this.currentPage)
          .then((response) => {
            const { data } = response
            this.searchDone = true
            if (data.Response === "False") { // si no hay posts se vacia el array
              this.posts = []
            } else {
              // ese calcula el total de paginas
              if(data.totalResults > 0){
                this.totalPages = data.totalResults / 10
              } else {
                this.totalPages = 0
              }
              //se llenan los posts
              if (this.currentPage > 1) {
                this.posts = [...this.posts, ...data.Search]
              } else {
                this.posts = data.Search
              }
            }
          })
          .catch(err => {
            this.searchDone = true
            alert("Something went wrong XP")
          })
      }

      // se obtiene el query por parametro si lo hay
      if ($location.$$search.q) {
        this.query = $location.$$search.q
        this.searchPosts()
      }

      //funcion que realiza una busqueda cada vez que el texto del input cambia
      //se realiz un debounce para tener los request mas controlados
      this.handleSearchChange = _.debounce(() => {
        if (this.query !== "") {
          this.searchPosts()
        } else {
          this.searchDone = false
          this.posts = []
        }
        $location.search('q', this.query)
      }, 500)

      //funcion que carga mas post a medida que se da scroll
      this.loadMore = _.throttle(() => {
        if (this.firstLoadMore) {
          this.firstLoadMore = false
          return
        }
        if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.searchPosts()
        }
      }, 500)
    })
})()
