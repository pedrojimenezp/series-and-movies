(() => {

  "use strict";

  angular
    .module('SAM')
    .controller('homeController', function ($scope, $location, moviesService) {
      this.searchDone = false
      this.posts = []
      this.query = ""
      this.totalPages = 0
      this.currentPage = 1

      this.searchPosts = () => {
        moviesService.search(this.query, this.currentPage)
          .then((response) => {
            const { data } = response
            this.searchDone = true
            if (data.Response === "False") {
              this.posts = []
            } else {
              if(data.totalResults > 0){
                this.totalPages = data.totalResults / 10
              } else {
                this.totalPages = 0
              }
              if (this.currentPage > 1) {
                this.posts = [...this.post, ...data.Search]
              } else {
                this.posts = data.Search
              }
              console.log(this.posts)
            }
          })
          .catch(err => {
            this.searchDone = true
            alert("Something went wrong XP")
          })
      }

      if ($location.$$search.q) {
        this.query = $location.$$search.q
        this.searchPosts()
      }

      this.handleSearchChange = _.debounce(() => {
        if (this.query !== "") {
          this.searchPosts()
        } else {
          this.searchDone = false
          this.posts = []
        }
        $location.search('q', this.query)
      }, 500)

      this.loadMore = () => {
        console.log("loading more content...")
        if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.searchPost()
        }
      }
    })
})()
