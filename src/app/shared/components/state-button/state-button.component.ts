import {Component, OnInit, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-state-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css']
})
export class StateButtonComponent implements OnInit {
  @Input() initialStateTemplate: TemplateRef<any>;
  @Input() workingStateTemplate: TemplateRef<any>;
  @Input() doneStateTemplate: TemplateRef<any>;

  private currentStateTemplate: TemplateRef<any>;
  private action$ = timer(2000);
  private resetButton$ = timer(1000);


  constructor() {}

  ngOnInit(): void {
    this.currentStateTemplate = this.initialStateTemplate;
  }

  triggerAction(value: any) {
    this.currentStateTemplate = this.workingStateTemplate;
    this.action$.subscribe(
        () => {
          this.currentStateTemplate = this.doneStateTemplate;
          this.resetButton$.subscribe(
              () => this.currentStateTemplate = this.initialStateTemplate
          )
        }
    );
  }
}
