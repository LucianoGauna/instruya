import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import {
  SidebarComponent,
  SidebarMenuItem,
} from '../../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-superadmin-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './superadmin-layout.component.html',
  styleUrl: './superadmin-layout.component.css',
})
export class SuperadminLayoutComponent {
  sidebarOpen = signal(true);

  menuItems: SidebarMenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/superadmin/dashboard' },
    {
      label: 'Instituciones',
      icon: 'pi pi-building',
      route: '/superadmin/instituciones',
    },
    {
      label: 'Administradores',
      icon: 'pi pi-users',
      route: '/superadmin/admins',
    },
  ];

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }
}
