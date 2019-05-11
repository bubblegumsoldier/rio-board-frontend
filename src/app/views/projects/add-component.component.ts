import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../../models/Project';
import { PasswordShareComponentService } from '../../services/passwordShareComponent.service';

@Component({
  templateUrl: 'add-component.component.html',
  selector:"app-add-component"
})
export class AddComponentComponent implements OnInit {
    @Input() project :Project;
    @Output() onComponentAdded :EventEmitter<void> = new EventEmitter<void>();

    constructor(private passwordShareComponentService :PasswordShareComponentService)
     {

     }

    ngOnInit(): void {
        
    }

    onPasswordSharingAdd()
    {
      this.project.passwordShareComponent = {
        active: true,
        encryptedText: "",
        password: ""
      }
      this.onComponentAdded.emit();
    }

}
