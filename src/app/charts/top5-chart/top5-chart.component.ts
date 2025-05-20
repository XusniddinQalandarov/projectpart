import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  HostListener,
} from '@angular/core';

import { EChartsOption, BarSeriesOption } from 'echarts';
import { ChartsComponent } from '../charts.component';
import { Top5Datum } from './top5.interface';
import { EChartLabelFormatterParams } from './top5.interface';

@Component({
  selector: 'app-top5-chart',
  imports: [ChartsComponent],
  templateUrl: './top5-chart.component.html',
})
export class Top5ChartComponent implements OnChanges, OnInit {
  @Input() title = '';
  @Input() data: Top5Datum[] = [];
  @Input() barColor = '#1E40AF';

  option!: EChartsOption;
  private isSmallView = false;
  private readonly breakpoint = 768;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['barColor'] || changes['title']) {
      this.updateChart();
    }
  }

  ngOnInit() {
    this.checkView();
    this.updateChart();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    const oldIsSmallView = this.isSmallView;
    this.checkView();
    if (oldIsSmallView !== this.isSmallView) {
      this.updateChart();
    }
  }

  private checkView() {
    this.isSmallView = window.innerWidth < this.breakpoint;
  }

  private updateChart() {
    if (!this.data || this.data.length === 0) {
      this.option = {
        title: {
          text: this.title,
          left: 'center',
          top: 'center',
          textStyle: { color: '#888', fontSize: 14 },
        },
        xAxis: {},
        yAxis: {},
        series: [],
      };
      return;
    }
    this.option = this.getHorizontalChartOptions(this.data);
  }

  private getHorizontalChartOptions(chartData: Top5Datum[]): EChartsOption {
    const names = chartData.map((d) => d.name);

    let yAxisConfig: EChartsOption['yAxis'] = {
      type: 'category',
      data: names,
      inverse: true,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        show: true,
        fontSize: 11,
        margin: 8,
        width: 100,
        overflow: 'truncate',
      },
    };

    let seriesLabelConfig: BarSeriesOption['label'] = {
      show: true,
      position: 'insideRight',
      formatter: (params: EChartLabelFormatterParams) => {
        const datum = params.data as Top5Datum;
        let valueString = datum.value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        if (datum.isPercent) {
          valueString += datum.isPercent;
        }
        return valueString;
      },
      distance: 5,
      color: '#fff',
      fontSize: 12,
      fontWeight: 'normal',
      offset: undefined,
      rich: undefined,
    };

    let gridConfig: EChartsOption['grid'] = {
      left: '3%',
      right: '15%',
      top: '20%',
      bottom: '5%',
      containLabel: true,
    };

    if (this.isSmallView) {
      if (yAxisConfig && yAxisConfig.axisLabel) {
        (yAxisConfig.axisLabel as { show: boolean }).show = false;
      }

      gridConfig = {
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '20%',

        containLabel: false,
      };

      seriesLabelConfig = {
        show: true,
        position: 'insideLeft',
        offset: [1, 8],

        formatter: (params: EChartLabelFormatterParams) => {
          const datum = params.data as Top5Datum;
          const nameStr = datum.name;
          let valueStr = datum.value
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          if (datum.isPercent) {
            valueStr += datum.isPercent;
          }
          return `{value|${valueStr}}\n{name|${nameStr}}`;
        },
        rich: {
          value: {
            color: '#fff',
            fontSize: 10,
            lineHeight: 14,
            align: 'left',
          },
          name: {
            color: '#4b5563',
            fontSize: 9,
            lineHeight: 12,
            align: 'left',
          },
        },
      };
    }

    return {
      title: {
        text: this.title,
        left: 'center',
        top: this.isSmallView ? '3%' : '5%',
        textStyle: {
          fontSize: this.isSmallView ? 14 : 16,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (paramsArray: any) => {
          if (Array.isArray(paramsArray) && paramsArray.length > 0) {
            const params = paramsArray[0];
            const dataItem = params.data as Top5Datum;
            let valueString = dataItem.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            if (dataItem.isPercent) {
              valueString += dataItem.isPercent;
            }
            return `${params.name}: ${valueString}`;
          }
          return '';
        },
      },
      grid: gridConfig,
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.1],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      yAxis: yAxisConfig,
      series: [
        {
          type: 'bar',
          data: chartData,
          itemStyle: {
            color: this.barColor,
            borderRadius: this.isSmallView ? 3 : 5,
          },
          barGap: this.isSmallView ? '20%' : '30%',
          barCategoryGap: this.isSmallView ? '50%' : '40%',
          label: seriesLabelConfig,
        },
      ],
    };
  }
}
