export class MainController {
  constructor($location, Restangular) {
    'ngInject';
    this.Restangular = Restangular;
    this.$location = $location;

    this.Restangular.one('rooms').get().then((data) => {
      this.$location.path('/chat-room/1');
    })
  }
}
