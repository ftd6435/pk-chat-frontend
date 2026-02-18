import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardHeaderComponent } from './features/dashboard/components/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, DashboardHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PK-Chat';
  currentRoute: string = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    // Set initial route
    this.currentRoute = this.router.url;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isPublicRoute(): boolean {
    // Public pages: landing, login, signup (show landing header)
    const publicRoutes = ['/', '/accueil', '/connexion', '/inscription', '/login', '/signup'];
    return publicRoutes.some(route => this.currentRoute === route || this.currentRoute === '');
  }

  isAuthenticatedRoute(): boolean {
    // Authenticated pages: dashboard, chat (show dashboard header)
    const authenticatedRoutes = ['/tableau-de-bord', '/dashboard', '/discussion', '/chat'];
    return authenticatedRoutes.some(route => this.currentRoute.startsWith(route));
  }

  shouldShowFooter(): boolean {
    // Don't show footer on private chat pages (full-screen layout)
    const noFooterRoutes = ['/discussion', '/chat'];
    const hasNoFooter = noFooterRoutes.some(route => this.currentRoute.startsWith(route));
    
    // Show footer on public and dashboard pages, but not on auth pages or chat
    return (this.isPublicRoute() || this.isAuthenticatedRoute()) && !hasNoFooter;
  }
}
