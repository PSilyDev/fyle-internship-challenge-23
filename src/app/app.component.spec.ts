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
    // mock api serviec
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getRepos', 'getRepoLanguages']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent, SearchBarComponent],
      imports: [FormsModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    // injecting mock apiservice
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

    // mock apiservice methods
    apiService.getUser.and.returnValue(of(mockUserData));
    apiService.getRepos.and.returnValue(of(mockRepoData));
    apiService.getRepoLanguages.and.returnValue(of({ JavaScript: 100 }));

    // searching
    component.searchByUsername('johndoe');

    // validating
    expect(component.profileImageUrl).toEqual(mockUserData.avatar_url);
    expect(component.name).toEqual(mockUserData.name);
    expect(component.bio).toEqual(mockUserData.bio);
    expect(component.location).toEqual(mockUserData.location);
    expect(component.xUrl).toEqual(mockUserData.twitter_username);
    expect(component.githubUrl).toEqual(mockUserData.html_url);

    // validating repos
    expect(component.repositories).toEqual(mockRepoData);
  });

});
