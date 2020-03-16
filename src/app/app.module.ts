import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, BeerListComponent, BeerDetailComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: BeerListComponent },
      {
        path: 'list/:id',
        component: BeerDetailComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
