import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-source-card',
  templateUrl: './source-card.component.html',
  styleUrls: ['./source-card.component.css']
})
export class SourceCardComponent implements OnInit {

  factcheckingReports: any;
  byFactchecker: Array<any>;
  chartData: any;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  _sourceAssessment: any;
  @Input()
  set sourceAssessment(sourceAssessments) {
    sourceAssessments.assessments.forEach((element, index) => {
      if (element.origin_id === 'factchecking_report') {
        this.factcheckingReports = element;
        this.byFactchecker = [];
        Object.values(element.original).forEach((value: any)  => {
          if (true) {
            console.log(value)
            this.byFactchecker.push(value);
          }
        });
        sourceAssessments.assessments.splice(index, 1);

        this.chartData = this.byFactchecker.reduce((prev: Array<any>, curr) => {
          prev.push({
            name: curr.origin_id || 'overall',
            series: [{
              name: 'positive',
              value: (curr.positive || []).length,
            }, {
              name: 'negative',

              value: (curr.negative || []).length
            }, {
              name: 'neutral',
              value: (curr.neutral || []).length,

            }, {
              name: 'unknown',
              value: (curr.unknown || []).length

            }
          ]
          });
          return prev;
        }, [])
        console.log(this.chartData)
      }
    });
    this._sourceAssessment = sourceAssessments;
  }
  get sourceAssessment() {
    return this._sourceAssessment;
  }

  constructor() { }

  ngOnInit() {
  }

}
