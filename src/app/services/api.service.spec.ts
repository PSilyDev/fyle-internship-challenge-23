import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', () => {
    const username = 'example';
    const userData = { id: 1, login: 'example' };

    service.getUser(username).subscribe(user => {
      expect(user).toEqual(userData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(userData);
  });

  it('should get repositories', () => {
    const username = 'example';
    const page = 1;
    const pageSize = 10;
    const reposData = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];

    service.getRepos(username, page, pageSize).subscribe(repos => {
      expect(repos).toEqual(reposData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(reposData);
  });

  it('should get repository languages', () => {
    const languagesUrl = 'https://api.github.com/repos/example/repo/languages';
    const languagesData = { JavaScript: 100, TypeScript: 50 };

    service.getRepoLanguages(languagesUrl).subscribe(languages => {
      expect(languages).toEqual(languagesData);
    });

    const req = httpMock.expectOne(languagesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(languagesData);
  });
});