import { Component, Input, OnDestroy, OnInit } from "@angular/core"
import { SplitPanel } from "@shared/models/split-panel.model"
import { ElectronService } from "@shared/services"
import { IPCChannelNames } from "@shared/utils"
import { SplitPanelService } from "@tabs/tab/split-panel.service"
import { TerminalComponent } from "@terminal/terminal.component"
import { Observable } from "rxjs"

@Component({
	selector: "ng-xterm-split-panel",
	template: `
		<ng-container>
			<div class="row row-cols-3" style="position: relative">
				<div class="col-sm"
				     *ngFor="let panel of (splitPanelContent$ | async);
                 let i = index">
					<ng-xterm-terminal

						[terminalID]="i"
						(focusin)="handleFocus()"
						(focusout)="handleBlur()"
					>
					</ng-xterm-terminal>
					<span class="badge bg-secondary"
					      (click)="addPanel()">+</span>

					<span class="badge bg-secondary"
					      (click)="removePanel(i)"
					>-</span>
				</div>
			</div>
		</ng-container>
	`,
	styles: [ `
		select {width: 100px}
		.badge { cursor: pointer;}
		.badge:active { background-color: #5e5e5e !important; }
	`],
	providers: [ SplitPanelService ]
})

export class SplitPanelComponent implements OnInit, OnDestroy {

	/** A number value which will "catch" the emitted tab id from the ng-xterm-tabs-component */
	@Input() tabID: number

	/** The terminal component to be added to the split panel */
	terminalComponent: TerminalComponent

	/** An empty array used to hold the appended terminals */
	splitPanelContent: SplitPanel[] = []

	/**
	 * A value used to represent the Observable<SplitPanel[]>
	 * returned from the split panel service
	 * */
	splitPanelContent$: Observable<SplitPanel[]>

	/** A number value which will be used to assign each appended terminal
	 * a unique ID
	 * */
	private counter = 0

	/** A bool used to determine is a panel is focused or blurred */
	private isActive: boolean

	/**
	 * To ensure each tab has its own instance of the split panel service, we
	 * can add the @Self decorator to the splitPanelService dependency injector.
	 *
	 * If each tab does not have its own instance of the service, when a terminal is
	 * added to removed from the split panel,
	 * the change will be reflected in ALL other UI tabs.
	 * */
	constructor(private readonly electronService: ElectronService,
	            private splitPanelService: SplitPanelService) {
	}

	ngOnInit() {
		this.handleBlur()
		this.handleFocus()

		this.splitPanelContent$ = this.splitPanelService.getPanels()

		this.electronService.ipcRenderer
			.on(IPCChannelNames.ADD_PANEL, () => {
				if(this.isActive) {
					this.splitPanelService.addPanel(this.counter++, this.terminalComponent)
				}
			})

		this.electronService.ipcRenderer
			.on(IPCChannelNames.REMOVE_FOCUSED_PANEL, () => {
				if(this.isActive) {
					this.splitPanelService.removePanel(this.tabID)
				}
			})
	}


	/** Use the split panel service to append a new terminal to the split panel */
	addPanel() {
		this.splitPanelService.addPanel(this.counter++, this.terminalComponent)
		this.tabID++
		console.log(this.tabID)
	}

	/**
	 * Use the split panel service to remove a new terminal to the split panel
	 * @param {number} panelToRemove the id of the panel to remove from the split panel
	 * */
	removePanel(panelToRemove: number) {
		this.splitPanelService.removePanel(panelToRemove)
	}

	/** Check if the panel is blurred */
	handleBlur() {
		this.isActive = false
	}

	/** Check if the panel is focused */
	handleFocus() {
		this.isActive = true
	}

	/** So we don't cause memory leaks, we need to remove any active ipcRenderer listners  */
	ngOnDestroy() {
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.ADD_PANEL)
		this.electronService.ipcRenderer.removeAllListeners(IPCChannelNames.REMOVE_FOCUSED_PANEL)

	}
}
