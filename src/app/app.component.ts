import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArgosComponent } from './argos/argos.component';

@Component({
  selector: 'app-root',
  imports: [ArgosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'projectpart';
}
