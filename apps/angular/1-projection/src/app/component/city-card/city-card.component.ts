import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (addItem)="addCity()">
      <img src="assets/img/city.png" width="200px" height="200px" />
      <ng-template listItemRef let-city>
        <app-list-item (deleteItem)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, ListItemDirective, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
