import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public uploadFile: UploadFileService) {
      this.loadStorage();
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isLoggedOn() {
    return (this.token.length > 5) ? true : false;
  }

  saveInStorage(res: any) {
    localStorage.setItem('id', res.id);
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.user = res.user;
    this.token = res.token;
  }

  loginGoogle(token: string) {
    let url = `${URL_SERVICE}/login/google`;
    return this.http.post(url, { token })
        .pipe(
          map((res: any) => {
            this.saveInStorage(res);
            return true;
          })
        );
  }

  login(user: User, rememberme: boolean = false) {
    let url = `${URL_SERVICE}/login`;
    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, user).pipe(
      map((res: any) => {
        this.saveInStorage(res);
        // localStorage.setItem('id', res.id);
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('id', JSON.stringify(res.user));
        return true;
      })
    );
  }
  logout() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  createUser(user: User) {
    let url = `${URL_SERVICE}/user`;
    return this.http.post( url, user)
      .pipe(
        map( (resp: any) => {
          swal('created user', resp.user.email, 'success');
          return resp.user;
        }));
  }

  updateUser(user: User) {
    let url = `${URL_SERVICE}/user/${user._id}?token=${this.token}`;
    return this.http.put(url, user)
      .pipe(
        map((resp: any) => {
          let name = `${resp.user.firstname} ${resp.user.lastname}`;
          this.saveInStorage({
            id: resp.user._id,
            token: this.token,
            user: resp.user
          });
          swal('updated user', name, 'success');
          return resp;
        })
      );
  }

  chanceImage(file: File, id: string) {
    this.uploadFile.uploadFile(file, 'users', id)
        .then((resp: any) => {
          console.log(resp.userSaved);
          let name = `${resp.userSaved.firstname} ${resp.userSaved.lastname}`;
          this.user.avatar_img = resp.userSaved.avatar_img;
          this.saveInStorage({
            id: resp.userSaved._id,
            token: this.token,
            user: resp.userSaved
          });
          swal('updated Avatar Image', name, 'success');
        })
        .catch((err: any) =>{
          console.log(err);
        });
  }
}
