import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SettingsModule } from "@settings/settings.module"
import { SharedModule } from "@shared/shared.module"
import { TabsComponent } from "@tabs/tabs.component"
import { SplitPanelComponent } from "@tabs/tab/split-panel.component"
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap"
import { TerminalModule } from "@terminal/terminal.module"
import { TabService } from "@tabs/tab.service"
import { SnippetsModule } from "@snippets/snippets.module"
import { SortablejsModule } from "ngx-sortablejs"

@NgModule({
	declarations: [
		TabsComponent,
		SplitPanelComponent
	],
	exports: [ SplitPanelComponent, TabsComponent ],
	imports: [
		CommonModule,
		NgbNavModule,
		TerminalModule,
		SnippetsModule,
		SettingsModule,
		SharedModule,
		SortablejsModule.forRoot({ghostClass: "ghost"})
	],
	providers: [TabService],
	bootstrap: [TabsComponent]
})

export class TabsModule {}
