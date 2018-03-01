
class AppController {
  constructor(GitUserService, $log) {
    'ngInject';
    this.$log = $log;
    this.message = 'Tu buscador de usuarios GitHub';
    this.user = '';
    this.users = [];
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
        .then(async response => {
          await this.searchFollowers(response.data.items);
          this.$log.log(response);
          this.loading = false;
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
  async searchFollowers(users) {
    for (const user of users) {
      await this.gitUserService.getUserFollowers(user.followers_url)
        .then(response => {
          this.$log.log('followers for' + user.login);
          const length = response.data.length;
          if (length) {
            user.followers = response.data;
          } else {
            user.followers = null;
          }
          this.users.push(user);
        })
        .catch(error => {
          this.$log.log(error);
        });
    }
    return this.users;
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
