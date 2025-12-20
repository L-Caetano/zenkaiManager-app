import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarTorneioPage } from './criar-torneio.page';

describe('CriarTorneioPage', () => {
  let component: CriarTorneioPage;
  let fixture: ComponentFixture<CriarTorneioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTorneioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
