import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private personalAccessToken = environment.personalAccessToken;

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
    // const url = `https://api.github.com/users/${githubUsername}`;
    // return this.httpClient.get(url, { headers: this.getHeaders() });
  }

  getRepos(githubUsername: string, page: number, pageSize: number): Observable<any[]> {
    // const url = `https://api.github.com/users/${githubUsername}/repos`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', pageSize.toString());

    // return this.httpClient.get<any[]>(url, { headers: this.getHeaders(), params });
    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`,{ params})
  }

  getRepoLanguages(languagesUrl: string): Observable<any> {
    // return this.httpClient.get(languagesUrl, { headers: this.getHeaders() });
    return this.httpClient.get(languagesUrl);
  }

  // private getHeaders(): HttpHeaders {
    // return new HttpHeaders({
      // 'Authorization': `token ${this.personalAccessToken}`
    // });
  // }
}
