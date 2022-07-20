import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SessionManagerService } from '../core/services/session-manager.service';


@Component({
  selector: 'app-canvas',
  template: `<canvas #canvas id="canvasDraw"></canvas>`,
  styles: ['canvas { border: 2px dotted #000; }']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef | undefined;

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;

  public cx: CanvasRenderingContext2D | null | undefined;

  constructor(private sessionManager: SessionManagerService) {
    this.sessionManager.clearCanvas.subscribe((value)=> {
      if (value == true)
        this.clearContent();
    });
  }

  public ngAfterViewInit() {
    var canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.isMobile && !this.isTablet? document.getElementById("uploadDataPopup").clientWidth * 0.95 : !this.isMobile && this.isTablet? document.getElementById("uploadDataPopup").clientWidth * 0.99 : document.getElementById("uploadDataPopup").clientWidth * 0.99;
    canvasEl.height = 250;

    if (!this.cx) throw 'Cannot get context';

    this.cx.lineWidth = 3;
    this.cx.strokeStyle = (this.sessionManager.getThemeFromSession() == "dark") ? "white" : (this.sessionManager.getThemeFromSession() == "light") ? "black" : "orange";
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    if (!this.isMobile && !this.isTablet) {
      // this will capture all mousedown events from the canvas element
      fromEvent(canvasEl, 'mousedown')
        .pipe(
          switchMap(e => {
            // after a mouse down, we'll record all mouse moves
            return fromEvent(canvasEl, 'mousemove').pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
          })
        )
        .subscribe((res) => {
          const rect = canvasEl.getBoundingClientRect();
          const prevMouseEvent = res[0] as MouseEvent;
          const currMouseEvent = res[1] as MouseEvent;

          // previous and current position with the offset
          const prevPos = {
            x: prevMouseEvent.clientX - rect.left,
            y: prevMouseEvent.clientY - rect.top
          };

          const currentPos = {
            x: currMouseEvent.clientX - rect.left,
            y: currMouseEvent.clientY - rect.top
          };

          // this method we'll implement soon to do the actual drawing
          this.drawOnCanvas(prevPos, currentPos);
        });
    } else if (this.isMobile || this.isTablet) {
      fromEvent(canvasEl, 'touchstart')
        .pipe(
          switchMap(e => {
            // after a touch down, we'll record all touch moves
            return fromEvent(canvasEl, 'touchmove').pipe(
              // we'll stop (and unsubscribe) once the user releases the touch
              // this will trigger a 'touch up' event
              takeUntil(fromEvent(canvasEl, 'touchend')),
              // we'll also stop (and unsubscribe) once the touch leaves the canvas (touchleave event)
              //takeUntil(fromEvent(canvasEl, 'touchleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
          })
        )
        .subscribe((res) => {
          const rect = canvasEl.getBoundingClientRect();
          const prevTouchEvent = res[0] as TouchEvent;
          const currTouchEvent = res[1] as TouchEvent;

          // previous and current position with the offset
          const prevPos = {
            x: prevTouchEvent.touches[0].clientX - rect.left,
            y: prevTouchEvent.touches[0].clientY - rect.top
          };

          const currentPos = {
            x: currTouchEvent.touches[0].clientX - rect.left,
            y: currTouchEvent.touches[0].clientY - rect.top
          };

          // this method we'll implement soon to do the actual drawing
          this.drawOnCanvas(prevPos, currentPos);
        });
    }
  }

  clearContent() {
      this.cx.clearRect(0, 0, this.isMobile && !this.isTablet? document.getElementById("uploadDataPopup").clientWidth * 0.95 : !this.isMobile && this.isTablet? document.getElementById("uploadDataPopup").clientWidth * 0.99 : document.getElementById("uploadDataPopup").clientWidth * 0.99, 250);
  }

  private drawOnCanvas(prevPos: { x: number; y: number }, currentPos: { x: number; y: number }) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }
}
