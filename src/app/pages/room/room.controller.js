export class RoomController {
  constructor(Restangular) {
    'ngInject';
    this.Restangular = Restangular;
    this.Restangular.one('').get().then((data) => {
      this.msg = data.msg;
    });
    this.items = [];
    for (var i = 0; i < 20; i++) {
      this.items.push({
        'animal': 'nyan',
        'message': 'hello'
      });
    }
  }
}
