import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirm-action-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './confirm-action-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmActionDialogComponent {
  visible = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel  = new EventEmitter<void>();

  open()  { this.visible = true; }
  close() { this.visible = false; }

  onConfirm() { this.confirm.emit(); this.close(); }
  onCancel()  { this.cancel.emit();  this.close(); }
}
