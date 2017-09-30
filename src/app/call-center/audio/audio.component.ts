import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'mo-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @Input("data") data:any;
  @ViewChild('audio') audio:ElementRef;

  showAudio: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if(this.data) {
      this.showAudio = true;
      this.audio.nativeElement.src = this.data.source;
      this.audio.nativeElement.play();
    }
  }
  close(){
    this.showAudio = false;
    this.audio.nativeElement.pause();
    this.audio.nativeElement.currentTime = 0;
  }
}
