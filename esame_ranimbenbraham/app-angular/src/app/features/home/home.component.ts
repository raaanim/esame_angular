import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  styleUrls: ['./home.component.css'],
  template: `
    <div class="card text-center">
      <div class="card-body">
        <h2 class="card-title">Scopri le nostre pizze</h2>
        <p class="card-text">
          Scegli tra le nostre pizze classiche, speciali e personalizzate. Ogni
          pizza è preparata con ingredienti freschi e di alta qualità, per
          offrirti un'esperienza gustativa indimenticabile.
        </p>
        <a routerLink="/menu" class="btn btn-danger"> Menu</a>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {}
