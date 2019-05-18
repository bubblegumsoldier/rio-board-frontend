import { Component, OnInit, Input } from '@angular/core';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';

@Component({
  templateUrl: 'simple-link.component.html',
  selector:"app-simple-link"
})
export class SimpleLinkComponent implements OnInit {
    @Input() link :SimpleLink;

    ngOnInit(): void {
        
    }

    constructor(private linkShareComponentService :LinkShareComponentService)
    {

    }
    
    getClassification() :string
    {
        return this.linkShareComponentService.getClassification(this.link);
    }
}
