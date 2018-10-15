import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  greetings = '';

  constructor(private _appService: AppService) {}

  ngOnInit(): void {
    this._appService.sayHello().subscribe(result => {
      this.greetings = result.text() + result.statusText;
    });
  }
}
