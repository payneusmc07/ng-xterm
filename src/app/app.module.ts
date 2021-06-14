// Angular
import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { TabsModule } from "@tabs/tabs.module"

// Components
import { AppComponent } from "./app.component"
import { AppTopbarComponent } from "./app-topbar/app-topbar.component"

// Modules
import { SharedModule } from "@shared/shared.module"

/**
 * A common practice is to keep EVERYTHING inside the App Module, seeing it
 * is the "root" module in any Angular application. While there is nothing wrong
 * with this, if this module becomes too large, it can become difficult
 * to manage. With this in mind, I have opted to split each major "feature" into
 * its own module.
 * */
@NgModule({
	declarations: [ AppComponent, AppTopbarComponent ],
	imports: [
		BrowserModule,
		SharedModule,
		TabsModule
	],
	providers: [ ],
	exports: [ AppTopbarComponent ],
	bootstrap: [ AppComponent ]
})

export class AppModule {}
