export class RoomController {
  constructor(Restangular, $interval) {
    'ngInject';
    this.Restangular = Restangular;
    this.$interval = $interval;
    this.stations = ['秋葉原', '神田', '東京', '有楽町', '新橋', '浜松町', '田町', '品川'];
    this.stationIndex = 0;
    this.Restangular.one('rooms/1').post().then((data) => {
      this.user = data.animal;
      this.Restangular.one('rooms/1/messages').get({
        'since': 0
      }).then((msg_data) => {
        console.log(msg_data.items);
        this.items = msg_data.items;

        this.periodicGetMessages = this.$interval(() => {
          this.Restangular.one('rooms/1/messages').get({
            'since': 0
          }).then((new_msg_data) => {
            console.log(new_msg_data.items);
            if (this.items.length < new_msg_data.items.length) {
              for (var i = this.items.length; i < new_msg_data.items.length; i++) {
                this.items.push(new_msg_data.items[i]);
              }
              this.scrollToBottom();
            }
          });
        }, 2000);

        this.incrementStationIndex = this.$interval(() => {
          this.stationIndex += 1;
          if (this.stationIndex >= this.stations.length) this.stationIndex = 0;
        }, 120000)
      });
    });
  }

  scrollToBottom() {
    $('body').delay(100).animate({
      scrollTop: $(document).height()
    }, 500);
  }

  sendMessage() {
    var sendMessage = this.messageText;
    this.messageText = "";
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

    this.Restangular.one('rooms/1/messages').post('', '',
      {
        'animal': this.user,
        'message': sendMessage,
        'time': timestamp
      }).then(() => {
      this.Restangular.one('rooms/1/messages').get({
        'since': 0
      }).then((msg_data) => {
        if (this.items.length < msg_data.items.length) {
          for (var i = this.items.length; i < msg_data.items.length; i++) {
            this.items.push(msg_data.items[i]);
          }
          this.scrollToBottom();
        }
        $('body').delay(100).animate({
          scrollTop: $(document).height()
        }, 500);
      });
    });
  }

  transTime(unix_time) {
    return moment(unix_time).format('HH:mm');
  }

}
