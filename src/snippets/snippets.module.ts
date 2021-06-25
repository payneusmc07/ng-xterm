import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SnippetsComponent } from "@snippets/snippets.component"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
	declarations: [ SnippetsComponent ],
	exports: [ SnippetsComponent ],
	imports: [ CommonModule, ReactiveFormsModule ]
})
export class SnippetsModule {}
