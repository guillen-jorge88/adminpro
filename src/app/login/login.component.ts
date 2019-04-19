import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user';
import { element } from 'protractor';

declare function initPlugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  rememberme: boolean = false;
  auth2: any;
  constructor(
    public router: Router,
    public userService: UserService) { }

  ngOnInit() {
    initPlugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.rememberme = (this.email.length > 0) ? true : false;
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '407867749895-j70b4kn7lrh6om806mqmftn88g17j34q.apps.googleusercontent.com',
        scope: 'profile email',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSigin(document.getElementById('btnGoogle'));
    });
  }

  attachSigin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token)
        .subscribe( () => window.location.href = '/dashboard');
    });
  }

  login(form: NgForm) {
    if(form.invalid){
      return;
    }

    let user = new User(null, null, form.value.email, form.value.password);

    this.userService.login(user, form.value.rememberme)
        .subscribe(resp => this.router.navigate(['/dashboard']));

    console.log(form.valid);
    console.log(form.value);
    // this.router.navigate(['/dashboard']);
  }

}
