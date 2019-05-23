declare var filestack;
import {
  Component, HostListener, ElementRef, Renderer, EventEmitter, Output, Input,
  OnInit, OnDestroy
} from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-file-stack",
  templateUrl: "file-stack.component.html"
})
export class FileStackComponent implements OnInit, OnDestroy {
  private el: HTMLElement;
  @Input("data-accept")
  private dataFormat: any;
  @Output("complete")
  private output: EventEmitter<any> = new EventEmitter();
  private appConfigSubscriber: Subscription;
  constructor(private _elementRef: ElementRef, private _renderer:
    Renderer) {
    this.el = _elementRef.nativeElement;
  }
  ngOnInit() { }
  //open filestack on click event
  @HostListener("click", ['$event'])
  onFileStackFieldClick(event: MouseEvent) {
    console.log("clicked");
    let accept = (this.dataFormat || "").split(",");
    let maxFiles = this.el.getAttribute("data-maxfiles");
    if (this.appConfigSubscriber) {
      this.appConfigSubscriber.unsubscribe();
      this.appConfigSubscriber = null;
    }
    let filestackConfig = environment.filestackConfig.key;
    let fileStackClient = filestack.init(filestackConfig);
    fileStackClient.picker({
      accept: accept,
      maxFiles: parseInt(maxFiles),
      /*fromSources: 'local_file_system',*/
      /*storeTo: {
      location: 's3',
      // s3 configuration
      },*/
      fromSources: ["local_file_system"],
      onFileUploadFailed: (file, e) => {
        this.output.emit({
          success: false,
          data: file
        });
      },
      onFileSelected: function(file) {
        console.log("file selected");
        return file;
      },
      onFileUploadFinished: (file) =>
      {
        console.log("upload finished " + file);
        this.output.emit({
          success: true,
          data: file
        });
      }
    }).open();
  }
  ngOnDestroy() {
    if (this.appConfigSubscriber) {
      this.appConfigSubscriber.unsubscribe();
      this.appConfigSubscriber = null;
    }
  }
}
