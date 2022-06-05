import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.pug',
  styleUrls: ['./btn-back.component.scss']
})
export class BtnBackComponent implements OnInit {
  constructor(private _location: Location) {}

  ngOnInit() {}
  back() {
    this._location.back();
  }
}
