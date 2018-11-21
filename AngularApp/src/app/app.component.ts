import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  constructor(private http: HttpClient){
    this.http.get("http://localhost:3000/getSomeData?Nome=Mauro", { withCredentials: true })
      .subscribe(data => { this.dado = data['Nome'] });

  }
  
  dado: String;
  nextClick = 'Tamires';

  changeName()
  {
    document.getElementById("changeButton").setAttribute('disabled', 'true');
    this.http.get("http://localhost:3000/getSomeData?Nome=" + this.nextClick, { withCredentials: true })
      .subscribe(data => { 
        this.dado = data['Nome'];
        if (this.nextClick == 'Tamires')
        {
          this.nextClick = 'Mauro';
        } 
        else 
        {
          this.nextClick = 'Tamires';
        }        
        document.getElementById("changeButton").removeAttribute('disabled');
      });
  }
}
