import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-alumno-inicio',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './alumno-inicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnoInicioComponent {
  private router = inject(Router);

  goToMisMaterias() {
    this.router.navigate(['/alumno/mis-materias']);
  }
}
