import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../../charts.component';

@Component({
  selector: 'app-weekly-info',
  imports: [ChartsComponent],
  templateUrl: './weekly-info.component.html',
})
export class WeeklyInfoComponent implements OnInit {
  option!: EChartsOption;

  ngOnInit() {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const dailyValues = [2500, 2700, 2300, 2800, 3000, 1500, 1200];
    this.option = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: { type: 'category', data: daysOfWeek, boundaryGap: true },
      yAxis: { type: 'value' },
      max: 500,
      color: ['#3B82F6'],
      series: [
        {
          type: 'bar',
          data: dailyValues,
          barWidth: '50%',
        },
      ],
    };
  }
}
