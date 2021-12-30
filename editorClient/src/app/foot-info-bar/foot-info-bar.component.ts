import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionManagerService } from '../core/services/session-manager.service';

@Component({
  selector: 'app-foot-info-bar',
  templateUrl: './foot-info-bar.component.html',
  styleUrls: ['./foot-info-bar.component.scss']
})
export class FootInfoBarComponent implements OnInit {

  isMobile: Boolean = window.outerWidth < 500;
  isTablet: Boolean = window.outerWidth > 499 && window.outerWidth < 1200;
  footerVisible : Boolean = true;

  constructor(private sessionManager: SessionManagerService) { }

  ngOnInit(): void {
    this.sessionManager.itemKeyboardOnly.subscribe((flagValue) => {
      if (flagValue == true) {
        this.footerVisible = false;
      } else if (flagValue == false) {
        this.footerVisible = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.sessionManager.isMobileDevice.subscribe((value) => {
      this.isMobile = value;
    });

    this.sessionManager.isTabletDevice.subscribe((value) => {
      this.isTablet = value;
    });
  }

}
