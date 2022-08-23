import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-state-button',
  styleUrls: ['./state-button.component.css'],
  templateUrl: './state-button.component.html',
})
export class StateButtonComponent implements OnInit {
  // Get the three default states
  @ViewChild('save') defaultSaveTemplate!: TemplateRef<any>;
  @ViewChild('loading') defaultLoadingTemplate!: TemplateRef<any>;
  @ViewChild('saved') defaultSavedTemplate!: TemplateRef<any>;
  // Three different states of component with html content full customizable.
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
    // Check if the parent sent templates for three states or else load the default templates.
    if (!this.initialStateTemplate) this.initialStateTemplate = this.defaultSaveTemplate;
    if (!this.workingStateTemplate) this.workingStateTemplate = this.defaultLoadingTemplate;
    if (!this.initialStateTemplate) this.doneStateTemplate = this.defaultSavedTemplate;

    this.currentStateTemplate = this.initialStateTemplate;
  }

  triggerAction() {
    this.currentStateTemplate = this.workingStateTemplate;
    this.actionTriggered.emit();
    // Simple timer observable to visualize the change of state
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
