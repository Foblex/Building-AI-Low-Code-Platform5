import { Injectable } from '@angular/core';

export type ThemeName = 'light' | 'midnight' | 'sunset' | 'forest';

export interface ThemeOption {
  name: ThemeName;
  label: string;
  icon: string;
  swatch: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _storageKey = 'theme';
  private readonly _legacyAliases: Record<string, ThemeName> = {
    dark: 'midnight',
  };
  private readonly _themes: ThemeOption[] = [
    {
      name: 'light',
      label: 'Aurora Light',
      icon: 'light_mode',
      swatch: 'linear-gradient(135deg, hsl(199 90% 55%), hsl(284 86% 65%))',
    },
    {
      name: 'midnight',
      label: 'Midnight Pulse',
      icon: 'nights_stay',
      swatch: 'linear-gradient(135deg, hsl(222 40% 16%), hsl(199 88% 62%))',
    },
    {
      name: 'sunset',
      label: 'Sunset Glow',
      icon: 'sunny',
      swatch: 'linear-gradient(135deg, hsl(18 92% 60%), hsl(330 83% 64%))',
    },
    {
      name: 'forest',
      label: 'Forest Mist',
      icon: 'forest',
      swatch: 'linear-gradient(135deg, hsl(156 58% 42%), hsl(197 76% 52%))',
    },
  ];

  constructor() {
    const saved = this.readThemeFromStorage();
    this.setTheme(saved ?? 'light');
  }

  public get themes(): ThemeOption[] {
    return this._themes;
  }

  public get current(): ThemeName {
    const current = document.documentElement.getAttribute('data-theme');
    return this.isTheme(current) ? current : 'light';
  }

  public toggle(theme: ThemeName): void {
    this.setTheme(theme);
  }

  public setTheme(theme: ThemeName): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this._storageKey, theme);
  }

  private readThemeFromStorage(): ThemeName | null {
    const saved = localStorage.getItem(this._storageKey);
    if (this.isTheme(saved)) {
      return saved;
    }

    const legacy = saved ? this._legacyAliases[saved] : null;
    return legacy ?? null;
  }

  private isTheme(value: string | null): value is ThemeName {
    return this._themes.some((theme) => theme.name === value);
  }
}
