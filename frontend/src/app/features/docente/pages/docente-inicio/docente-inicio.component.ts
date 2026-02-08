import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-docente-inicio',
  imports: [ButtonModule],
  templateUrl: './docente-inicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocenteInicioComponent {
  private router = inject(Router);

  goToMisMaterias() {
    this.router.navigate(['/docente/mis-materias']);
  }
}
