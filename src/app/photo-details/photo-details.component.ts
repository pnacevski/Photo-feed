import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  toEdit: boolean = false;
  constructor(private route: ActivatedRoute, 
      private router: Router,
      private photoService: PhotoService,
      private modalService: NgbModal) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      const param = +id;
      this.getPhoto(param);
    }
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //console.log(result);
      if(result === "yes") this.delete();
    });
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
    var returnVal = this.photoService.deletePhoto(Number(this.photo.id)); 
  }
  showEdit():void{
    this.toEdit = !this.toEdit;
  }
  edit(data): void{
    if((data.title === "" || data.title === this.photo.title) && 
        (data.url === "" || data.url === this.photo.url) &&
        (data.thumbnailUrl === "" || data.thumbnailUrl === this.photo.thumbnailUrl)){
      alert("Nothing to change");
      return;
    }
    if(data.title !== "")
      this.photo.title = data.title;
    if(data.url !== "")
      this.photo.url = data.url;
    if(data.thumbnailUrl !== "")
      this.photo.thumbnailUrl = data.thumbnailUrl;
    this.photoService.editPhoto(this.photo);

    this.toEdit = false;
    
    data.title = "";
    data.url = "";
    data.thumbnailUrl = "";
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
