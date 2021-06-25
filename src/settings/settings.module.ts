import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { SettingsRoutingModule } from "@settings/settings-routing.module"
import { SettingsService } from "@shared/services"
import { SettingsComponent } from "@settings/settings.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ForegroundComponent } from "@settings/general/foreground/foreground.component"
import { CursorComponent } from "@settings/general/foreground/cursor/cursor.component"
import { BackgroundSettingsComponent } from "@settings/general/background/background-settings.component"
import { AdvancedComponent } from "@settings/advanced/advanced.component"
import { GeneralSettingsComponent } from "@settings/general/general-settings.component"
import { MiscSettingsComponent } from "@settings/misc/misc-settings.component"


@NgModule({
	declarations: [
		SettingsComponent,
		ForegroundComponent,
		BackgroundSettingsComponent,
		CursorComponent,
		AdvancedComponent,
		GeneralSettingsComponent,
		MiscSettingsComponent
	],
	exports: [
		SettingsComponent,
		BackgroundSettingsComponent,
		AdvancedComponent,
		GeneralSettingsComponent,
		MiscSettingsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SettingsRoutingModule,
		RouterModule.forRoot([])
	],
	providers: [ SettingsService ]
})

export class SettingsModule {
}
