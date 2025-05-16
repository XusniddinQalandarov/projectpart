import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartsComponent } from '../charts.component';
@Component({
  selector: 'app-gender-stats-chart',
  imports: [ChartsComponent],
  templateUrl: './gender-stats-charts.component.html',
})
export class GenderStatsChartComponent implements OnInit {
  option!: EChartsOption;
  @Input() options!: EChartsOption;

  ngOnInit() {
    const maleValue = 1000;
    const femaleValue = 1200;
    const totalValue = maleValue + femaleValue;
    const chartData = [
      { value: maleValue, name: 'Male' },
      { value: femaleValue, name: 'Female' },
    ];

    this.option = {
      color: ['#3B82F6', '#EC4899'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        top: 'middle',
        right: '10%',
        itemGap: 10,
        formatter: (name: string) => {
          const item = chartData.find(
            (i: { name: string; value: number }) => i.name === name
          );
          if (!item) return name;
          const percent = Math.round((item.value / totalValue) * 100);
          return `${name}: ${item.value} (${percent}%)`;
        },
      },
      media: [
        {
          query: {
            maxWidth: 767,
          },
          option: {
            legend: {
              orient: 'horizontal',
              top: 'bottom',
              left: 'center',
              right: 'auto',
              padding: [10, 0, 0, 0],
            },
            series: [
              {
                center: ['50%', '50%'],
              },
            ],
          },
        },
      ],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: true,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          data: chartData,
        },
      ],
      graphic: [
        {
          type: 'text',
          left: '46%',
          top: '45%',
          style: {
            text: totalValue.toString(),
            align: 'center',
            fill: '#333',
            fontSize: 24,
            fontWeight: 'bold',
          },
        },
        {
          type: 'text',
          left: '45%',
          top: '55%',
          style: {
            text: 'Умумий сони',
            align: 'center',
            fill: '#666',
            fontSize: 12,
          },
        },
      ],
    };
  }
}
