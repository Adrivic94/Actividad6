import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor() {
    this.profileForm = new FormGroup ({
      first_name: new FormControl("",[]),
      last_name: new FormControl("",[]),
      email: new FormControl("",[]),
      image: new FormControl("",[]),
      _id: new FormControl("",[]),
      id: new FormControl("",[]),
      username: new FormControl("", []),
      password: new FormControl("",[])
    }, []);
  }

  async getDataForm(): Promise <void> {
    let response = await this.profileService.insert(this.profileForm.value);
    if (response.id)
    {
      alert("Perfil creado correctamente")
      this.router.navigate(['/home'])
    } else {
      console.log(response)
      alert("Ha habido un error")
    }
  }
}
