import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-argos',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterLink],
  templateUrl: './argos.component.html',
})
export class ArgosComponent {
  isDark = false;
  currentLang: 'uz' | 'en' | 'ru' = 'uz';
  languageMenuOpen = false;

  readonly languages: Array<'uz' | 'en' | 'ru'> = ['uz', 'en', 'ru'];

  constructor(private transloco: TranslocoService) {
    this.transloco.setActiveLang(this.currentLang);
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
  }

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  selectLanguage(lang: 'uz' | 'en' | 'ru') {
    this.currentLang = lang;
    this.languageMenuOpen = false;
    this.transloco.setActiveLang(lang);
  }
}
