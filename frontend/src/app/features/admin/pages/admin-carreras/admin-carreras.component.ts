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

import { AdminCarrerasService, Carrera } from '../../services/admin-carreras.service';

@Component({
  selector: 'app-admin-carreras',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './admin-carreras.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarrerasComponent {
  private service = inject(AdminCarrerasService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  loading = signal(true);
  error = signal<string | null>(null);
  carreras = signal<Carrera[]>([]);

  ngOnInit() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getCarreras()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.carreras.set(res.carreras);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar las carreras');
          this.loading.set(false);
        },
      });
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }

  isActiva(c: Carrera): boolean {
    return c.activa === 1;
  }
}
