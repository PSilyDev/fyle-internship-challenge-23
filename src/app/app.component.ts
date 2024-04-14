import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // User Details
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

  
  constructor(
    private apiService: ApiService
    ) {
      this.profileImageUrl = '',
      this.name = '',
      this.bio = '',
      this.location = '',
      this.xUrl = '',
      this.githubUrl = '',

      this.repositories = [],

      this.loading = true,
      this.error = null
    }

    
    searchByUsername(username: string): void {
      this.loading = true;
      // this.loading = false;
      this.error = null;

      this.apiService.getUser(username).subscribe(
        (userdata: any) => {
          this.profileImageUrl = userdata.avatar_url;
          this.name = userdata.name;
          this.bio = userdata.bio;
          this.location = userdata.location;
          this.xUrl = userdata.twitter_username;
          this.githubUrl = userdata.html_url;
        },
        error => {
          console.log('Error fetching user data: ', error);
          this.error = 'Error fetching user data';
          this.loading = false;
        }
      )

      this.apiService.getRepos(username).subscribe(
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
          this.error = 'Error fetching repositories';
          this.loading = false;
        }
      );
    }
    
    ngOnInit() {
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
