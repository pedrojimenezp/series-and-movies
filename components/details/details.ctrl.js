(() => {
  "use strict";
  angular
    .module('SAM')
    .controller('detailsController', function ($scope, $location, $state, moviesService) {
      this.searchDone = false
      this.post = {}

      //se busca un solo post tomando el Id de la URL
      moviesService.searchById($state.params.postId)
        .then((response) => {
          const { data } = response
          this.searchDone = true
          if (data.Response === "False") {
            this.post = {}
          } else {
            this.post = data
          }
        })
        .catch(err => {
          this.searchDone = true
          alert("Something went wrong XP")
        })

      this.goBack = () => {
        $state.go('home', {q: $state.params.q})
      }
    })
})()
