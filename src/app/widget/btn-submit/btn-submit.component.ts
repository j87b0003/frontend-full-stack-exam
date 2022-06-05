import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn-submit',
  templateUrl: './btn-submit.component.pug',
  styleUrls: ['./btn-submit.component.scss']
})
export class BtnSubmitComponent implements OnInit {
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
