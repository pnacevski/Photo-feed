import { ResourceLoader } from '@angular/compiler';
import { Component, DoCheck, IterableDiffers, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IPhoto } from '../models/photo';
import { PhotoService } from '../Services/photo.service';

@Component({
  selector: 'app-photo-feed',
  templateUrl: './photo-feed.component.html',
  styleUrls: ['./photo-feed.component.css']
})
export class PhotoFeedComponent implements OnInit, DoCheck{
  title: string = 'Photo List';
  sub! : Subscription;
  errorMessage: string = '';
  photos: IPhoto[] = [];
  allPhotos: IPhoto[] = [];
  throttle = 0;
  distance = 2;
  page: number = 1;
  

  constructor(private photoService: PhotoService, differs: IterableDiffers) { }
  ngDoCheck(): void {
    const change = this.allPhotos
  }
  ngOnInit(): void {
      this.getPhotos();
  }
  getPhotos(){
    this.photoService.getPhotosStart().subscribe((photos:IPhoto[]) =>{
      this.allPhotos = photos;
      this.photos = this.allPhotos.slice(0,10);
    })
    console.log("in get photos");
    console.log(this.allPhotos);
    console.log(this.photos);
  }
  onScroll():void{
    if(this.page == 500){
      return;
    }else{
      this.photos.push(...this.allPhotos.slice(this.photos.length,++this.page*10));
    }
  }
}
