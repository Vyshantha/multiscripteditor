import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule, APP_INITIALIZER, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'; 
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
import { OptionsComponent } from './options/options.component';
import { KeyboardLayoutsComponent } from './keyboard-layouts/keyboard-layouts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceForKeyboardComponent } from './service-for-keyboard/service-for-keyboard.component';
import { ToolBarActionsComponent } from './tool-bar-actions/tool-bar-actions.component';
import { FootInfoBarComponent } from './foot-info-bar/foot-info-bar.component';
import { HelperComponent } from './helper/helper.component';

import { TranslatePipe } from './core/services/translate.pipe';
import { TranslateService } from './core/services/translate.service';
import { SessionManagerService } from './core/services/session-manager.service';
import { ThemeService } from './core/services/theme.service';
import { SafePipe } from './core/services/safe.pipe';
import { JwtInterceptor } from './core/services/jwt.interceptor';
import { CustomiseKeyboardsComponent } from './customise-keyboards/customise-keyboards.component';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    RichTextEditorComponent,
    OptionsComponent,
    KeyboardLayoutsComponent,
    ServiceForKeyboardComponent,
    ToolBarActionsComponent,
    FootInfoBarComponent,
    TranslatePipe,
    HelperComponent,
    SafePipe,
    CustomiseKeyboardsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BidiModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    DragDropModule,
    MatBadgeModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
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
  entryComponents: [ToolBarActionsComponent, HelperComponent, RichTextEditorComponent, KeyboardLayoutsComponent, ServiceForKeyboardComponent, OptionsComponent, FootInfoBarComponent],
  providers: [SessionManagerService, ThemeService, TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [
        TranslateService
      ],
      multi: true
    },{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
