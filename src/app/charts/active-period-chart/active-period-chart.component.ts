import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../charts.component';

@Component({
  selector: 'app-active-period-chart',
  standalone: true,
  imports: [ChartsComponent],
  template: `
    <div class="bg-white rounded-2xl shadow p-6 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium">Active period</h4>
        <div class="space-x-2">
          <button class="px-3 py-1 rounded-full bg-gray-200 text-sm">
            Month
          </button>
          <button class="px-3 py-1 rounded-full bg-gray-200 text-sm">
            Days
          </button>
          <button
            class="px-3 py-1 rounded-full bg-indigo-500 text-white text-sm"
          >
            Hour
          </button>
        </div>
      </div>
      <div class="w-full h-48">
        <app-charts [options]="option"></app-charts>
      </div>
    </div>
  `,
})
export class ActivePeriodChartComponent implements OnInit {
  option!: EChartsOption;

  ngOnInit() {
    const hours = Array.from(
      { length: 6 },
      (_, i) => i.toString().padStart(2, '0') + ':00'
    );
    const values = [200, 150, 180, 120, 100, 250];
    this.option = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: { type: 'category', data: hours, boundaryGap: true },
      yAxis: { type: 'value' },
      max: 300,
      color: ['#3B82F6'],
      series: [
        {
          type: 'bar',
          data: values,
          barWidth: '50%',
        },
      ],
    };
  }
}
