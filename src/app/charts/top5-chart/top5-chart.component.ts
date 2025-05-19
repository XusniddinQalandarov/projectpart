import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  HostListener,
  OnDestroy,
} from '@angular/core';

import { EChartsOption, BarSeriesOption } from 'echarts';
import { ChartsComponent } from '../charts.component';

export interface Top5Datum {
  name: string;
  value: number;
}

// Interface for ECharts label formatter parameters.
// This interface needs to be compatible with ECharts' internal CallbackDataParams.
interface EChartLabelFormatterParams {
  value: unknown; // ECharts passes a broad type for value.
  data: unknown; // ECharts' data can be OptionDataItem; 'unknown' is compatible.
  name: string; // Category name.
  // Optional: other properties from CallbackDataParams if you need them.
  // color?: string;
  // seriesIndex?: number;
  // dataIndex?: number;
}

@Component({
  selector: 'app-top5-chart',
  standalone: true,
  imports: [ChartsComponent],
  templateUrl: './top5-chart.component.html',
})
export class Top5ChartComponent implements OnChanges, OnInit, OnDestroy {
  @Input() title = '';
  @Input() data: Top5Datum[] = [];
  @Input() barColor = '#1E40AF';

  option!: EChartsOption;
  private isSmallView = false;
  private readonly breakpoint = 768; // md breakpoint

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['barColor'] || changes['title']) {
      this.updateChart();
    }
  }

  ngOnInit() {
    this.checkView();
    this.updateChart();
  }

  ngOnDestroy() {
    // Angular handles HostListener cleanup.
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
        show: true, // Default for large screens
        fontSize: 11,
        margin: 8,
        width: 100,
        overflow: 'truncate',
      },
    };

    let seriesLabelConfig: BarSeriesOption['label'] = {
      show: true, // Default for large screens
      position: 'insideRight',
      formatter: (params: EChartLabelFormatterParams) => {
        const datum = params.data as Top5Datum; // Assert type
        return datum.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      },
      distance: 5,
      color: '#fff',
      fontSize: 12,
      fontWeight: 'normal',
    };

    let gridConfig: EChartsOption['grid'] = {
      left: '3%',
      right: '15%',
      top: '15%',
      bottom: '5%',
      containLabel: true,
    };

    if (this.isSmallView) {
      if (yAxisConfig) {
        if (Array.isArray(yAxisConfig)) {
          const firstAxis = yAxisConfig[0];
          if (firstAxis && firstAxis.axisLabel) {
            firstAxis.axisLabel.show = false;
          }
        } else {
          if (yAxisConfig.axisLabel) {
            yAxisConfig.axisLabel.show = false;
          }
        }
      }

      gridConfig = {
        left: '5%',
        right: '5%',
        top: '15%',
        bottom: '35%',
        containLabel: true,
      };

      seriesLabelConfig = {
        show: true,
        position: 'insideLeft',
        offset: [15, 10],
        formatter: (params: EChartLabelFormatterParams) => {
          const datum = params.data as Top5Datum;
          const nameStr = datum.name;
          const valueStr = datum.value
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          const truncatedName =
            nameStr.length > 18 ? nameStr.substring(0, 15) + '...' : nameStr;
          return `{value|${valueStr}}\n{name|${truncatedName}}`;
        },
        rich: {
          value: {
            color: '#333',
            fontSize: 11,
            fontWeight: 'bold',
            lineHeight: 16,
            align: 'left',
          },
          name: {
            color: '#666',
            fontSize: 10,
            lineHeight: 14,
            align: 'left',
          },
        },
      };
    }

    return {
      title: {
        text: this.title,
        left: 'center',
        top: '5%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (paramsArray: any) => {
          if (Array.isArray(paramsArray) && paramsArray.length > 0) {
            const params = paramsArray[0];
            const dataItem = params.data as Top5Datum;
            return `${params.name}: ${dataItem.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
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
            borderRadius: 5,
          },
          barCategoryGap: '40%',
          label: seriesLabelConfig,
        },
      ],
    };
  }
}
