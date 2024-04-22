import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add auth headers ', () => {
    const url = '/mockendpoint';
    const token = btoa('user:userPass');

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Authorization')).toEqual(`Basic ${token}`);
  });
});
