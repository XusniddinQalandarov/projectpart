import { Injectable, signal } from '@angular/core';

type Period = 'hourly' | 'daily' | 'monthly';

@Injectable({
  providedIn: 'root',
})
export class ChartStateService {
  selectedPeriod = signal<Period>('hourly');

  setPeriod(period: Period): void {
    this.selectedPeriod.set(period);
  }
}
