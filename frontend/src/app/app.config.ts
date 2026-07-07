import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeEnAU from '@angular/common/locales/en-AU';

registerLocaleData(localeEnAU);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'en-AU' }
  ]
};
