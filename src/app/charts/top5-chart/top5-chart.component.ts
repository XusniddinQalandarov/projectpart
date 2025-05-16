import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../charts.component';

export interface Top5Datum {
  name: string;
  value: number;
}

@Component({
  selector: 'app-top5-chart',
  standalone: true,
  imports: [ChartsComponent],
  templateUrl: './top5-chart.component.html',
})
export class Top5ChartComponent implements OnChanges {
  @Input() title = '';
  @Input() data: Top5Datum[] = [];
  @Input() barColor = '#1E40AF';

  option!: EChartsOption;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      const names = this.data.map((d) => d.name);
      const values = this.data.map((d) => d.value);
      this.option = {
        tooltip: { trigger: 'item', formatter: '{b}: {c}' },
        grid: {
          left: '3%',
          right: '15%',
          top: '5%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.1],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category',
          data: names,
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            fontSize: 11,
            margin: 8,
            width: 100,
            overflow: 'truncate',
          },
        },
        series: [
          {
            type: 'bar',
            data: values,
            itemStyle: {
              color: this.barColor,
              borderWidth: 0,
              borderType: 'solid',
              borderRadius: 5,
            },
            barCategoryGap: '60%',
            label: {
              show: true,
              position: 'insideRight',
              formatter: function (params) {
                return params
                  .value!.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
              },
              distance: 5,
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
            },
          },
        ],
      };
    }
  }
}
