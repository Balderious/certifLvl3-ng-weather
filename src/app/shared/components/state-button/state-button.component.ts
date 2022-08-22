import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
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
  // 3 different states of component with html content customizable.
  @Input() initialStateTemplate: TemplateRef<any>;
  @Input() workingStateTemplate: TemplateRef<any>;
  @Input() doneStateTemplate: TemplateRef<any>;
  // Notify the parent the button has been clicked.
  @Output() actionTriggered = new EventEmitter<string>();

  private currentStateTemplate: TemplateRef<any>;
  private actionTimer$ = timer(500);
  private resetButtonTimer$ = timer(500);


  constructor() {}

  ngOnInit(): void {
    this.currentStateTemplate = this.initialStateTemplate;
  }

  triggerAction() {
    this.currentStateTemplate = this.workingStateTemplate;
    this.actionTriggered.emit();

    this.actionTimer$.subscribe(
        () => {
          this.currentStateTemplate = this.doneStateTemplate;
          // Reset the button state.
          this.resetButtonTimer$.subscribe(
              () => this.currentStateTemplate = this.initialStateTemplate
          )
        }
    );
  }
}
