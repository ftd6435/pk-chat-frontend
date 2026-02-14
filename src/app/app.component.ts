import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PK-Chat';
  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    // Check initial route
    this.checkRoute(this.router.url);
  }

  private checkRoute(url: string): void {
    // Hide header/footer on auth pages
    const authRoutes = ['/inscription', '/connexion', '/signup', '/login', '/mot-de-passe-oublie'];
    this.showHeaderFooter = !authRoutes.some(route => url.startsWith(route));
  }
}
