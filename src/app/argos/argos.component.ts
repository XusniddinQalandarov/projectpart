import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-argos',
  imports: [NgIf, NgClass],
  templateUrl: './argos.component.html',
})
export class ArgosComponent {
  isDark = false;
  currentLang = 'Uz';
  languageMenuOpen = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;
  }

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  selectLanguage(lang: string) {
    this.currentLang = lang;
    this.languageMenuOpen = false;
  }
}
