import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';

import { UserService } from '../services/service.index';
import { User } from '../models/user';
import { Router } from '@angular/router';

declare function initPlugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    public userService: UserService,
    public router: Router) { }

  ngOnInit() {
    initPlugins();
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
      lastname: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_/*+!¡$%&-])')]),
      repassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_/*+!¡$%&-])')]),
      confirm_terms: new FormControl(false)
    }, {validators: this.equalFields('password', 'repassword')});
    this.registerForm.setValue({
      firstname: 'test',
      lastname: '1',
      email: 'test1@dominio.com',
      password: '123456',
      repassword: '123456',
      confirm_terms: true,
    });
  }

  equalFields(_field1: string, _field2: string) {
    return (group: FormGroup) => {
      let field1 = group.controls[_field1].value;
      let field2 = group.controls[_field2].value;

      if (field1 === field2) {
        return null;
      }
      return {
        equalFields : true
      };
    };
  }

  registerUser() {
    if (this.registerForm.valid) {
      return;
    }
    if (!this.registerForm.value.confirm_terms) {
      swal("Good job!", "You must accept terms and conditions", "warning");
      return;
    }
    
    let user = new User(
      this.registerForm.value.firstname,
      this.registerForm.value.lastname,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    this.userService.createUser(user)
        .subscribe(resp => this.router.navigate(['/login']));
  }

}
