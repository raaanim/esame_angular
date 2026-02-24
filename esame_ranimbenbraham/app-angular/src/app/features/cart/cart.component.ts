import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';


interface CartItem {
  pizza: any;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>Carrello ({{ cartService.cart().length }} items)</h2>

      <div
        *ngFor="let item of cartService.cart(); trackBy: trackById"
        class="card mb-3"
      >
        <div class="card-body">
          <h5>{{ item.pizza.name }}</h5>
          <p>
            {{ item.pizza.price | number: '1.2-2' }} € x {{ item.quantity }}
          </p>
          <strong>{{ getItemTotal(item) | number: '1.2-2' }} €</strong>
        </div>
      </div>
      <div *ngIf="cartService.cart().length > 0" class="card mt-3">
        <div class="card-body text-success">
          <h4>Totale: {{ getTotal() | number: '1.2-2' }} €</h4>
          <button class="btn btn-success btn-lg" (click)="onCheckout()">
            Paga
          </button>
        </div>
      </div>

      <div
        *ngIf="showThanksModal"
        class="modal fade show d-block"
        style="background-color: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1050;"
      >

        <div
          *ngIf="showThanksModal"
          class="modal fade show d-block"
          style="background-color: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1050;"
        >

          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title">Grazie per l'acquisto!</h5>

              </div>
              <div class="modal-body text-center">
                <i
                  class="bi bi-check-circle-fill text-success"
                  style="font-size: 4rem;"
                ></i>
                <h4>Ordine completato con successo!</h4>
                <p class="lead">Importo totale pagato:</p>
                <h2 class="text-success">
                  {{ totalPaid | number: '1.2-2' }} €
                </h2>
              </div>
              <div class="modal-footer justify-content-center">
                <button
                  class="btn btn-success btn-lg px-5"
                  (click)="goHome()"
                >
                  <i class="bi bi-house me-2"></i>Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-header {
        background-color: #317430 !important;
        text-align: center;
      }
      #thanksModalLabel {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-left: 540px;
      }
    `,
  ],
})
export class CartComponent {
  cartService = inject(CartService);
  router = inject(Router);
  totalPaid = 0;
  showThanksModal = false;

  getItemTotal(item: CartItem): number {
    return item.pizza.price * item.quantity;
  }

  getTotal(): number {
    return this.cartService
      .cart()
      .reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  onCheckout() {
    this.totalPaid = this.getTotal();
    this.cartService.clearCart();
    this.showThanksModal = true;
  }

  goHome() {
    this.showThanksModal = false;
    this.router.navigate(['/home']);
  }

  trackById(index: number, item: CartItem): number {
    return item.pizza.id;
  }
}


