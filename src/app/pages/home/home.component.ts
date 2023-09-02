import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  arrProfiles: UserInfo[] = [];

  constructor(private profilesService: ProfilesService) { }

  ngOnInit(): void {
    // Llamo al servicio para obtener todos los perfiles
    this.profilesService.getAll()
      .then((response) => {
        this.arrProfiles = response.results;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } 
}
