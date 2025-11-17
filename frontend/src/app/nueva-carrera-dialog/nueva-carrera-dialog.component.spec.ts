import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCarreraDialogComponent } from './nueva-carrera-dialog.component';

describe('NuevaCarreraDialogComponent', () => {
  let component: NuevaCarreraDialogComponent;
  let fixture: ComponentFixture<NuevaCarreraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCarreraDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCarreraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
