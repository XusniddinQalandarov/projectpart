// src/app/app.component.ts
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: `
    <main class="min-h-screen bg-gray-50 p-4">
      <app-dashboard></app-dashboard>
    </main>
  `,
})
export class AppComponent {}
