import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn-save',
  templateUrl: './btn-save.component.pug',
  styleUrls: ['./btn-save.component.scss']
})
export class BtnSaveComponent implements OnInit {
  @Input() disabled = false;
  
  constructor() { }

  ngOnInit() {
  }

}
