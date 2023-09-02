import { Component, Input } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user-info.interface';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() miProfile!: UserInfo | any;

}
