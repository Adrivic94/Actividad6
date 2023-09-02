import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})

export class ProfileCardComponent {
  @Input() miProfile!: UserInfo | any;
  activateRoute = inject(ActivatedRoute);
  profileService = inject(ProfilesService);
  router = inject(Router);


  // Crearemos la función deletePost
  oneProfile!: UserInfo | any;

  async deleteProfile(_id: string): Promise<void> {
    alert("¿Estás seguro de querer borrar este perfil?");
    let response = await this.profileService.delete(_id);
    if (response) {
      alert("Perfil borrado correctamente");
      this.router.navigate(['/home']);
    } else {
      alert("Algo ha fallado")
      console.error("No se pudo borrar el perfil.")
    }
  }
}