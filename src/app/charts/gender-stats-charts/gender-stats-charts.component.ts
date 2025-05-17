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
      { value: maleValue, name: 'Эркаклар' },
      { value: femaleValue, name: 'Аёллар' },
    ];

    this.option = {
      color: ['#3B82F6', '#EC4899'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        top: 'right',
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
              orient: 'vertical',
              top: 'bottom',
              left: 'center',
              right: 'auto',
              padding: [10, 0, 0, 0],
              itemGap: 8,
            },
            series: [
              {
                center: ['50%', '40%'],
              },
            ],
            graphic: [
              {
                id: 'total',
                style: {
                  fontSize: 18,
                },
              },
              {
                id: 'label',
                style: {
                  fontSize: 6,
                },
              },
            ],
          },
        },
      ],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['60%', '70%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'center',
            formatter: function () {
              return '{total|' + totalValue + '}\n{label|Умумий сони}';
            },
            rich: {
              total: {
                color: '#333',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 30,
              },
              label: {
                color: '#666',
                fontSize: 12,
                lineHeight: 20,
              },
            },
            borderRadius: 8,
            padding: [5, 10],
          },
          emphasis: {
            label: {
              show: true,
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
          id: 'total',
          left: '50%',
          top: '45%',
          z: 10,
          style: {
            text: totalValue.toString(),
            align: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            width: 100,
            height: 30,
            overflow: 'none',
            borderRadius: 4,
          },
        },
        {
          type: 'text',
          id: 'label',
          left: '50%',
          top: '55%',
          z: 10,
          style: {
            text: 'Умумий сони',
            align: 'center',
            fontSize: 12,
            width: 100,
            height: 20,
            overflow: 'none',
            borderRadius: 4,
          },
        },
      ],
    };
  }
}
