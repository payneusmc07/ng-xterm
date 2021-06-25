import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdvancedComponent } from "@settings/advanced/advanced.component"
import { GeneralSettingsComponent } from "@settings/general/general-settings.component"
import { MiscSettingsComponent } from "@settings/misc/misc-settings.component"

const routes: Routes = [
	{
		path: "",
		component: GeneralSettingsComponent
	},
	{
		path: "general",
		component: GeneralSettingsComponent
	},
	{
		path: "advanced",
		component: AdvancedComponent
	},
	{
		path: "misc",
		component: MiscSettingsComponent
	},

]

@NgModule({
	imports: [ RouterModule.forChild(routes)],
	exports: [ RouterModule ]
})

export class SettingsRoutingModule {}
