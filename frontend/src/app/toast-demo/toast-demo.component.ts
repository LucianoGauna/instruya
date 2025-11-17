import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  templateUrl: './toast-demo.component.html',
  imports: [CommonModule, ToastModule, ButtonModule, RippleModule],
  providers: [MessageService]
})
export class ToastDemoComponent {
  constructor(private messageService: MessageService) {}

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Operación exitosa',
      detail: 'Esta notificación significa que algo salió bien.',
      life: 3000
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema con la acción.',
      life: 3000
    });
  }
}
