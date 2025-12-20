import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunningTorneioPage } from './running-torneio.page';

describe('RunningTorneioPage', () => {
  let component: RunningTorneioPage;
  let fixture: ComponentFixture<RunningTorneioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTorneioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
