import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  uploadFile: File;
  imageTemp: string;
  constructor(
    public userSrevice: UserService
  ) {
    this.user = userSrevice.user;
  }

  ngOnInit() {
  }

  saveForm(user: User) {
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this.userSrevice.updateUser(this.user)
        .subscribe(resp => {
          console.log(resp);
        });
  }

  selectFile(file: File) {
    if (!file) {
      this.uploadFile = null;
      return;
    }
    if(file.type.indexOf('image')) {
      swal('Only image', 'the selected file is not an image', 'error');
      this.uploadFile = null;
    }
    this.uploadFile = file;
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTemp = reader.result as string;
  }

  chanceImage() {
    this.userSrevice.chanceImage(this.uploadFile, this.user._id);
  }

}
