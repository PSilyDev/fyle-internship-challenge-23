// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RepositoryListComponent } from './repository-list.component';

// describe('RepositoryListComponent', () => {
//   let component: RepositoryListComponent;
//   let fixture: ComponentFixture<RepositoryListComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [RepositoryListComponent]
//     });
//     fixture = TestBed.createComponent(RepositoryListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './repository-list.component';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display repositories correctly', () => {
  //   // Mock data for repositories
  //   const mockRepositories = [
  //     { name: 'Repo 1', description: 'Description 1', languages: ['JavaScript', 'HTML'] },
  //     { name: 'Repo 2', description: 'Description 2', languages: ['TypeScript', 'CSS'] }
  //   ];
  
  //   // Set the mock repositories data
  //   component.repositories = mockRepositories;
  //   component.currentPage = 1;
  //   component.pageSize = 10;
  
  //   // Trigger change detection
  //   fixture.detectChanges();
  
  //   // Check if repositories are displayed correctly
  //   const compiled = fixture.nativeElement;
  //   const repoCards = compiled.querySelectorAll('.repository-card');
  //   expect(repoCards.length).toBe(mockRepositories.length); // Check the number of repository cards
  //   repoCards.forEach((card: HTMLDivElement, index: HTMLDivElement) => {
  //     // Check each repository card content
  //     expect(card.querySelector('.font-bold').textContent).toContain(mockRepositories[index].name);
  //     expect(card.querySelector('.text-gray-700').textContent).toContain(mockRepositories[index].description);
  //     const languages = card.querySelectorAll('.text-gray-700');
  //     expect(languages.length).toBe(mockRepositories[index].languages.length); // Check the number of languages
  //     languages.forEach((language, languageIndex) => {
  //       expect(language.textContent).toContain(mockRepositories[index].languages[languageIndex]); // Check each language
  //     });
  //   });
  // });
  

  // it('should display "No repositories found." when repositories are empty', () => {
  //   // Set repositories to empty array
  //   component.repositories = [];
  //   component.currentPage = 1;
  //   component.pageSize = 10;
  
  //   // Trigger change detection
  //   fixture.detectChanges();
  
  //   // Check if "No repositories found." message is displayed
  //   const compiled = fixture.nativeElement;
  //   const noRepoMessage = compiled.querySelector('div > p');
  //   expect(noRepoMessage).toBeTruthy(); // Check if the element exists
  //   expect(noRepoMessage.textContent).toContain('Error fetching repositories'); // Check the text content
  // });
});