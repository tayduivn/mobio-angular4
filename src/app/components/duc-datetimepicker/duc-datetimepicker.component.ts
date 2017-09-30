import 'eonasdan-bootstrap-datetimepicker';
import {
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Component
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import * as moment from 'moment';
import * as $ from 'jquery';
import {
  SetOptions,
  Datetimepicker,
  HideEventObject,
  ChangeEventObject,
  ErrorEventObject,
  UpdateEventObject
} from 'eonasdan-bootstrap-datetimepicker';

export const SQ_DATETIMEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DucDatetimepickerComponent),
  multi: true,
}
export const SQ_DATETIMEPICKER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DucDatetimepickerComponent),
  multi: true,
};

@Component({
  selector: 'duc-datetimepicker',
  templateUrl: './duc-datetimepicker.html',
  providers: [SQ_DATETIMEPICKER_VALUE_ACCESSOR, SQ_DATETIMEPICKER_VALIDATOR]
})
export class DucDatetimepickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  public el;
  @Input() options: any;
  @Input() mode: string = 'input-group'; // mode: 'input-group' | 'input' | 'inline';
  @Input() style: string;
  @Input() inputClass: string;
  @Input() groupClass: string;
  @Input() groupIconClass: string;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() dateTimeInput: string = '';
  @Input() dateTimeMask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
  @Output() dpChange: EventEmitter<ChangeEventObject>;
  @Output() dpError: EventEmitter<ErrorEventObject>;
  @Output() dpHide: EventEmitter<HideEventObject>;
  @Output() dpShow: EventEmitter<any>;
  @Output() dpUpdate: EventEmitter<UpdateEventObject>;
  private parseError: boolean;
  private dpElement: any;
  private dpObject: Datetimepicker;
  private validModes: string[] = ['input-group', 'input', 'inline'];

  constructor(el: ElementRef) {
    this.el = el;
    this.inputClass = 'form-control';
    this.groupClass = '';
    this.groupIconClass = 'glyphicon glyphicon-calendar';
    this.readOnly = false;
    this.placeholder = '';
    this.dpChange = new EventEmitter();
    this.dpError = new EventEmitter();
    this.dpHide = new EventEmitter();
    this.dpShow = new EventEmitter();
    this.dpUpdate = new EventEmitter();
    this.validModes = ['input-group', 'input', 'inline'];
    this.propagateChange = function (_) {
    };
  }

  ngOnInit(): void {
    if (this.validModes.indexOf(this.mode) === -1) {
      let modes = this.validModes.map(function (m) {
        return '"' + m + '"';
      }).join(', ');
      throw new Error(this.mode + ' is not valid mode, use one of following: ' + modes);
    }
    this.initDatetimepicker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dpObject && changes && changes['options']) {
      this.dpObject.options(this.options);
    }
  }

  ngOnDestroy(): void {
    this.dpObject.destroy();
  }

  writeValue(obj: any): void {
    if (!obj) {
      obj = moment();
    }
    if (typeof obj === 'string' || obj instanceof String) {
      obj = moment(obj.toString());
    }
    this.dpObject.date(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  };

  validate = function (c) {
    return (!this.parseError) ? null : {
      dateParseError: {
        valid: false,
      },
    };
  }

  registerOnTouched(): void {

  }

  private onChange(date) {
    this.propagateChange(date);
  }

  private propagateChange = (_: any) => {
  };

  private initDatetimepicker() {
    for (let _i = 0, _a = this.validModes; _i < _a.length; _i++) {
      let m = _a[_i];
      if (m !== this.mode) {
        $(this.el.nativeElement.querySelector('.sq-datetimepicker-' + m)).remove();
      }
    }
    this.dpElement = $(this.el.nativeElement.querySelector('.sq-datetimepicker-' + this.mode));
    let options = Object.assign({}, this.options);
    options.inline = this.mode === 'inline';
    this.dpElement.datetimepicker(options);
    this.dpObject = this.dpElement.data('DateTimePicker');
    this.bindEvents();
  }

  private bindEvents() {
    let _this = this;
    this.dpElement.on('dp.hide', function (e) {
      _this.dpHide.emit(e);
    });
    this.dpElement.on('dp.show', function () {
      _this.dpShow.emit();
    });
    this.dpElement.on('dp.change', function (e) {
      _this.parseError = false;
      _this.onChange(e.date || null);
      _this.dpChange.emit(e);
    });
    this.dpElement.on('dp.error', function (e) {
      _this.parseError = true;
      _this.onChange(null);
      _this.dpError.emit(e);
    });
    this.dpElement.on('dp.update', function (e) {
      _this.dpUpdate.emit(e);
    });
  }
}
