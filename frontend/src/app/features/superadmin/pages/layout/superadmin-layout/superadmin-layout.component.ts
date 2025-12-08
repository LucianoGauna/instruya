import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../../../shared/components/navbar/navbar.component";
import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-superadmin-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './superadmin-layout.component.html',
  styleUrl: './superadmin-layout.component.css'
})
export class SuperadminLayoutComponent {
  sidebarOpen = signal(true);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }
}
