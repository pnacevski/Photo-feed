import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhotoFeedComponent } from './photo-feed/photo-feed.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PhotoFeedComponent,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'photos', component: PhotoFeedComponent},
      {path: 'photos/:id', component: PhotoDetailsComponent},
      {path: '', redirectTo: 'photos', pathMatch: 'full'},
      {path: '**', redirectTo: 'photos', pathMatch: 'full'}
    ]),
    MatCardModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
