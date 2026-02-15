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
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  AdminMateriasService,
  Docente,
  MateriaDeCarrera,
} from '../../services/admin-materias.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-admin-carrera-materias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './admin-carrera-materias.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarreraMateriasComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(AdminMateriasService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  carreraId = signal<number | null>(null);

  loading = signal(true);
  error = signal<string | null>(null);

  materias = signal<MateriaDeCarrera[]>([]);
  docentes = signal<Docente[]>([]);

  nuevoNombre = signal('');
  docenteSeleccionadoId = signal<number | null>(null);
  creating = signal(false);
  updatingId = signal<number | null>(null);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!Number.isFinite(id)) {
      this.error.set('ID de carrera inválido');
      this.loading.set(false);
      return;
    }

    this.carreraId.set(id);
    this.loadAll();
  }

  goBack() {
    this.router.navigate(['/admin/carreras']);
  }

  isActiva(m: MateriaDeCarrera): boolean {
    return m.activa === 1;
  }

  createMateria() {
    const carreraId = this.carreraId();
    const nombre = this.nuevoNombre().trim();
    const docenteId = this.docenteSeleccionadoId();

    if (!carreraId) return;

    if (!nombre) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Falta nombre',
        detail: 'Escribí el nombre de la materia',
        life: 3000,
      });
      return;
    }

    if (!docenteId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Falta docente',
        detail: 'Seleccioná un docente',
        life: 3000,
      });
      return;
    }

    this.creating.set(true);

    this.service
      .createMateria(carreraId, nombre, docenteId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.nuevoNombre.set('');
          this.docenteSeleccionadoId.set(null);
          this.creating.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Materia creada',
            detail: 'Se creó correctamente',
            life: 3000,
          });

          this.loadMaterias();
        },
        error: (err) => {
          this.creating.set(false);

          const msg =
            err?.status === 409
              ? 'Ya existe una materia con ese nombre en la carrera'
              : err?.status === 404
              ? 'Carrera o docente no encontrado'
              : err?.status === 400
              ? 'Datos inválidos'
              : 'No se pudo crear la materia';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: msg,
            life: 3500,
          });
        },
      });
  }

  desactivar(m: MateriaDeCarrera) {
    this.updatingId.set(m.materia_id);

    this.service
      .desactivarMateria(m.materia_id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Materia desactivada',
            detail: `"${m.materia_nombre}" quedó inactiva`,
            life: 3000,
          });
          this.updatingId.set(null);
          this.loadMaterias();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo desactivar la materia',
            life: 3500,
          });
          this.updatingId.set(null);
        },
      });
  }

  activar(m: MateriaDeCarrera) {
    this.updatingId.set(m.materia_id);

    this.service
      .activarMateria(m.materia_id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Materia activada',
            detail: `"${m.materia_nombre}" volvió a estar activa`,
            life: 3000,
          });
          this.updatingId.set(null);
          this.loadMaterias();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo activar la materia',
            life: 3500,
          });
          this.updatingId.set(null);
        },
      });
  }

  private loadAll() {
    this.loading.set(true);
    this.error.set(null);

    // Obtengo docentes
    this.service
      .getDocentes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const opciones: Docente[] = res.docentes.map((d) => ({
            ...d,
            label: `${d.apellido}, ${d.nombre} (${d.email})`,
          }));
          this.docentes.set(opciones);

          // Obtengo materias
          this.loadMaterias();
        },
        error: () => {
          this.error.set('No se pudieron cargar los docentes');
          this.loading.set(false);
        },
      });
  }

  private loadMaterias() {
    const carreraId = this.carreraId();
    if (!carreraId) return;

    this.service
      .getMateriasByCarrera(carreraId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.materias.set(res.materias);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar las materias');
          this.loading.set(false);
        },
      });
  }
}
