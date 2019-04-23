import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, collection: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('uploaded image');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('upload fail');
            reject(xhr.response);
          }
        }
      };
      let url = `${URL_SERVICE}/upload/${collection}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
