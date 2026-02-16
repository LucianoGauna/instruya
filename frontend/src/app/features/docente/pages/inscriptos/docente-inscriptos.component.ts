import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { DocenteService, Inscripto } from '../../services/docente.service';

@Component({
  standalone: true,
  selector: 'app-docente-inscriptos',
  imports: [CommonModule, ButtonModule],
  templateUrl: './docente-inscriptos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocenteInscriptosComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(DocenteService);
  private destroyRef = inject(DestroyRef);

  materiaId = signal<number | null>(null);

  loading = signal(true);
  error = signal<string | null>(null);
  inscriptos = signal<Inscripto[]>([]);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('materiaId');
    const id = Number(idParam);

    if (!Number.isFinite(id)) {
      this.error.set('Materia inválida');
      this.loading.set(false);
      return;
    }

    this.materiaId.set(id);
    this.load();
  }

  goBack() {
    this.router.navigate(['/docente/mis-materias']);
  }

  private load() {
    const id = this.materiaId();
    if (!id) return;

    this.loading.set(true);
    this.error.set(null);

    this.service
      .getInscriptosByMateria(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.inscriptos.set(res.inscriptos);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los inscriptos');
          this.loading.set(false);
        },
      });
  }
}
