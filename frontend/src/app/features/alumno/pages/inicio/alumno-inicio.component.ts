import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth/auth.service';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoDashboardResumen } from '../../types/alumno.types';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-alumno-inicio',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChartModule],
  templateUrl: './alumno-inicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnoInicioComponent {
  private router = inject(Router);
  private alumnoService = inject(AlumnoService);
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  user = this.auth.user;
  loading = signal(true);
  error = signal<string | null>(null);
  resumen = signal<AlumnoDashboardResumen | null>(null);
  chartData: any = null;
  chartOptions: any = null;

  ngOnInit() {
    this.alumnoService
      .getDashboardResumen()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.resumen.set(res.resumen);
          this.initChart();
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el resumen del alumno');
          this.loading.set(false);
        },
      });
  }

  private initChart() {
    const resumen = this.resumen();
    if (!resumen || !isPlatformBrowser(this.platformId)) return;

    const aprobadas = resumen.materias.aprobadas;
    const desaprobadas = resumen.materias.desaprobadas;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    this.chartData = {
      labels: ['Aprobadas', 'Desaprobadas'],
      datasets: [
        {
          data: [aprobadas, desaprobadas],
          backgroundColor: ['#4D7FB3', '#94B2D1'],
          hoverBackgroundColor: ['#4D7FB3', '#94B2D1'],
        },
      ],
    };

    this.chartOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };

    this.cd.markForCheck();
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
