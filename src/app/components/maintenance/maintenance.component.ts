import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SiteStatusService} from '../../services/site-status.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './maintenance.component.html',
  styleUrls: ['../admin/gallery-controls.css', './maintenance.component.css']
})
export class MaintenanceComponent {
  constructor(public siteStatus: SiteStatusService) {}
}
