import { Component, DoCheck, IterableDiffers, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  addNewPhoto: boolean = false;

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
      console.log("in getPhotos photofeed allphotos: ");
      console.log(this.allPhotos);
      console.log("in getPhotos photofeed photos: ");
      console.log(this.photos);
    });
  }
  onScroll():void{
    if(this.page > this.allPhotos.length/10){
      return;
    }else{
      this.photos.push(...this.allPhotos.slice(this.photos.length,++this.page*10));
      console.log(this.photos);
    }
  }
  loadAll():void{
    this.photos.push(...this.allPhotos.slice(this.photos.length,this.allPhotos.length));
  }
  addPhoto(){
    this.addNewPhoto = !this.addNewPhoto;
  }
  onSubmit(data){
    console.log("NewFOTO: "+data.title+" "+data.url+" "+data.thumbnailUrl);
    var newPhotoId:number = Number(this.allPhotos[this.allPhotos.length-1].id) + 1;
    console.log(newPhotoId);
    if(data.title != "" || data.url != "" || data.thumbnailUrl != ""){
      var tmp: IPhoto = {
        albumId: 1,
        id: newPhotoId,
        title: data.title,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl
      }
      this.photoService.addPhoto(tmp);
      console.log(tmp);
    }
  }
}
