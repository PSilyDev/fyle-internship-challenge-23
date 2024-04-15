import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fyle-frontend-challenge';
  
  // User Details
  username: string
  profileImageUrl: string;
  name: string;
  bio: string;
  location: string;
  xUrl: string;
  githubUrl: string;
  

  // Repository Details
  repositories: any[];
  
  // additional
  loading: boolean;
  error: string | null;

  // Pagination properties
  currentPage: number = 1; // Default current page
  pageSize: number = 10; // Default page size

  
  constructor(private apiService: ApiService) {
    this.username = '';
    this.profileImageUrl = '';
    this.name = '';
    this.bio = '';
    this.location = '';
    this.xUrl = '';
    this.githubUrl = '';
    this.repositories = [];
    this.loading = true;
    this.error = null;
  }

  searchByUsername(username: string): void {
    this.username = username;
    this.loading = true;
    this.error = null;

    this.apiService.getUser(username).subscribe(
      (userdata: any) => {
        this.profileImageUrl = userdata.avatar_url;
        this.name = userdata.name;
        this.bio = userdata.bio;
        this.location = userdata.location;
        this.xUrl = userdata.twitter_username;
        this.githubUrl = userdata.html_url;

        this.repositories = []; // Reset repository when a new user is searched
      },
      userError => {
        console.log('Error fetching user data: ', userError);
        if (userError.status === 404) {
          // User not found
          this.error = 'User not found';
        } else {
          this.error = 'Error fetching user data';
        }
        this.loading = false;
      }
    );

    // Fetch repositories with pagination
    this.fetchRepositories(username);
  }

  fetchRepositories(username: string): void {
    this.apiService.getRepos(username, this.currentPage, this.pageSize).subscribe(
      (repoData: any[]) => {
        repoData.forEach(repo => {
          this.apiService.getRepoLanguages(repo.languages_url).subscribe(
            (languagesData: any) => {
              repo.languages = Object.keys(languagesData);
            },
            error => {
              console.error('Error fetching repository languages:', error);
            }
          );
        });
        this.repositories = repoData;
        this.loading = false;
      },
      error => {
        console.error('Error fetching repositories:', error);
        this.error = 'Error fetching repositories';
        this.loading = false;
      }
    );
  }

  // Pagination event handlers

  

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepositories(this.username);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchRepositories(this.username);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.fetchRepositories(this.username);
  }

  // get totalRepositories(): number {
  //   return this.repositories ? this.repositories.length : 0;
  // }

  // get totalPages(): number {
  //   return Math.ceil(this.totalRepositories / this.pageSize);
  // }

  ngOnInit() {
    // Initial data fetching on component initialization
    // this.apiService.getUser('johnpapa').subscribe(console.log);
    // this.apiService.getRepos('johnpapa').subscribe(console.log);
  }


  // User Details
  // profileImageUrl: string = 'https://avatars.githubusercontent.com/u/1202528?v=4';
  // name: string = 'John Papa';
  // bio: string = 'Software Engineer';
  // location: string = 'San Francisco, CA';
  // xUrl: string = 'https://twitter.com/johnpapa';
  // githubUrl: string = 'https://github.com/johnpapa';

  // // Repository Details
  // repositories: any[] = [
  //   { name: 'Repo 1', description: 'Description 1', language: 'TypeScript' },
  //   { name: 'Repo 2', description: 'Description 2', language: 'JavaScript' },
  //   // Add more repositories as needed
  // ];

  // // additional
  // loading: boolean = false;
  // error: string | null = null;

  // constructor() { }

  // ngOnInit() {
  //   // No need to make HTTP requests
  // }

  // searchByUsername(username: string): void {
  //   // No need to set loading state
  //   // No need to make HTTP requests
  // }
}
