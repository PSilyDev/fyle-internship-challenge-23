import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty username', () => {
    expect(component.username).toEqual('');
  });

  it('should update username when input value changes', () => {
    const inputElement = compiled.querySelector('input') as HTMLInputElement;
    inputElement.value = 'testuser';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.username).toEqual('testuser');
  });

  it('should emit correct username when search button is clicked', () => {
    spyOn(component.searchClicked, 'emit');
    const inputElement = compiled.querySelector('input') as HTMLInputElement;
    inputElement.value = 'testuser';
    inputElement.dispatchEvent(new Event('input'));
    const buttonElement = compiled.querySelector('button') as HTMLButtonElement;
    buttonElement.click();
    fixture.detectChanges();
    expect(component.searchClicked.emit).toHaveBeenCalledWith('testuser');
  });
});
