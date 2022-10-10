import { Component } from '@angular/core';
import { UsersService } from './users.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private user:UsersService){
    let array = this.user.getData();
    //array[0].subscribe(data=>{
    //  console.warn(data);})
  }
  title = 'wea';
}
