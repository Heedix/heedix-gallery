import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {finalize} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {SiteSettings, SiteSettingsUpdate, SiteStatusService} from '../../services/site-status.service';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgIf, DatePipe, RouterLink, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./gallery-controls.css', './admin.component.css']
})
export class AdminComponent implements OnInit {
  saved: SiteSettings | null = null;
  draft: SiteSettingsUpdate = {loginEnabled: true, maintenanceMode: false, maintenanceMessage: ''};
  loading = true;
  saving = false;
  error = '';
  success = '';

  constructor(public siteStatus: SiteStatusService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  get dirty(): boolean {
    return !!this.saved && (this.draft.loginEnabled !== this.saved.loginEnabled ||
      this.draft.maintenanceMode !== this.saved.maintenanceMode ||
      this.draft.maintenanceMessage.trim() !== this.saved.maintenanceMessage);
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.siteStatus.getAdminSettings().pipe(finalize(() => this.loading = false)).subscribe({
      next: settings => this.setSaved(settings),
      error: error => this.handleError(error)
    });
  }

  save(): void {
    if (!this.dirty || this.saving || !this.draft.maintenanceMessage.trim() || this.draft.maintenanceMessage.length > 500) return;
    this.saving = true;
    this.error = '';
    this.success = '';
    this.siteStatus.saveSettings({...this.draft, maintenanceMessage: this.draft.maintenanceMessage.trim()})
      .pipe(finalize(() => this.saving = false)).subscribe({
        next: settings => {
          this.setSaved(settings);
          this.success = 'Your settings have been saved and are now active.';
        },
        error: error => this.handleError(error)
      });
  }

  reset(): void {
    if (this.saved) this.setSaved(this.saved);
    this.error = '';
    this.success = '';
  }

  logout(): void { this.auth.logout(); }

  private setSaved(settings: SiteSettings): void {
    this.saved = settings;
    this.draft = {loginEnabled: settings.loginEnabled, maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: settings.maintenanceMessage};
    this.siteStatus.accept(settings);
  }

  private handleError(error: {status: number}): void {
    if (error.status === 401 || error.status === 403) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.error = 'Unable to load or save settings. Please try again.';
  }
}
