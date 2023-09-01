import { Component } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user-info.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  arrProfiles: UserInfo
}
