import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard', //nombre de selector
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  //variable que se mostrara en el html, se inicializa nula pero luego se llenara en el ngOnInit
  username: string | null = '';

  // Inyección del servicio AuthService en el constructor, para acceder a métodos de autenticación.
  constructor(private auth: AuthService) {}

  ngOnInit() {
    // En el momento en que el componente se carga, se obtiene el nombre del usuario desde el servicio de autenticación
    this.username = this.auth.getUsername();
  }
  // Cuando el usuario hace clic en "Cerrar sesión", este método llama a logout() del servicio AuthService.
  logout() {
    this.auth.logout();
  }
}
