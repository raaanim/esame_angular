import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Pizza } from '../../models/pizza_model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-singlepizza',
  standalone: true,
  imports: [RouterLink],
  styleUrls: ['./singlepizza.component.css'],
  template: `
    <div class="card mb-3" class="global-card" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            [src]="singlePizza?.image"
            class="img-fluid rounded-start"
            [alt]="singlePizza?.name"
            style="height: 100%; width: 100%; object-fit: cover; object-position: center;"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ singlePizza?.name }}</h5>
            <p class="card-text">
              {{ singlePizza?.description }}
            </p>
            <p class="card-text">
              <strong class="text-body-secondary"
                >Prezzo: {{ singlePizza?.price }} €</strong
              >
            </p>
            <a class="btn btn-danger" routerLink="/menu" role="button"
              >Torna al menu</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SinglepizzaComponent implements OnInit {
  route = inject(ActivatedRoute);
  singlePizza?: Pizza;
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);
  id = 0;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    if (this.id) this.getSinglePizza();
  }

  getSinglePizza() {
    this.http
      .get<Pizza>(
        `https://my-json-server.typicode.com/zoelounge/menupizza/cards/${this.id}`,
      )
      .subscribe({
        next: (result) => {
          this.singlePizza = result;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.cdr.markForCheck();
        },
      });
  }
}
