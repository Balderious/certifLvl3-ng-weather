import {Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {click} from 'blue-harvest';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements AfterViewInit {
  @ViewChild('option') optionElement!: ElementRef;
  @Input() optionData!: any;
  @Input() searchedText!: string
  @Output() optionSelectedEvent= new EventEmitter<any>();

  ngAfterViewInit(): void {
    fromEvent(this.optionElement.nativeElement, 'click').subscribe(
        res => this.optionSelected()
    );
  }

  optionSelected() {
    this.optionSelectedEvent.emit(this.optionData);
  }
}
