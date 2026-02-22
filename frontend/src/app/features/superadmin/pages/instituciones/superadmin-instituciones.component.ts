import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  Institucion,
  SuperadminInstitucionesService,
} from '../../services/superadmin-instituciones.service';

@Component({
  selector: 'app-superadmin-instituciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './superadmin-instituciones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperadminInstitucionesComponent {
  private service = inject(SuperadminInstitucionesService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  loading = signal(true);
  error = signal<string | null>(null);
  instituciones = signal<Institucion[]>([]);

  creating = signal(false);
  updatingId = signal<number | null>(null);
  editingId = signal<number | null>(null);

  nombreInst = signal('');
  emailInst = signal('');
  direccionInst = signal('');
  adminNombre = signal('');
  adminApellido = signal('');
  adminEmail = signal('');
  adminPass = signal('');

  editNombre = signal('');
  editEmail = signal('');
  editDireccion = signal('');

  ngOnInit() {
    this.loadInstituciones();
  }

  isActiva(i: Institucion): boolean {
    return i.activa === 1;
  }

  create() {
    const nombre = this.nombreInst().trim();
    const email = this.emailInst().trim();
    const direccionRaw = this.direccionInst().trim();
    const aNombre = this.adminNombre().trim();
    const aApellido = this.adminApellido().trim();
    const aEmail = this.adminEmail().trim();
    const aPass = this.adminPass();

    if (
      !nombre ||
      !email ||
      !direccionRaw ||
      !aNombre ||
      !aApellido ||
      !aEmail ||
      !aPass
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Completá institución y admin',
        life: 3000,
      });
      return;
    }

    this.creating.set(true);

    this.service
      .createInstitucion({
        institucion: {
          nombre,
          email,
          direccion: direccionRaw,
        },
        admin: {
          nombre: aNombre,
          apellido: aApellido,
          email: aEmail,
          contrasenia: aPass,
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.creating.set(false);
          this.clearCreateForm();
          this.messageService.add({
            severity: 'success',
            summary: 'Institución creada',
            detail: 'Se creó la institución y su admin',
            life: 3000,
          });
          this.loadInstituciones();
        },
        error: (err) => {
          this.creating.set(false);
          const detail =
            err?.status === 409
              ? 'Nombre o email duplicado de institución/admin'
              : err?.status === 400
                ? 'Datos inválidos'
                : 'No se pudo crear la institución';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail,
            life: 3500,
          });
        },
      });
  }

  startEdit(i: Institucion) {
    this.editingId.set(i.id);
    this.editNombre.set(i.nombre);
    this.editEmail.set(i.email);
    this.editDireccion.set(i.direccion ?? '');
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editNombre.set('');
    this.editEmail.set('');
    this.editDireccion.set('');
  }

  saveEdit(i: Institucion) {
    const nombre = this.editNombre().trim();
    const email = this.editEmail().trim();
    const direccion = this.editDireccion().trim();

    if (!nombre || !email || !direccion) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Nombre, email y dirección son requeridos',
        life: 3000,
      });
      return;
    }

    this.updatingId.set(i.id);

    this.service
      .updateInstitucion(i.id, {
        nombre,
        email,
        direccion,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.updatingId.set(null);
          this.cancelEdit();
          this.messageService.add({
            severity: 'success',
            summary: 'Institución actualizada',
            detail: 'Se guardaron los cambios',
            life: 3000,
          });
          this.loadInstituciones();
        },
        error: (err) => {
          this.updatingId.set(null);
          const detail =
            err?.status === 409
              ? 'Email/nombre duplicado'
              : err?.status === 404
                ? 'Institución no encontrada'
                : 'No se pudo actualizar';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail,
            life: 3500,
          });
        },
      });
  }

  activar(i: Institucion) {
    this.updatingId.set(i.id);
    this.service
      .activarInstitucion(i.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.updatingId.set(null);
          this.messageService.add({
            severity: 'success',
            summary: 'Institución activada',
            detail: i.nombre,
            life: 3000,
          });
          this.loadInstituciones();
        },
        error: () => {
          this.updatingId.set(null);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo activar',
            life: 3500,
          });
        },
      });
  }

  desactivar(i: Institucion) {
    this.updatingId.set(i.id);
    this.service
      .desactivarInstitucion(i.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.updatingId.set(null);
          this.messageService.add({
            severity: 'success',
            summary: 'Institución desactivada',
            detail: i.nombre,
            life: 3000,
          });
          this.loadInstituciones();
        },
        error: () => {
          this.updatingId.set(null);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo desactivar',
            life: 3500,
          });
        },
      });
  }

  private loadInstituciones() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getInstituciones()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.instituciones.set(res.instituciones);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar las instituciones');
          this.loading.set(false);
        },
      });
  }

  private clearCreateForm() {
    this.nombreInst.set('');
    this.emailInst.set('');
    this.direccionInst.set('');
    this.adminNombre.set('');
    this.adminApellido.set('');
    this.adminEmail.set('');
    this.adminPass.set('');
  }
}
