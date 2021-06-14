import {
	Component,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
	EventEmitter
} from "@angular/core"
import { Tab } from "@shared/models"
import { TabService } from "./tab.service"
import { Observable } from "rxjs"
import { SplitPanelComponent } from "./tab/split-panel.component"
import { SettingsService } from "@shared/services"
import { AppSettings, IPCChannelNames } from "@shared/utils/constants"
import { ElectronService } from "@shared/services"

@Component({
	selector: "ng-xterm-tabs",
	templateUrl: "./tabs.component.html",
	styleUrls: [ "./tabs.component.scss" ],
})

export class TabsComponent implements OnInit, OnDestroy {
	@ViewChild("tab", { static: false }) tabIndex: HTMLElement
	@Output() tabID = new EventEmitter<number | string>()
	active
	tabContainer: SplitPanelComponent
	tabComponents: Tab[]
	tabContent$: Observable<Tab[]>
	counter = 0
	tabBackgroundColor: string
	tabFontColor: string
	tabToRemove: number

	constructor(
		private readonly tabService: TabService,
		private readonly electronService: ElectronService,
		private readonly settingsService: SettingsService
	) {}

	ngOnInit() {
		this.tabContent$ = this.tabService.getTabs()
		this.tabFontColor = this.settingsService.getItem(AppSettings.TAB_FG_COLOR) as string
		this.tabBackgroundColor = this.settingsService.getItem(AppSettings.TAB_BG_COLOR) as string

		this.electronService.ipcRenderer.on(IPCChannelNames.NEW_TAB, () => {
			this.tabService.addTerminal(this.counter++, this.tabContainer)
		})
	}

	removeTab(tab: number) {
		this.tabToRemove = tab
		this.tabService.removeTerminal(tab)
	}

	emitTabID(id: number | string) {
		this.tabID.emit(id)
	}

	ngOnDestroy(){
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.NEW_TAB)
	}
}
