import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { App2SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [App2SharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [App2SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App2SharedModule {
  static forRoot() {
    return {
      ngModule: App2SharedModule
    };
  }
}
