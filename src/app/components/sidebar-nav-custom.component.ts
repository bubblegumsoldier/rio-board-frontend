import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'app-sidebar-nav-custom',
    templateUrl: './sidebar-nav-custom.component.html',
    styleUrls: ['./sidebar-nav-custom.component.scss']
})


export class SidebarNavCustomComponent {
    @Input() navItems: Array<any>;
    @HostBinding('class.sidebar-nav') true;
    @HostBinding('attr.role') role;

    constructor() {
    }

    isDivider(navItem) {
        return !!navItem.divider
    }

    isTitle(navItem) {
        return !!navItem.title
    }

    isHasChild(navItem) {
        return navItem.hasOwnProperty('children') && navItem.children.length > 0;
    }

}