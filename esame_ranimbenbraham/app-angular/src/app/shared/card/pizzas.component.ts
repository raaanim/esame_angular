import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectorRef,
  inject,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../service/cart.service';
import { Pizza } from '../../models/pizza_model';


@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [RouterLink, NgIf],
  styleUrls: ['./pizza.component.css'],
  template: `
    <div class="card h-100 shadow-sm position-relative">
      <a *ngIf="linkId" [routerLink]="['/singlepizza', linkId]" class="d-block">
        <img
          [src]="image!"
          [alt]="name!"
          class="card-img-top"
          style="height: 250px; object-fit: cover;"
        />
      </a>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text fw-bold fs-4 text-success mb-auto">{{ price }} €</p>

        <div class="card-buttons">
          <button
            type="button"
            class="btn btn-danger"
            (click)="decreaseQuantity()"
          >
            -
          </button>
          <p>{{ cartQuantity }}</p>
          <button
            type="button"
            class="btn btn-success"
            (click)="increaseQuantity()"
          >
            +
          </button>
        </div>
        <button
          type="button"
          class="btn btn-outline-danger mt-2"
          (click)="clearQuantity()"
        >
          Elimina
        </button>
        <a routerLink="/cart" class="btn btn-outline-success mt-2"
          >Vai al carrello</a
        >
      </div>
    </div>
  `,
  styles: [],
})
export class PizzasComponent implements OnChanges {
  @Input() id?: number;
  @Input() name?: string;
  @Input() price?: number;
  @Input() image?: string;
  @Input() linkId?: number;

  cartQuantity = 0;
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && this.id) {
      const item = this.cartService
        .cart()
        .find((c: CartItem) => c.pizza.id === this.id);
      this.cartQuantity = item?.quantity || 0;
      this.cdr.markForCheck();
    }
  }

  increaseQuantity() {
    if (this.id && this.name && this.price && this.image) {
      const pizza: Pizza = {
        id: this.id,
        name: this.name,
        price: this.price,
        image: this.image,
        description: '',
        quantity: 0,
      };
      this.cartService.addToCart(pizza);
      this.cartQuantity++;
      this.cdr.markForCheck();
    }
  }

  decreaseQuantity() {
    if (this.id && this.cartQuantity > 0) {
      this.cartService.removeFromCart(this.id);
      this.cartQuantity = this.cartQuantity > 0 ? this.cartQuantity - 1 : 0;
      this.cdr.markForCheck();
    }
  }

  @Output() removeCard = new EventEmitter<number>();

  clearQuantity() {
    if (this.id && this.cartQuantity > 0) {
      this.cartService.clearItem(this.id);
      this.cartQuantity = 0;
      this.removeCard.emit(this.id);
      this.cdr.markForCheck();
    }
  }
}
