import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../charts.component';

@Component({
  selector: 'app-active-period-chart',
  standalone: true,
  imports: [ChartsComponent],
  templateUrl: './active-period-chart.component.html',
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
