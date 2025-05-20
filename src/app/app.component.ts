// src/app/app.component.ts
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class AppComponent {}
