import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ProfilesService } from 'src/app/services/profiles.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

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

  //Crearemos la función deleteProfile y la mopdifico con Sweet Alert
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
  
  //Creamos la función updateProfile
  async updateProfile(formValue: UserInfo): Promise<void> {
    try {
      let response = await this.profileService.updateProfile(formValue);
      alert("Perfil actualizado correctamente");
      this.oneProfile = response; 
    } catch (error) {
      alert("Ha habido un error al actualizar el perfil");
    }
  }
 }
