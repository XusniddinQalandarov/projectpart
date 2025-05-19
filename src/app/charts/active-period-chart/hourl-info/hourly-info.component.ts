import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartsComponent } from '../../charts.component';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-hourly-info',
  imports: [ChartsComponent],
  templateUrl: './hourly-info.component.html',
})
export class HourlyInfoComponent implements OnInit {
  option!: EChartsOption;

  ngOnInit() {
    const hours = Array.from(
      { length: 24 },
      (_, i) => i.toString().padStart(2, '0') + ':00'
    );
    const hourlyValues = [
      50, 30, 20, 15, 10, 25, 60, 120, 180, 240, 300, 350, 380, 400, 390, 350,
      320, 280, 220, 170, 130, 100, 80, 60,
    ];
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
      max: 500,
      color: ['#3B82F6'],
      series: [
        {
          type: 'bar',
          data: hourlyValues,
          barWidth: '50%',
        },
      ],
    };
  }
}
