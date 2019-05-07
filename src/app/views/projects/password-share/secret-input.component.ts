import { Component, OnInit, Input } from '@angular/core';

@Component({
  templateUrl: 'secret-input.component.html',
  selector:"app-secret-input"
})
export class SecretInputComponent implements OnInit {
    
    @Input() type :string = "text";
    @Input() addVisibilitySwitch :boolean = false;
    @Input() addCopyButton :boolean = true;
    @Input() value :string;

    switchState :boolean = false;

    ngOnInit(): void {
        
    }

    get currentType() :string 
    {
        if(this.type == 'password')
        {
            return this.switchState ? 'text' : 'password';
        }
        return this.type;
    }

    toggleVisibility()
    {
        this.type = (this.type == 'password') ? 'text' : 'password';
    }

    showCopyAnimation = false;

    copied(e)
    {
        this.showCopyAnimation = true;
        setTimeout(_ => {this.showCopyAnimation = false}, 1000);
    }
}