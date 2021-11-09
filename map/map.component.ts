import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor() { }

  currentMark;
  marks: google.maps.Marker[] = [];

  cars1 = [
    {
      position: new google.maps.LatLng(46.323003, 16.296576),
      type: "moving",

    },
    {
      position: new google.maps.LatLng(46.304492, 16.315083),
      type: "stationary",
    },
    {
      position: new google.maps.LatLng(46.308576, 16.354811),
      type: "moving",
    },
    {
      position: new google.maps.LatLng(46.324589, 16.328749),
      type: "stationary",
    },
  ];


  cars2 = [
    {
      position: new google.maps.LatLng(46.319371, 16.307842),
      type: "moving",

    },
    {
      position: new google.maps.LatLng(46.298577, 16.339228),
      type: "moving",
    },
    {
      position: new google.maps.LatLng(46.300126, 16.291691),
      type: "moving",
    },
    {
      position: new google.maps.LatLng(46.295179, 16.325962),
      type: "stationary",
    },
  ];

  iconBase =
    "http://maps.google.com/mapfiles/kml/pal4/";


  icons = {
    moving: {
      icon: this.iconBase + "icon54.png",
    },
    stationary: {
      icon: this.iconBase + "icon7.png",
    }
  };

  map: google.maps.Map;


  ngOnInit(): void {


    



    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      //mapId: "43b4c381dea15e0f",
      center: { lat: 46.3057, lng: 16.3366 },
      zoom: 13,
    });

    google.maps.event.addListener(this.map, 'click', function() {
      if (this.infowindow) {
        this.infowindow.close();
      }
  });

    const marker1 = new google.maps.Marker({
      position: { lat: 46.287178, lng: 16.321332 },
      map: this.map,
      icon: "http://maps.google.com/mapfiles/kml/pal4/icon39.png",
      title: "Mobilisis"
    });

    const detailWindow1 = new google.maps.InfoWindow({
      content: '<div style="max-width:300px;"> <h5>Mobilisis headquarters</h5> <p>Cars: 4</p> <p>Location: (46.287178, 16.321332)</p> </div>'
    });

    const marker2 = new google.maps.Marker({
      position: { lat: 46.311447, lng: 16.346756 },
      map: this.map,
      icon: "http://maps.google.com/mapfiles/kml/pal4/icon39.png",
      title: "Vindija"
    });

    const detailWindow2 = new google.maps.InfoWindow({
      content: '<div style="max-width:300px;"> <h5>Vindija headquarters</h5> <p>Cars: 4</p> <p>Location: (46.311447, 16.346756)</p> </div>'
    });


    detailWindow1.addListener('closeclick', () => {

      console.log(this.marks);
      this.marks.forEach(element => {
        element.setVisible(false);
      });

      this.marks = [];

    });

    marker1.addListener("click", () => {
      this.marks.forEach(element => {
        element.setVisible(false);
      });
      detailWindow2.close();
      this.marks = [];
      this.showCars("mobilisis");
      detailWindow1.open(this.map, marker1);
    });


    detailWindow2.addListener('closeclick', () => {

      console.log(this.marks);
      this.marks.forEach(element => {
        element.setVisible(false);
      });

      this.marks = [];

    });

    marker2.addListener("click", () => {
      this.marks.forEach(element => {
        element.setVisible(false);
      });
      detailWindow1.close();
      this.marks = [];
      this.showCars("vindija");
      detailWindow2.open(this.map, marker2);
    });



    // Show the lat and lng under the mouse cursor.
    const coordsDiv = document.getElementById("coords");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    this.map.addListener("mousemove", (event) => {
      coordsDiv.textContent =
        "lat: " +
        event.latLng.lat() +
        ", " +
        "lng: " +
        event.latLng.lng();
    });







  }


  showCars(company: string) {

    if (company == "mobilisis") {
      for (let i = 0; i < this.cars1.length; i++) {

        const marker = new google.maps.Marker({
          position: this.cars1[i].position,
          icon: this.icons[this.cars1[i].type].icon,
          map: this.map,
        });

        this.marks.push(marker);
        console.log(this.marks);

        const infowindow = new google.maps.InfoWindow({
          content: '<div style="max-width:300px;"> <h5>Car #' + i + '</h5> <p>Location: ' + this.cars1[i].position + '</p> <p><strong>The car is ' + this.cars1[i].type + '</strong></p> </div>'
        });

        marker.addListener("mouseover", () => {
          infowindow.open(this.map, marker);
        });
      
        marker.addListener("mouseout", () => {
          infowindow.close();
        });

      }
    }


    if (company == "vindija") {
      for (let i = 0; i < this.cars2.length; i++) {

        const marker = new google.maps.Marker({
          position: this.cars2[i].position,
          icon: this.icons[this.cars2[i].type].icon,
          map: this.map,
        });

        this.marks.push(marker);
        console.log(this.marks);

        const infowindow = new google.maps.InfoWindow({
          content: '<div style="max-width:300px;"> <h5>Car #' + i + '</h5> <p>Location: ' + this.cars2[i].position + '</p> <p><strong>The car is ' + this.cars2[i].type + '</strong></p> </div>'
        });

        marker.addListener("mouseover", () => {
          infowindow.open(this.map, marker);
        });
      
        marker.addListener("mouseout", () => {
          infowindow.close();
        });
      }
    }


  }
}
