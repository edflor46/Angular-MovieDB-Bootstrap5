import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img',
})
export class ImgPipe implements PipeTransform {
  transform(img: string): string {
    if (img) {
      return `https://image.tmdb.org/t/p/original${img}`;
    } else {
      return './assets/img/no-image.jpg';
    }
  }
}