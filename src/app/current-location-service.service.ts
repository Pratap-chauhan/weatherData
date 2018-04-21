import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'url';
import 'rxjs';


@Injectable()
export class CurrentLocationServiceService {

  constructor(private http: Http) { }
   
lat:any;
lng:any;
apikey = {
  appid: 'a8ff6a7518d1df96b2045e108dbf666d'
};
  getCurrentlocation(cb) {
 
      if (navigator.geolocation) {
        console.log("position");
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position", position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.http.get('http://api.openweathermap.org/data/2.5/find?lat='+this.lat+'&lon='+this.lng+'&cnt=10&appid=a8ff6a7518d1df96b2045e108dbf666d')   
            .subscribe(res => {
              console.log("res",res);
              cb(res)
            })
        })
      }
      else{
        this.http.get('http://api.openweathermap.org/data/2.5/find?lat=17.3850&lon=78.4867&cnt=10&appid=a8ff6a7518d1df96b2045e108dbf666d').subscribe(res => {
          console.log("res",res);
          cb(res)
        })
      }
    
   }
}
