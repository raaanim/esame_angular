import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { PizzasComponent } from '../../shared/card/pizzas.component';
import { NgFor, NgIf } from '@angular/common';
import { Pizza } from '../../models/pizza_model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PizzasComponent, NgFor, NgIf],
  template: `
    <div class="container mt-4">
      <div class="row">
        <ng-container
          *ngFor="let pizza of pizzaObjects; trackBy: trackByPizzaId"
        >
          <div *ngIf="!hiddenPizzas().includes(pizza.id)" class="col-md-4 mb-4">
            <app-pizzas
              [id]="pizza.id"
              [name]="pizza.name"
              [price]="pizza.price"
              [image]="pizza.image"
              [linkId]="pizza.id"
              (removeCard)="onRemoveCard(pizza.id)"
            ></app-pizzas>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);
  pizzaObjects: Pizza[] = [];
  http = inject(HttpClient);
  hiddenPizzas = signal<number[]>([]);

  ngOnInit() {
    this.gettAllPizzas();
  }

  gettAllPizzas() {
    this.http
      .get<
        Pizza[]
      >('https://my-json-server.typicode.com/zoelounge/menupizza/cards')
      .subscribe({
        next: (result) => {
          console.log('Pizze:', result);
          this.pizzaObjects = result;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Errore:', err);
          this.cdr.markForCheck();
        },
      });
  }

  onRemoveCard(pizzaId: number) {
    this.hiddenPizzas.update((ids) => [...ids, pizzaId]);
  }

  trackByPizzaId(index: number, pizza: Pizza): number {
    return pizza.id;
  }
}
