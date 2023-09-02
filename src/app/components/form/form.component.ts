import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from 'src/app/services/profiles.service';

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
      first_name: new FormControl("",[]),
      last_name: new FormControl("",[]),
      email: new FormControl("",[]),
      image: new FormControl("",[]),
    }, []);
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
        _id: new FormControl(response.id, []),
        first_name: new FormControl(response.first_name,[]),
        last_name: new FormControl(response.last_name,[]),
        email: new FormControl(response.email,[]),
        image: new FormControl(response.image,[]),
      }, []);
    })
  }

  async getDataForm(): Promise <void> {
    if(this.profileForm.value._id){
      //Significa que tiene una ID, entonces actualizamos
      let response = await this.profileService.updateProfile(this.profileForm.value);
      if (response._id){
        alert("Perfil actualizado correctamente")
        this.router.navigate(['/home'])
      } else {
       alert("Error al actualizar el perfil");
        }
    }else{
      //Significa que insertamos un nuevo perfil
      let response = await this.profileService.insert(this.profileForm.value);
      if (response.id)
      {
        alert("Perfil creado correctamente")
        this.router.navigate(['/home'])
      } else {
        alert("Ha habido un error")
      }
    }
  }
}
