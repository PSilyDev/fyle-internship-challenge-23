import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private personalAccessToken = environment.personalAccessToken;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    // return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
    const url = `https://api.github.com/users/${githubUsername}`;
    return this.httpClient.get(url, { headers: this.getHeaders() });
  }

  getRepos(githubUsername: string): Observable<any[]> {
    // return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`)
    const url = `https://api.github.com/users/${githubUsername}/repos`;
    return this.httpClient.get<any[]>(url, { headers: this.getHeaders() });
  }

  getRepoLanguages(languagesUrl: string): Observable<any> {
    // return this.httpClient.get(languagesUrl);
    return this.httpClient.get(languagesUrl, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `token ${this.personalAccessToken}`
    });
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
