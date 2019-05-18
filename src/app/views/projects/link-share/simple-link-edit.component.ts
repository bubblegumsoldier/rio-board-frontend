import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';

@Component({
  templateUrl: 'simple-link-edit.component.html',
  selector:"app-simple-link-edit"
})
export class EditSimpleLinkEditComponent implements OnInit {
    @Input() link :SimpleLink;
    @Input() index :number;
    @Output() onEdited :EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeleted :EventEmitter<number> = new EventEmitter<number>();

    oldLink :SimpleLink;
    isEditMode = false;

    ngOnInit(): void {
        
    }

    constructor(private linkShareComponentService :LinkShareComponentService)
    {

    }

    startEdit()
    {
        this.copyLinkTo(this.link, this.oldLink);
        this.isEditMode = true;
    }

    save()
    {
        this.isEditMode = false;
        this.onEdited.emit();
    }

    cancel()
    {
        this.isEditMode = false;
        this.copyLinkTo(this.oldLink, this.link);
    }

    copyLinkTo(fromLink :SimpleLink, toLink :SimpleLink)
    {
        if(toLink === undefined)
        {
            toLink = new SimpleLink();
        }
        toLink.description = fromLink.description;
        toLink.title = fromLink.title;
        toLink.link = fromLink.link;
    }

    delete()
    {
        this.onDeleted.emit(this.index);
    }
}
