import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from 'src/app/services/profiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  profileForm: FormGroup
  profileService = inject(ProfilesService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.profileForm = new FormGroup ({
      first_name: new FormControl("",[Validators.required]),
      last_name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.pattern(/.*@.*/)]), //He tenido que simplificar el pattern de email porque sino no coge el de peticiones.online
      image: new FormControl("",[Validators.pattern(/^(https?:\/\/[\w.-]+(\.[\w.-]+)+\S*(\?[A-Za-z0-9_.%=&]*)?)$/)]),
    }, []);
  }

  // Creo un método que me avise si se está actualizando el perfil mirando si encuentra un _id
  updatingUser(): boolean {
    const idControl = this.profileForm.get('_id');
    return idControl ? !!idControl.value : false;
  }
  
  //Creo la función check control para que compruebe si los campos son correctos
  checkControl(formcontrolName: string, validator: string): boolean | undefined {
    return this.profileForm.get(formcontrolName)?.hasError(validator) && this.profileForm.get(formcontrolName)?.touched
  }

  ngOnInit() : void {
    //Capturo la ruta activa para el updateProfile
    this.activatedRoute.params.subscribe(async(params:any) => {
      let _id: string = String(params._id);
      //Hago una petición al servicio para llenar el funcionario con getById y tener todos los datos del post
      let response = await this.profileService.getById(_id);
      //Lleno de nuevo el formulario
      this.profileForm = new FormGroup ({
        //Añado el id para poderse actualizar
        _id: new FormControl(response._id, []),
        first_name: new FormControl(response.first_name,[Validators.required]),
        last_name: new FormControl(response.last_name,[Validators.required]),
        email: new FormControl(response.email,[Validators.required, Validators.pattern(/.*@.*/)]), //He tenido que simplificar el pattern de email porque sino no coge el de peticiones.online
        image: new FormControl(response.image,[Validators.required, Validators.pattern(/^(https?:\/\/[\w.-]+(\.[\w.-]+)+\S*(\?[A-Za-z0-9_.%=&]*)?)$/)]),
      }, []);
    })
  }

  async getDataForm(): Promise<void> {
    if (this.profileForm.valid) {
      if (this.profileForm.value._id) {
        // Significa que tiene una ID, entonces actualizamos
        let response = await this.profileService.updateProfile(this.profileForm.value);
        if (response._id) {
          Swal.fire('Perfil actualizado correctamente', '', 'success').then(() => {
            this.router.navigate(['/home']);
          });
        } else {
          console.log(response);
          Swal.fire('Error al actualizar el perfil', '', 'error');
        }
      } else {
        // Significa que insertamos un nuevo perfil
        let response = await this.profileService.insert(this.profileForm.value);
        if (response.id) {
          Swal.fire('Perfil creado correctamente', '', 'success').then(() => {
            this.router.navigate(['/home']);
          });
        } else {
          Swal.fire('Ha habido un error', '', 'error');
        }
      }
    } else {
      Swal.fire('Por favor, complete el formulario correctamente', '', 'error');
    }
  }
}
