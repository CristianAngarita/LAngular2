import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  //El componente usa Angular Material (MatCard y MatButton) y el módulo de rutas (RouterModule).
  // Esto permite que en el HTML se usen componentes como <mat-card>, <button mat-button> y directivas de enrutamiento.
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
