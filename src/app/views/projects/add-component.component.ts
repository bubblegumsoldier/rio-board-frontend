import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/Project';

@Component({
  templateUrl: 'add-component.component.html',
  selector:"app-add-component"
})
export class AddComponentComponent implements OnInit {
    @Input() project :Project;

    ngOnInit(): void {
        
    }

}
