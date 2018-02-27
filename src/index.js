import angular from 'angular';
import {API_BASE} from './app/config';

import {App} from './app/App';
import {GitUserService} from './app/components/git-users/git-user.service';
import 'angular-ui-router';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import routesConfig from './routes';

import 'angular-material/angular-material.css';
import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ngMaterial', 'ngMessages'])
  .config(routesConfig)
  .constant('ApiBase', API_BASE)
  .service('GitUserService', GitUserService)
  .component('app', App);