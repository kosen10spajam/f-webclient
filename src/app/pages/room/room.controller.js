export class RoomController {
  constructor(Restangular) {
    'ngInject';
    this.Restangular = Restangular;
    this.Restangular.one('rooms/1').post().then((data) => {
      this.user = data.animal;
      this.Restangular.one('rooms/1/messages').get({
        'since': 0
      }).then((msg_data) => {
        console.log(msg_data.items);
        this.items = msg_data.items
      });
    });

    $('body').delay(100).animate({
      scrollTop: $(document).height()
    }, 500);
  }

  sendMessage() {
    console.log(this.messageText);
    //this.items.push(
    //  {
    //    'animal': this.user,
    //    'time': moment(),
    //    'message': this.messageText
    //  }
    //);
    var date = new Date();
    var timestamp = date.getTime();

    this.Restangular.one('rooms/1/messages').post('','',
      {
        'animal': this.user,
        'message': this.messageText,
        'time': timestamp
      }).then(() => {
      this.Restangular.one('rooms/1/messages').get({
        'since': 0
      }).then((msg_data) => {
        console.log(msg_data.items);
        this.items = msg_data.items;
        this.messageText = "";
    $('body').delay(100).animate({
      scrollTop: $(document).height()
    }, 500);
      });
    });
  }

  transTime(unix_time) {
    return moment(unix_time*1000).format('HH:mm');
  }

}
