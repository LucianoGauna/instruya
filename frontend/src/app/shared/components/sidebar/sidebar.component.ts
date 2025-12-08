import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  open = input<boolean>(false);

  menuItems = signal([
    { label: 'Dashboard', icon: 'pi pi-home', route: '/superadmin/dashboard' },
    { label: 'Instituciones', icon: 'pi pi-building', route: '/superadmin/instituciones' },
    { label: 'Administradores', icon: 'pi pi-users', route: '/superadmin/admins' }
  ]);

  private router = inject(Router);

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
