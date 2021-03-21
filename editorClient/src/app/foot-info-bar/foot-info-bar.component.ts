import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from '../core/services/session-manager.service';

@Component({
  selector: 'app-foot-info-bar',
  templateUrl: './foot-info-bar.component.html',
  styleUrls: ['./foot-info-bar.component.scss']
})
export class FootInfoBarComponent implements OnInit {

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

}
