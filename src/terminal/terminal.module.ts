import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { SharedModule } from "@shared/shared.module"
import { TerminalComponent } from "@terminal/./terminal.component"
import { NgTerminalModule } from "ng-terminal"
import { TopBarComponent } from "@terminal/top-bar/top-bar.component"
import { SnippetsModule } from "@snippets/snippets.module"

@NgModule({
	declarations: [TerminalComponent, TopBarComponent ],
	exports: [ TerminalComponent ],
	imports: [
		CommonModule,
		NgTerminalModule,
		SnippetsModule,
		SharedModule,
		ReactiveFormsModule
	],
	providers: [ ]
})

export class TerminalModule {}
