import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  repositories: any[];
  loading: boolean;
  error: string | null;

  searchByUsername(username: string): void {
    this.loading = true;
    this.error = null;

    this.apiService.getRepos(username).subscribe(
      (data: any[]) => {
        this.repositories = data;
        this.loading = false;
      },
      error => {
        this.error = 'Error fetching repositories';
        this.loading = false;
      }
    );
  }

  constructor(
    private apiService: ApiService
  ) {
    this.repositories = [],
    this.loading = true,
    this.error = null
  }



  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe(console.log);
    this.apiService.getRepos('johnpapa').subscribe(console.log);
  }
}
