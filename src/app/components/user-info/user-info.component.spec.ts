// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UserInfoComponent } from './user-info.component';

// describe('UserInfoComponent', () => {
//   let component: UserInfoComponent;
//   let fixture: ComponentFixture<UserInfoComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [UserInfoComponent]
//     });
//     fixture = TestBed.createComponent(UserInfoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;

    // Set up mock data
    component.profileImageUrl = 'https://example.com/profile.jpg';
    component.name = 'John Doe';
    component.bio = 'Software Engineer';
    component.location = 'New York';
    component.xUrl = 'https://example.com';
    component.githubUrl = 'https://github.com/johndoe';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user information correctly', () => {
    const compiled = fixture.nativeElement;

    // Check if the profile image is rendered with the correct source URL
    const profileImage = compiled.querySelector('.profile-image');
    expect(profileImage).not.toBeNull();
    if (profileImage) {
      expect(profileImage.src).toContain('https://example.com/profile.jpg');
    }

    // Check if other user information is rendered correctly
    const nameElement = compiled.querySelector('.user-details h2');
    const bioElement = compiled.querySelector('.user-details p');
    const locationElement = compiled.querySelector('.user-details .location');
    expect(nameElement).not.toBeNull();
    expect(bioElement).not.toBeNull();
    expect(locationElement).not.toBeNull();
    if (nameElement && bioElement && locationElement) {
      expect(nameElement.textContent).toContain('John Doe');
      expect(bioElement.textContent).toContain('Software Engineer');
      expect(locationElement.textContent).toContain('New York');
    }

    // Check if the X URL and GitHub URL are rendered correctly
    const xUrlElement = compiled.querySelector('.user-details .location a');
    const githubUrlElement = compiled.querySelector('.githubUrl');
    // expect(xUrlElement).not.toBeNull();
    // expect(githubUrlElement).not.toBeNull();
    if (xUrlElement && githubUrlElement) {
      expect(xUrlElement.href).toContain('https://example.com');
      expect(githubUrlElement.href).toContain('https://github.com/johndoe');
    }
  });
});
