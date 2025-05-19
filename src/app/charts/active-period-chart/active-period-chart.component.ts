import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartStateService } from './chart-state.service';
import { HourlyInfoComponent } from './hourl-info/hourly-info.component';
import { MonthlyInfoComponent } from './monthly-info/monthly-info.component';
import { WeeklyInfoComponent } from './weekly-info/weekly-info.component';

type Period = 'hourly' | 'daily' | 'monthly';

@Component({
  selector: 'app-active-period-chart',

  imports: [
    CommonModule,
    HourlyInfoComponent,
    MonthlyInfoComponent,
    WeeklyInfoComponent,
  ],
  templateUrl: './active-period-chart.component.html',
})
export class ActivePeriodChartComponent {
  selectedPeriod: WritableSignal<Period>;

  constructor(private chartStateService: ChartStateService) {
    this.selectedPeriod = this.chartStateService.selectedPeriod;
  }

  setPeriod(period: Period): void {
    this.chartStateService.setPeriod(period);
  }
}
