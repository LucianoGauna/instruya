import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCalificacionesTableComponent } from './alumno-calificaciones-table.component';

describe('AlumnoCalificacionesTableComponent', () => {
  let component: AlumnoCalificacionesTableComponent;
  let fixture: ComponentFixture<AlumnoCalificacionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoCalificacionesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoCalificacionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
