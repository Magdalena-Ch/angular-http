import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../beer-list/beer-list.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-beer-detail',
  template: `
    <div *ngIf="!isLoading">
      {{ beer.description }}
    </div>
  `,
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  isLoading: boolean = false;
  beer: Partial<Beer> | undefined;
  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        const id = paramMap.get('id');
        this.http
          .get<Beer>(`https://api.punkapi.com/v2/beers/${id}`)
          .subscribe({
            next: result => {
              this.beer = {
                description: result[0].description
              };
              this.isLoading = false
              console.table(this.beer)
            }
          });
      }
    });
  }
}
