
class AppController {
  constructor(GitUserService, $log) {
    'ngInject';
    this.$log = $log;
    this.message = 'Tu buscador de usuarios GitHub';
    this.user = '';
    this.users = [];
    this.followerPromises = [];
    this.searching = false;
    this.loading = false;

    this.gitUserService = GitUserService;
  }
  searchUsers() {
    if (this.user.length >= 4) {
      this.searching = true;
      this.loading = true;
      this.users = [];
      this.followerPromises = [];
      this.gitUserService
        .getUsers(this.user)
        .then(response => {
          const promises = []; // Saves all promises for getting followers
          response.data.items.forEach(user => {
            this.users.push(user);
            promises.push(this.gitUserService.getUserFollowers(user.followers_url));
          });
          // Promise.all(promises)
          //   .then(response => {
          //     this.users.forEach((user, index) => {
          //       debugger;
          //       user.followers = response[index].data[index];
          //     });
          //     this.loading = false;
          //   })
          //   .catch(error => {
          //     this.$log.error(error);
          //     this.searching = false;
          //     this.loading = false;
          //   });
        })
        .catch(error => {
          this.$log.error(error);
          this.searching = false;
          this.loading = false;
        });
    } else {
      this.searching = false;
      this.loading = false;
    }
  }
  _sliceOnThreeFollowers(followers) {
    return followers.slice(1, 4);
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
