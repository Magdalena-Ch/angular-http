import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay } from 'rxjs/operators';
export interface Beer {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-beer-list',
  template: `
    <ul>
      <li [routerLink]="[beer.id]" *ngFor="let beer of beers">
        {{ beer.id }}
        {{ beer.name }}
      </li>
    </ul>
    <button [disabled]="buttonDisabled" (click)="fetchMoreBeers()">
      More beers!
    </button>
  `,
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  beers: Beer[];
  paggination = 1;
  buttonDisabled = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Beer[]>(`https://api.punkapi.com/v2/beers`, {
        params: new HttpParams()
          .set('page', `${this.paggination}`)
          .set('per_page', '10')
      })
      .subscribe({
        next: result => {
          this.beers = result;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  fetchMoreBeers() {
    this.buttonDisabled = true;
    this.paggination++;
    console.log(this.paggination);
    this.http
      .get<Partial<Beer[]>>(`https://api.punkapi.com/v2/beers`, {
        params: new HttpParams()
          .set('page', `${this.paggination}`)
          .set('per_page', '10')
      })
      .pipe(delay(1000))
      .subscribe({
        next: moreResult => {
          this.beers.push(...moreResult);
          this.buttonDisabled = false;
        }
      });
  }
}
