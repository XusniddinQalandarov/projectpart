import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal,
} from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './charts.component.html',
})
export class ChartsComponent implements OnChanges {
  @Input() options?: EChartsOption;

  opts = signal<EChartsOption>({});

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.options) {
      this.opts.set(this.options);
    }
  }
}
