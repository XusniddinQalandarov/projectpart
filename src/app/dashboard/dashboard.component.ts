import { Component } from '@angular/core';
import { GenderStatsChartComponent } from '../charts/gender-stats-charts/gender-stats-charts.component';
import { AgeStatsChartComponent } from '../charts/age-stats-chart/age-stats-chart.component';
import { ActivePeriodChartComponent } from '../charts/active-period-chart/active-period-chart.component';
import { Top5Datum } from '../charts/top5-chart/top5.interface';
import { Top5ChartComponent } from '../charts/top5-chart/top5-chart.component';
import { StatCardComponent } from '../charts/stat-card/stat-card.component';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GenderStatsChartComponent,
    AgeStatsChartComponent,
    ActivePeriodChartComponent,
    Top5ChartComponent,
    StatCardComponent,
    DecimalPipe,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  popularityData: Top5Datum[] = [
    { name: 'INGLIZ TILI', value: 12356 },
    { name: 'ELEKTRON TIJORAT', value: 9568 },
    { name: 'WEB DESIGN', value: 7851 },
    { name: "SMM - Social Media Marketing video-o'quv kursi", value: 3546 },
    { name: "IJTIMOIY MEDIA MARKETING o'quv qo'llanma", value: 3546 },
  ];

  successData: Top5Datum[] = [
    { name: 'INGLIZ TILI', value: 96.6, isPercent: ' %' },
    { name: 'ELEKTRON TIJORAT', value: 90.7, isPercent: ' %' },
    { name: 'WEB DESIGN', value: 85.1, isPercent: ' %' },
    {
      name: "SMM - Social Media Marketing video-o'quv kursi",
      value: 64.2,
      isPercent: ' %',
    },
    {
      name: "IJTIMOIY MEDIA MARKETING o'quv qo'llanma",
      value: 56.3,
      isPercent: ' %',
    },
  ];

  totalUsers: number = 1234567;
  totalCourses: number = 8;
  avgTime: string = '12 : 05 : 46';
  issuedCertificates: number = 1234567;
  organizationCount: number = 3598;
  averageResult: string = '82,6 %';
}
