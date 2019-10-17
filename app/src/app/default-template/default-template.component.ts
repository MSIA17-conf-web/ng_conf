import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {
  title = 'ng-conf';

  constructor() { }

  ngOnInit() {
  }

}
