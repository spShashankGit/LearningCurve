import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private greetUrl = 'api/Home';

  // Resolve HTTP using the constructor
  constructor(private _http: Http) {}

  sayHello(): Observable<any> {
    return this._http.get(this.greetUrl);
  }
}
