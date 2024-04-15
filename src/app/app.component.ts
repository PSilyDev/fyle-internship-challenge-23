import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

import { tap, startWith } from 'rxjs/operators';

const CACHE_KEY = 'httpRepoCache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  
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
    this.currentPage = 1;
    this.loading = true;
    this.error = null;

    this.apiService.getUser(username).subscribe(
      (userdata: any) => {
        this.profileImageUrl = userdata.avatar_url;
        this.name = userdata.name || username;
        this.bio = userdata.bio;
        this.location = userdata.location;
        this.xUrl = userdata.twitter_username;
        this.githubUrl = userdata.html_url;

        this.repositories = []; // reseting repository when a new user is searched
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
    // Try to load from local storage
    const storedValue = localStorage.getItem(CACHE_KEY);
    if (storedValue) {
      this.repositories = JSON.parse(storedValue);
      this.loading = false;
    }
  
    // Fetch from API
    this.apiService.getRepos(username, this.currentPage, this.pageSize).pipe(
      tap(repos => {
        // Store the new value
        localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
      }),
      startWith(JSON.parse(localStorage.getItem(CACHE_KEY) || '[]'))
    ).subscribe(
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
    const totalRepositories = this.repositories.length;

  // check if there are more repositories to fetch based on the total fetched repositories
  if (totalRepositories % this.pageSize === 0) {
    this.currentPage++;
    this.fetchRepositories(this.username);
  }
  }

  onPageSizeChange(newPageSize: number): void {
    
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.fetchRepositories(this.username);
  }


  ngOnInit() {
    
    // /this.apiService.getUser('johnpapa').subscribe(console.log);
    // this.apiService.getRepos('johnpapa').subscribe(console.log);

  }

}