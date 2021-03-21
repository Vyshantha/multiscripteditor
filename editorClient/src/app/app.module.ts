import { BrowserModule } from '@angular/platform-browser';
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { TranslatorOptionsComponent } from './translator-options/translator-options.component';
import { KeyboardLayoutsComponent } from './keyboard-layouts/keyboard-layouts.component';
import { FormsModule } from '@angular/forms';
//import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from 'ng2-ckeditor';
//import { CKEditorModule } from '@ckeditor/ckeditor5-build-classic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceForKeyboardComponent } from './service-for-keyboard/service-for-keyboard.component';
import { ToolBarActionsComponent } from './tool-bar-actions/tool-bar-actions.component';
import { FootInfoBarComponent } from './foot-info-bar/foot-info-bar.component';
import { HelperComponent } from './helper/helper.component';

import { TranslatePipe } from './core/services/translate.pipe';
import { TranslateService } from './core/services/translate.service';
import { SessionManagerService } from './core/services/session-manager.service';
import { ThemeService } from './core/services/theme.service';
import { KeyboardsTypesService } from './core/services/keyboards-types.service';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    RichTextEditorComponent,
    TranslatorOptionsComponent,
    KeyboardLayoutsComponent,
    ServiceForKeyboardComponent,
    ToolBarActionsComponent,
    FootInfoBarComponent,
    TranslatePipe,
    HelperComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BidiModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSliderModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule
    //ColorPickerModule
  ],
  entryComponents: [ToolBarActionsComponent, HelperComponent, RichTextEditorComponent, KeyboardLayoutsComponent, ServiceForKeyboardComponent, TranslatorOptionsComponent, FootInfoBarComponent],
  providers: [KeyboardsTypesService, SessionManagerService, ThemeService, TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [
        TranslateService
      ],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
