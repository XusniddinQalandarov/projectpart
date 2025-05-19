import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../../charts.component';

@Component({
  selector: 'app-monthly-info',
  imports: [ChartsComponent],
  templateUrl: './monthly-info.component.html',
})
export class MonthlyInfoComponent implements OnInit {
  option!: EChartsOption;

  ngOnInit() {
    const fourWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const monthlyValues = [439, 410, 345, 470];
    this.option = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: { type: 'category', data: fourWeeks, boundaryGap: true },
      yAxis: { type: 'value' },
      max: 500,
      color: ['#3B82F6'],
      series: [
        {
          type: 'bar',
          data: monthlyValues,
          barWidth: '50%',
        },
      ],
    };
  }
}
