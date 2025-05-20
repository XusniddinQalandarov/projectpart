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
import { Top5Datum, EChartLabelFormatterParams } from './top5.interface';

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

  ngOnInit(): void {
    this.checkView();
    this.updateChart();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const oldIsSmallView = this.isSmallView;
    this.checkView();
    if (oldIsSmallView !== this.isSmallView) {
      this.updateChart();
    }
  }

  private checkView(): void {
    this.isSmallView = window.innerWidth < this.breakpoint;
  }

  private updateChart(): void {
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
    const names = chartData.map((d: Top5Datum) => d.name);

    const yAxisConfig: EChartsOption['yAxis'] = {
      type: 'category',
      data: names,
      inverse: true,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        show: true,
        fontSize: 11,
        margin: 10,
        width: 100,
        overflow: 'none',
      },
    };

    const seriesLabelConfig: BarSeriesOption['label'] = {
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
    };

    const gridConfig: EChartsOption['grid'] = {
      left: '5%',
      right: '15%',
      top: '20%',
      bottom: '5%',
      containLabel: true,
    };

    if (this.isSmallView) {
      const yAxisSmall: EChartsOption['yAxis'] = {
        type: 'category',
        data: names,
        position: 'left',
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      };
      const xAxisSmall: EChartsOption['xAxis'] = {
        type: 'value',
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
      };
      const gridSmall: EChartsOption['grid'] = {
        left: '5%',
        top: '15%',
        bottom: '10%',
        containLabel: true,
      };

      const nameSeries: BarSeriesOption = {
        type: 'bar',
        data: chartData.map(() => 0),
        silent: true,
        itemStyle: { color: 'transparent' },
        barGap: '-100%',
        barCategoryGap: '200%',
        label: {
          show: true,
          position: [0, -15],
          align: 'left',
          formatter: '{name|{b}}',
          rich: {
            name: {
              overflow: 'break',
            } as any,
          },
        },
      };

      const valueSeries: BarSeriesOption = {
        type: 'bar',
        data: chartData,
        itemStyle: { color: this.barColor, borderRadius: 3 },
        barGap: '-100%',
        barWidth: '22',
        barCategoryGap: '100%',
        label: {
          show: true,
          position: 'insideRight',
          formatter: (params: EChartLabelFormatterParams) => {
            const d = params.data as Top5Datum;
            let v = d.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            if (d.isPercent) {
              v += '%';
            }
            return v;
          },
          color: '#fff',
          fontSize: 12,
          align: 'right',
          distance: 5,
        },
      };

      return {
        title: {
          text: this.title,
          left: 'center',
          top: '3%',
          textStyle: { fontSize: '14' },
        },
        grid: gridSmall,
        xAxis: xAxisSmall,
        yAxis: yAxisSmall,
        series: [nameSeries, valueSeries],
      };
    }

    return {
      title: {
        text: this.title,
        left: 'center',
        top: '5%',
        textStyle: { fontSize: 16 },
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
          barWidth: '50%',
          itemStyle: {
            color: this.barColor,
            borderRadius: 5,
          },
          barGap: '30%',
          barCategoryGap: '40%',
          label: seriesLabelConfig,
        } as BarSeriesOption,
      ],
    };
  }
}
