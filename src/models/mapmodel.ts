


export class MapModel {

  map: google.maps.Map;

    constructor() {
               this.map =  new google.maps.Map(document.getElementById('map')!, {
                center: {
                    lat: 59.3293,
                    lng: 18.0686
                },
                zoom: 3
            })
    }

}

