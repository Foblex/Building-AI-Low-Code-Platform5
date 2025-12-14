import {
  ChangeDetectionStrategy,
  Component,
  inject, output,
  Signal,
} from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { FlowState } from '@flow-state';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ThemeName, ThemeService } from '@core';

@Component({
  selector: 'flow-toolbar',
  templateUrl: './flow-toolbar.html',
  styleUrl: './flow-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FFlowModule,
    MatTooltipModule,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
})
export class FlowToolbar {
  private readonly _state = inject(FlowState);
  private readonly _themeService = inject(ThemeService);

  protected readonly themes = this._themeService.themes;

  protected get currentTheme() {
    return this._themeService.current;
  }

  protected get currentThemeIcon() {
    return (
      this.themes.find((theme) => theme.name === this.currentTheme)?.icon ??
      'palette'
    );
  }

  protected get canUndo(): Signal<boolean> {
    return this._state.canUndo;
  }

  protected get canRedo(): Signal<boolean> {
    return this._state.canRedo;
  }

  public readonly resetScaleAndCenter = output();
  public readonly fitToScreen = output();
  public readonly resetFlow = output();
  public readonly executeFlow = output();
  public readonly importFlow = output<string>();
  public readonly exportFlow = output();

  protected undo(): void {
    this._state.undo();
  }

  protected redo(): void {
    this._state.redo();
  }

  protected setTheme(theme: ThemeName): void {
    this._themeService.setTheme(theme);
  }

  protected openImport(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  protected async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      this.importFlow.emit(content);
    } catch (error) {
      console.error('Failed to read file', error);
    } finally {
      if (input) {
        input.value = '';
      }
    }
  }
}
