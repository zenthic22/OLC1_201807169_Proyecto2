import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LeerComponent } from "./leer.component";

describe('LeerComponent', () => {
  let component: LeerComponent;
  let fixture: ComponentFixture<LeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});