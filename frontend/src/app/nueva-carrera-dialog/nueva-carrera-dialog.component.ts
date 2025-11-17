import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-carrera-dialog',
  standalone: true,
  templateUrl: './nueva-carrera-dialog.component.html',
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule]
})
export class CrearCarreraDialogComponent {
  visible = false;

  nombre = '';
  codigo = '';
  duracion = '';

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  crearCarrera() {
    console.log('Carrera creada:', {
      nombre: this.nombre,
      codigo: this.codigo,
      duracion: this.duracion
    });
    this.closeDialog();
  }
}
