export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('room', {
      url:'/chat-room/:room_id',
      templateUrl: 'app/pages/room/room.html',
      controller: 'RoomController',
      controllerAs: 'room'
    })
  ;

  $urlRouterProvider.otherwise('/');
}
