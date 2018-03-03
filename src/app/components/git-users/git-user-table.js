
class GitUserTableController {
  constructor($log) {
    'ngInject';
    this.$log = $log;
  }
}

export const gitUserTableComponent = {
  template: require('./git-user-table.html'),
  bindings: {
    users: '<'
  },
  controller: GitUserTableController
};
