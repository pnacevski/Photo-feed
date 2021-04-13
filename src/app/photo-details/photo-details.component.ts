import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '../models/photo';
import { PhotoService } from '../Services/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  pageTitle: string = 'Photo Details';
  photo: IPhoto | undefined;
  constructor(private route: ActivatedRoute, 
      private router: Router,
      private photoService: PhotoService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      const param = +id;
      this.getPhoto(param);
    }
  }

  getPhoto(id: number): void{
    this.photoService.getPhoto(id).subscribe({
      next: photo => this.photo = photo
    })
  }

  onBack(): void{
    this.router.navigate(['/photos']);
  }
  previous(): void{
    var id = Number(this.photo.id)-1;
    
    this.router.navigate(['/photos/2']);
  }
  next(): void{
    this.router.navigate(['/photos',Number(this.photo.id)+1]);
  }
  delete(): void{
    //this.photoFeedComp.delete(Number(this.photo.id)); /// DATABINDING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if(confirm("Are you sure?")){
      var returnVal = this.photoService.deletePhoto(Number(this.photo.id));
    }
    if(returnVal){

    this.router.navigate(['/photos']);
    }
    
  }
  edit(): void{

  }
  hasPrevious(): boolean{
    if(this.photo.id === 1){
      return false;
    }else{
      return true;
    }
  }
  hasNext(){
    if(this.photo.id === 5000){
      return false;
    }else{
      return true;
    }
  }

}
