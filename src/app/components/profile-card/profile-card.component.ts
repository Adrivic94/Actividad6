import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ProfilesService } from 'src/app/services/profiles.service';
import Swal from 'sweetalert2';

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

  async deleteProfile(_id: string): Promise<void> {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar',
    });
  
    if (confirmDelete.isConfirmed) {
      let response = await this.profileService.delete(_id);
      if (response) {
        Swal.fire('Borrado', 'El perfil ha sido eliminado.', 'success');
        this.router.navigate(['/home']);
      } else {
        Swal.fire('Error', 'Algo ha fallado', 'error');
        console.error('No se pudo borrar el perfil.');
      }
    }
  }
}
  
  
  
  