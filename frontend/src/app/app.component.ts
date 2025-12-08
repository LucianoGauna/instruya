import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastDemoComponent } from './toast-demo/toast-demo.component';
import { AlumnosTableComponent } from './alumnos-table/alumnos-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'instruya';
}
