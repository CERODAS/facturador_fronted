import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/service/roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { rolesModel } from 'src/app/model/roles-model';


@Component({
  selector: 'app-roles',

})

export class RolesComponent implements OnInit {
  listaRoles: rolesModel[] = [];
  formRoles: FormGroup = new FormGroup({});

  constructor(private rolesService: RolesService) { }



    
    ngOnInit(): void {
      this.list();
      this.formRoles = new FormGroup({
        id_rol: new FormControl(''),
        nombre_rol: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
        ])
       });
    }
  
  
  

  list() {
    this.rolesService.getRoles().subscribe(resp => {
      if (resp) {
        this.listaRoles = resp;
      }
    });

  }
}