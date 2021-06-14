import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap"
import { WindowControlsComponent} from "./window-controls/window-controls.component"
import { SettingsService } from "@shared/services"
import { SettingsComponent } from "./settings.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { TabSettingsComponent } from "./tabs/tab-settings.component"
import { ShellComponent } from "./terminal/shell/shell.component"
import { ForegroundComponent } from "./terminal/foreground/foreground.component"
import { CursorComponent } from "./terminal/foreground/cursor/cursor.component"
import { FontComponent } from "./terminal/foreground/font/font.component"
import { BackgroundComponent } from "./terminal/background/background.component"
import { AdvancedComponent } from './terminal/advanced/advanced.component'


@NgModule({
	declarations: [
		SettingsComponent,
		ForegroundComponent,
		BackgroundComponent,
		TabSettingsComponent,
		ShellComponent,
		CursorComponent,
		FontComponent,
		WindowControlsComponent,
        AdvancedComponent
	],
	exports: [
		SettingsComponent,
		TabSettingsComponent,
		BackgroundComponent,
		ShellComponent,
		AdvancedComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbTooltipModule
	],
	providers: [ SettingsService ]
})

export class SettingsModule {}
