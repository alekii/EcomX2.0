import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit, AfterViewInit {
  @ViewChild('slides') slides: ElementRef;
  images: any;
  width: number;
  counter: number = 1;
  imgid:string

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 
    this.width = this.slides.nativeElement.clientWidth; 
    this.slides.nativeElement.style.transform =
      'translateX(' + -(this.width * this.counter) + 'px)';
    this.images =  this.slides.nativeElement.children; 
    this.myFunc()
  }
  getNextImage() {
    if (this.counter >= this.slides.nativeElement.children.length - 1) return;
    this.counter++;
    this.slides.nativeElement.style.transform =
      'translateX(' + -(this.width * this.counter) + 'px)';
    this.slides.nativeElement.style.transition = 'transform 0.4s ease-in-out';
  }

  getPrevImage() {
    if (this.counter <= 0) return;
    this.counter--;
    this.slides.nativeElement.style.transform =
      'translateX(' + -(this.width * this.counter) + 'px)';
    this.slides.nativeElement.style.transition = 'transform 0.4s ease-in-out';
  }

  getImage(e: Event) {
    if (this.counter >= this.slides.nativeElement.children.length) {
      this.counter = 2; 
    }
    try {
      this.imgid = this.images[this.counter].id;
    } catch (e) {}

    if (this.imgid === 'last') {
      this.slides.nativeElement.style.transition = 'none';
      this.counter = this.images.length - 2;
      this.slides.nativeElement.style.transform = 'translateX(' + -(this.width * this.counter) + 'px)';
    }

    if (this.imgid === 'first') {
      this.slides.nativeElement.style.transition = 'none';
      this.counter = this.images.length - this.counter;
      this.slides.nativeElement.style.transform = 'translateX(' + -(this.width * this.counter) + 'px)';
    }
  }

  myFunc() { 
    this.counter++;
    this.slides.nativeElement.style.transform = "translateX(" + -(this.width * this.counter) + "px)";
    this.slides.nativeElement.style.transition = "transform 0.4s ease-in-out";  

 setTimeout(()=>{
   this.myFunc();
 }, 8000);

}
}
