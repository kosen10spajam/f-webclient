export class MainController {
  constructor (Restangular) {
    'ngInject';
    this.Restangular = Restangular;
    this.Restangular.one('').get().then((data) => {
      this.msg = data.msg;
    })

  }
}
