import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../charts.component';

@Component({
  selector: 'app-age-stats-chart',
  standalone: true,
  imports: [ChartsComponent],
  templateUrl: './age-stats-chart.component.html',
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
