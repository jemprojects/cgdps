import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogAddABComponent } from "./dialog-add-ab.component";

describe("DialogAddABComponent", () => {
  let component: DialogAddABComponent;
  let fixture: ComponentFixture<DialogAddABComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddABComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
