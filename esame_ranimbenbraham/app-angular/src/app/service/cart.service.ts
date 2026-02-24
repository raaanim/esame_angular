import { computed, Injectable, signal } from '@angular/core';
import { Pizza } from '../models/pizza_model';



export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity, 0),
  );

  addToCart(pizza: Pizza) {
    this.cart.update((items) => {
      const existingIndex = items.findIndex(
        (item) => item.pizza.id === pizza.id,
      );
      if (existingIndex > -1) {
        items[existingIndex].quantity++;
        return [...items];
      }
      return [...items, { pizza, quantity: 1 }];
    });
  }

  removeFromCart(pizzaId: number) {
    this.cart.update((items) =>
      items
        .map((item) =>
          item.pizza.id === pizzaId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  clearItem(pizzaId: number) {
    this.cart.update((items) =>
      items.filter((item) => item.pizza.id !== pizzaId),
    );
  }

  clearCart() {
    this.cart.set([]);
  }
}
