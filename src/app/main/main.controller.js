export class MainController {
  constructor(Restangular) {
    'ngInject';
    this.Restangular = Restangular;

    this.Restangular.one('rooms').get().then((data) => {
      console.log(data);
    })
  }
}
