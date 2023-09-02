import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent {
  //Uso activatedRoute para capturar la ruta variable
  activatedRoute = inject(ActivatedRoute);
  profileService = inject(ProfilesService);
  router = inject(Router);

  oneProfile!: UserInfo | any;

  //Como estoy trabajando con promesas trabajo de forma asíncrona
  ngOnInit(): void {
    //Uso el método subscribe para capturar la parte variable de la ruta
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id = String(params._id);
      //Llenaremos oneProfile llamando al servicio
      this.oneProfile = await this.profileService.getById(_id);
    });
  }

  //Crearemos la función deletePost
  async deleteProfile(_id: string): Promise<void> {
    alert("¿Estás seguro de querer borrar este post?")
    let response = await this.profileService.delete(_id);
    if  (response){
      alert("Perfil borrado correctamente")
      this.router.navigate(['/home'])
    } else {
      
    }
  }

}
