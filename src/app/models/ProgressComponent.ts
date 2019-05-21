import {AbstractDashboardComponent} from './AbstractDashboardComponent'
import { ProgressItem } from './ProgressItem';

export class ProgressComponent extends AbstractDashboardComponent
{
  progress :number = 0;
  progressItems :ProgressItem[];
}
