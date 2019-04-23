import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: any, collection: string = 'users'): any {
    let url = `${URL_SERVICE}/img`;
    if (!img) {
      return url += `/${collection}/xxx`;
    }
    if (img.indexOf('https') >= 0) {
      return url = img;
    }
    switch (collection) {
      case 'users' || 'doctors' || 'hospitals':
      url += `/${collection}/${img}`;
      break;
      default:
      url += `/${collection}/xxx`;
      break;
    }
    return url;
  }
}
