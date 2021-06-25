'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-xterm documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-fa0a9af372ef618ce19c519933b4f14c"' : 'data-target="#xs-components-links-module-AppModule-fa0a9af372ef618ce19c519933b4f14c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-fa0a9af372ef618ce19c519933b4f14c"' :
                                            'id="xs-components-links-module-AppModule-fa0a9af372ef618ce19c519933b4f14c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppTopbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppTopbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link">SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' : 'data-target="#xs-components-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' :
                                            'id="xs-components-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' }>
                                            <li class="link">
                                                <a href="components/AdvancedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdvancedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BackgroundSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BackgroundSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CursorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CursorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForegroundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForegroundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeneralSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MiscSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MiscSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' : 'data-target="#xs-injectables-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' :
                                        'id="xs-injectables-links-module-SettingsModule-351899008201d3e7b8c927544c0bfb46"' }>
                                        <li class="link">
                                            <a href="injectables/SettingsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SettingsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link">SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SnippetsModule.html" data-type="entity-link">SnippetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SnippetsModule-e8fee2fe6656413243c6452b961c7c86"' : 'data-target="#xs-components-links-module-SnippetsModule-e8fee2fe6656413243c6452b961c7c86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SnippetsModule-e8fee2fe6656413243c6452b961c7c86"' :
                                            'id="xs-components-links-module-SnippetsModule-e8fee2fe6656413243c6452b961c7c86"' }>
                                            <li class="link">
                                                <a href="components/SnippetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnippetsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsModule.html" data-type="entity-link">TabsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' : 'data-target="#xs-components-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' :
                                            'id="xs-components-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' }>
                                            <li class="link">
                                                <a href="components/SplitPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SplitPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' : 'data-target="#xs-injectables-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' :
                                        'id="xs-injectables-links-module-TabsModule-810a98eabc0abca41316135b1722a9dc"' }>
                                        <li class="link">
                                            <a href="injectables/TabService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TabService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TerminalModule.html" data-type="entity-link">TerminalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TerminalModule-7c429e378f79cacdc90408f7c3147ec1"' : 'data-target="#xs-components-links-module-TerminalModule-7c429e378f79cacdc90408f7c3147ec1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TerminalModule-7c429e378f79cacdc90408f7c3147ec1"' :
                                            'id="xs-components-links-module-TerminalModule-7c429e378f79cacdc90408f7c3147ec1"' }>
                                            <li class="link">
                                                <a href="components/TerminalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TerminalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdvancedComponent.html" data-type="entity-link">AdvancedComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppTopbarComponent.html" data-type="entity-link">AppTopbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BackgroundSettingsComponent.html" data-type="entity-link">BackgroundSettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CursorComponent.html" data-type="entity-link">CursorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForegroundComponent.html" data-type="entity-link">ForegroundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GeneralSettingsComponent.html" data-type="entity-link">GeneralSettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MiscSettingsComponent.html" data-type="entity-link">MiscSettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SplitPanelComponent.html" data-type="entity-link">SplitPanelComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppHelper.html" data-type="entity-link">AppHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/IpcHelper.html" data-type="entity-link">IpcHelper</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddonsProviderService.html" data-type="entity-link">AddonsProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommandRunnerService.html" data-type="entity-link">CommandRunnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ElectronService.html" data-type="entity-link">ElectronService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileSystemService.html" data-type="entity-link">FileSystemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NodePtyService.html" data-type="entity-link">NodePtyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsService.html" data-type="entity-link">SettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnippetsService.html" data-type="entity-link">SnippetsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SplitPanelService.html" data-type="entity-link">SplitPanelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TabService.html" data-type="entity-link">TabService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeProviderService.html" data-type="entity-link">ThemeProviderService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Snippet.html" data-type="entity-link">Snippet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SplitPanel.html" data-type="entity-link">SplitPanel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tab.html" data-type="entity-link">Tab</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});