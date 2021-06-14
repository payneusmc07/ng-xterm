import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SettingsModule } from "@settings/settings.module"
import { TabsComponent } from "./tabs.component"
import { SplitPanelComponent } from "./tab/split-panel.component"
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap"
import { TerminalModule } from "@terminal/terminal.module"
import { TabService } from "./tab.service"
import { TaskListModule } from "@task-list/task-list.module"

@NgModule({
	declarations: [
		TabsComponent,
		SplitPanelComponent,
	],
	exports: [ SplitPanelComponent, TabsComponent ],
	imports: [
		CommonModule,
		NgbNavModule,
		TerminalModule,
		TaskListModule,
		SettingsModule,
	],
	providers: [TabService],
	bootstrap: [TabsComponent]
})

export class TabsModule {}
