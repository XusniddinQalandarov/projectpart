// src/app/charts/age-stats-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../charts.component';

@Component({
  selector: 'app-age-stats-chart',
  standalone: true,
  imports: [ChartsComponent],
  template: `
    <div class="bg-white rounded-2xl shadow p-6 flex flex-col">
      <div class="flex items-center mb-4">
        <img src="assets/statistics.png" class="w-6 h-6 mr-2" />
        <h4 class="text-lg font-medium">Статистика по возрасту</h4>
      </div>
      <div class="w-full h-64">
        <app-charts [options]="option"></app-charts>
      </div>
    </div>
  `,
})
export class AgeStatsChartComponent implements OnInit {
  option!: EChartsOption;

  ngOnInit() {
    this.option = {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['0-18', '19-30', '31-50', '50+'],
        axisTick: { alignWithLabel: true },
      },
      yAxis: { type: 'value' },
      color: ['#3B82F6'],
      series: [
        {
          type: 'bar',
          barWidth: '40%',
          data: [1800, 3000, 4800, 2200],
        },
      ],
    };
  }
}
