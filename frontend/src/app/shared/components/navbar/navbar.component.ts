import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, InputIconModule, MenuModule, ToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  clickBars = output<void>();
  isSidebarOpen = input<boolean>();

  openSidebar() {
    this.clickBars.emit();
  }

  items: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-lock',
      command: () => this.logout(),
    },
  ];

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
