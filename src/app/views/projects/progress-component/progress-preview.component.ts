import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProgressComponent } from '../../../models/ProgressComponent';

@Component({
  templateUrl: 'progress-preview.component.html',
  selector:"app-progress-preview",
  styleUrls: ['./progress-preview.component.sass']
})
export class ProgressPreviewComponent implements OnInit {
  @Input() progressComponent :ProgressComponent;

  ngOnInit()
  {

  }
}
