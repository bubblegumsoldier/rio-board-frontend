import { LinkShareComponent } from './LinkShareComponent';
import { ProgressComponent } from './ProgressComponent';
import { FeedComponent } from './FeedComponent';

export class Project
{
    id :string = "";
    name :string = "";
    image :string = "";
    publicAccess :number = 0;
    passwordShareComponent :any;
    linkShareComponent :LinkShareComponent;
    progressComponent :ProgressComponent;
    feedComponent :FeedComponent;
    securityToken :string;
}
