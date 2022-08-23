import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OptionData} from './interfaces/optionData';
import {timer} from 'rxjs';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent {
  @Input() optionsData: OptionData[] = [];
  @Input() placeholderInput: string;
  @Output() optionSelectedDataEvent = new EventEmitter<any>()
  public inputSearchValue: string = '';
  public isFocus: boolean = false

  constructor() {}

  // If the user choose an item:
  // 1. Label is loaded in the inputSearchValue to show the selected country name
  // 2. The data continue to the parent to allow him to recover the zipcode
  // 3. Close the dropdown
  getOptionDataSelected(optionSelectedData) {
    this.inputSearchValue = optionSelectedData.label;
    this.optionSelectedDataEvent.emit(optionSelectedData);
    this.isFocus = false
  }

  // If Focus, the dropdown is showed
  onFocus() { this.isFocus = true; }
  // If OnFocus, the dropdown is hidden
  onFocusOut() {
    timer(100).subscribe(() => this.isFocus = false)
  }
}
