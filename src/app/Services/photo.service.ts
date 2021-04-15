import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPhoto } from '../models/photo';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http: HttpClient, private router:Router) {}

  private photosObservable: Observable<IPhoto[]> = this.http.get<IPhoto[]>(`https://jsonplaceholder.typicode.com/photos`);
  nextPhotoID: number = 5000;
  getPhotosStart(): Observable<IPhoto[]>{
    return this.photosObservable;
  }

  getPhoto(id: number): Observable<IPhoto | undefined>{
    return this.photosObservable
    .pipe(
        map((photos: IPhoto[]) => photos.find(p=>p.id === id))
      );
  }


  deletePhoto(id: Number): void{
    this.http.delete<IPhoto[]>(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .subscribe((ph) => {
        this.photosObservable = this.photosObservable.pipe(map((photos:IPhoto[]) => photos.filter((photo:IPhoto)=>photo.id != id)));
        this.router.navigate(['/photos']);
      });
  }

  addPhoto(photo:IPhoto): void{
    this.http.post<IPhoto>('https://jsonplaceholder.typicode.com/photos',photo).subscribe(ph => {
      // mora da se dovava elementot sto go dobivame od Photo-details zatoa sto ako go dodademe elementot koj ni go vrakja post requestot id sekogas ke bide 5001 
      // i pri dodavanje na povekje od 1 element routerot sekogas ne prakja kon prviot bidejki imaat ist id
      this.photosObservable = this.photosObservable.pipe(tap(photos => photos.push(photo)));
      console.log(this.photosObservable.subscribe(photos => console.log(photos)));
      this.router.navigate(['photos',Number(photo.id)]);
    });
  }

  editPhoto(photo: IPhoto):void{
      this.http.put<IPhoto>(`https://jsonplaceholder.typicode.com/photos/${photo.id}`,photo).subscribe(ph => {
        this.photosObservable = this.photosObservable.pipe(map((photos:IPhoto[]) => photos.map((phot:IPhoto) => phot.id === ph.id ? phot = ph : phot = phot)))
      });
  }
}

