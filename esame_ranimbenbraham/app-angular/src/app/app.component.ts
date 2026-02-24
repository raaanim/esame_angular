import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  providers: [HttpClient],
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <img src="favicon.ico" alt="logo image navbar" />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a
              class="nav-link active"
              aria-current="page"
              routerLink="/home"
              routerLinkActive="active"
              >Home</a
            >
            <a class="nav-link" routerLink="/menu" routerLinkActive="active"
              >Menu</a
            >
            <a class="nav-link" routerLink="/cart" routerLinkActive="active"
              >Cart</a
            >
          </div>
        </div>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [
    `
    .navbar {
      border-top: 9px solid #d92319 !important;
      background-color: white !important;
    }

    .nav-link{
      color: black !important;
      margin-left: 30px;
    }

      .nav-link.active {
        font-weight: bold;
        color: #d92319 !important;

      }
    `,
  ],
})
export class AppComponent {}



