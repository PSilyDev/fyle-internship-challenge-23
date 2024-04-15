// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     declarations: [AppComponent]
//   }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'fyle-frontend-challenge'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('fyle-frontend-challenge');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('fyle-frontend-challenge app is running!');
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    // Create a mock ApiService
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getRepos', 'getRepoLanguages']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent, SearchBarComponent],
      imports: [FormsModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    // Inject the mock ApiService
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and repositories on search', () => {
    const mockUserData = {
      avatar_url: 'https://example.com/avatar.png',
      name: 'John Doe',
      bio: 'Software Developer',
      location: 'New York',
      twitter_username: '@johndoe',
      html_url: 'https://github.com/johndoe'
    };

    const mockRepoData = [{ name: 'Repo 1', languages_url: 'https://api.github.com/repos/johndoe/repo1/languages' }];

    // Mock the ApiService methods
    apiService.getUser.and.returnValue(of(mockUserData));
    apiService.getRepos.and.returnValue(of(mockRepoData));
    apiService.getRepoLanguages.and.returnValue(of({ JavaScript: 100 }));

    // Trigger search
    component.searchByUsername('johndoe');

    // Check if user data is set correctly
    expect(component.profileImageUrl).toEqual(mockUserData.avatar_url);
    expect(component.name).toEqual(mockUserData.name);
    expect(component.bio).toEqual(mockUserData.bio);
    expect(component.location).toEqual(mockUserData.location);
    expect(component.xUrl).toEqual(mockUserData.twitter_username);
    expect(component.githubUrl).toEqual(mockUserData.html_url);

    // Check if repositories are set correctly
    expect(component.repositories).toEqual(mockRepoData);
  });

  // Add more test cases for pagination event handlers if needed
});
