import { LinkShareComponent } from './LinkShareComponent';
import { ProgressComponent } from './ProgressComponent';

export class Project
{
    id :string = "";
    name :string = "";
    image :string = "";
    publicAccess :number = 0;
    passwordShareComponent :any;
    linkShareComponent :LinkShareComponent;
    progressComponent :ProgressComponent;
    securityToken :string;
}
