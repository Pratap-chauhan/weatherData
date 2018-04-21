import { Component, ViewChild, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatSort } from '@angular/material';
// import { $ } from 'protractor';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild(MatSort) sort: MatSort;
  citiesData: data[];
  selectedcityData = [];
  cityName: string;
  displayedColumns = ['Id', 'name', 'temp_min', 'temp_max'];
  dataSource = new MatTableDataSource();
  today = new Date().getHours();
  


  ngOnInit() {
    console.log("today",this.today);
    const apikey = {
      appid: 'a8ff6a7518d1df96b2045e108dbf666d'
    }
    this.http.get('http://api.openweathermap.org/data/2.5/find?lat=17.3850&lon=78.4867&cnt=10&appid=a8ff6a7518d1df96b2045e108dbf666d').subscribe(
      (response: Response) => {
        console.log("<><", response.json())
        let data = response.json().list;
        this.citiesData = data.map(item => {
          console.log("<><", item)
          let cities;
          return cities = {
            'Id': item.id,
            'name': item.name,
            'temp_min': item.main.temp_min,
            'temp_max': item.main.temp_max
          }
        }
        )
        console.log("<>", this.citiesData)
        this.dataSource = new MatTableDataSource(this.citiesData);
        this.dataSource.sort = this.sort;
      })
  }


  ngAfterViewInit() {
    console.log("this",this.sort)
    
  }
 

  constructor(private http: Http) {
  }
  





  getCityDetail(rowdata) {
    this.selectedcityData = [];
    this.http.get('http://api.openweathermap.org/data/2.5/forecast?id=' + rowdata.Id + '&appid=a8ff6a7518d1df96b2045e108dbf666d').subscribe((response: Response) => {
      console.log(response.json());
      let responsedata = response.json().list;
      this.cityName = rowdata.name;
      console.log(responsedata.length)
      for (let i = 0; i < responsedata.length; i = i) {
      let currentTime= this.today+':'+'00:00'
       let time= responsedata[i].dt_txt.split(' ');
       console.log("time",time[1],this.today)
       if(time[1]>=currentTime){
        let obj = {
          'From_dateTime': responsedata[i-1].dt_txt,
          'To_dateTime':responsedata[i].dt_txt,
          'temp_max': responsedata[i].main.temp_max,
          'temp_min': responsedata[i].main.temp_min
        }
        this.selectedcityData.push(obj);
        i=i+8;
       }
       else{
         i++;
       }
      
      }
      console.log("><>", this.selectedcityData)
      $("#myModal").modal('show');
    });
  }


}

export interface data {
  Id: number,
  name: string,
  temp_min: number,
  temp_max: number
}
