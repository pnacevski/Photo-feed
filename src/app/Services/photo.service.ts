import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IPhoto } from '../models/photo';
import { tap, catchError, map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  private photosObservable: Observable<IPhoto[]> | null;

  getPhotosStart(): Observable<IPhoto[]>{
    if(this.photosObservable == null){
      this.photosObservable = this.http.get<IPhoto[]>(`https://jsonplaceholder.typicode.com/photos`);
        //.pipe(map((photos: IPhoto[]) => photos.slice(0, 10)));
    }

    return this.photosObservable;
  }

  getPhoto(id: number): Observable<IPhoto | undefined>{
    return this.photosObservable
      .pipe(
        map((photos: IPhoto[]) => photos.find(p=>p.id === id))
      );
  }//DOBAR


  deletePhoto(id: Number): boolean{
    this.http.delete<IPhoto[]>(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .subscribe((code) => {
        this.photosObservable = this.photosObservable.pipe(map((photos:IPhoto[]) => photos.filter((photo:IPhoto)=>photo.id != id)));
        console.log(code);
        return true;
      });
      return false;
  }
}

