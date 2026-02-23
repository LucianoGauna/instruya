import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth/auth.service';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoDashboardResumen } from '../../types/alumno.types';

@Component({
  selector: 'app-alumno-inicio',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './alumno-inicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnoInicioComponent {
  private router = inject(Router);
  private alumnoService = inject(AlumnoService);
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  user = this.auth.user;
  loading = signal(true);
  error = signal<string | null>(null);
  resumen = signal<AlumnoDashboardResumen | null>(null);

  ngOnInit() {
    this.alumnoService
      .getDashboardResumen()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.resumen.set(res.resumen);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el resumen del alumno');
          this.loading.set(false);
        },
      });
  }

  goToMisMaterias() {
    this.router.navigate(['/alumno/mis-materias']);
  }

  goToCatalogo() {
    this.router.navigate(['/alumno/catalogo']);
  }

  goToMisCalificaciones() {
    this.router.navigate(['/alumno/mis-calificaciones']);
  }
}
