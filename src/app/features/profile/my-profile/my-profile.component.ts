import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard/components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from '../../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { ProfileHeaderComponent } from '../components/profile-header/profile-header.component';
import { ProfileStatsComponent } from '../components/profile-stats/profile-stats.component';
import { ProfileTabsComponent } from '../components/profile-tabs/profile-tabs.component';
import { ProfileAboutComponent } from '../components/profile-about/profile-about.component';
import { ActivityFeedComponent } from '../components/activity-feed/activity-feed.component';
import { QuickActionsCardComponent } from '../components/quick-actions-card/quick-actions-card.component';
import { AccountSecurityCardComponent } from '../components/account-security-card/account-security-card.component';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { UserProfile, ProfileStats } from '../../../shared/models/user-profile.model';
import { Activity } from '../../../shared/models/activity.model';
import { AccountSecurity } from '../../../shared/models/account-security.model';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    ProfileHeaderComponent,
    ProfileStatsComponent,
    ProfileTabsComponent,
    ProfileAboutComponent,
    ActivityFeedComponent,
    QuickActionsCardComponent,
    AccountSecurityCardComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyProfileComponent implements OnInit {
  profile!: UserProfile;
  stats!: ProfileStats;
  activities: Activity[] = [];
  accountSecurity!: AccountSecurity;
  
  activeTab: string = 'overview';

  constructor(
    private profileService: ProfileDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadStats();
    this.loadActivities();
    this.loadAccountSecurity();
  }

  loadProfile(): void {
    this.profileService.getCurrentUserProfile()
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  loadStats(): void {
    this.profileService.getProfileStats()
      .subscribe(stats => {
        this.stats = stats;
      });
  }

  loadActivities(): void {
    this.profileService.getRecentActivities()
      .subscribe(activities => {
        this.activities = activities;
      });
  }

  loadAccountSecurity(): void {
    this.profileService.getAccountSecurity()
      .subscribe(security => {
        this.accountSecurity = security;
      });
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
    // Future: Load different content based on tab
  }

  editProfile(): void {
    this.router.navigate(['/configuration-profil']);
  }

  openSettings(): void {
    // Future: Navigate to settings page
    console.log('Opening settings...');
  }

  handleQuickAction(actionId: string): void {
    switch (actionId) {
      case 'view-public':
        console.log('View public profile');
        break;
      case 'edit-profile':
        this.editProfile();
        break;
      case 'account-settings':
        this.openSettings();
        break;
      case 'privacy':
        console.log('Opening privacy settings');
        break;
    }
  }
}
