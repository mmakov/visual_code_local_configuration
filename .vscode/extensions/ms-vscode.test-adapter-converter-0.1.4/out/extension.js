var D=Object.create;var T=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var R=r=>T(r,"__esModule",{value:!0});var O=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),W=(r,e)=>{R(r);for(var t in e)T(r,t,{get:e[t],enumerable:!0})},j=(r,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of F(e))!L.call(r,s)&&s!=="default"&&T(r,s,{get:()=>e[s],enumerable:!(t=U(e,s))||t.enumerable});return r},f=r=>j(R(T(r!=null?D(H(r)):{},"default",r&&r.__esModule&&"default"in r?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r);var E=O(g=>{"use strict";Object.defineProperty(g,"__esModule",{value:!0});g.testExplorerExtensionId=void 0;g.testExplorerExtensionId="hbenl.vscode-test-explorer"});W(exports,{activate:()=>q});var c=f(require("vscode")),x=f(E());var p=f(require("vscode")),S="promptedToUseNative",k=!1,m="testExplorer.useNativeTesting",C=()=>!!p.workspace.getConfiguration().get(m,!1),I=(r=p.ConfigurationTarget.Global)=>{p.workspace.getConfiguration().update(m,!0,r),p.window.showInformationMessage('Thanks for taking native testing for a spin! If you run into problems, you can turn the new experience off with the "testExplorer.useNativeTesting" setting.')};var y=class{constructor(e){this.context=e}registerTestAdapter(e){!this.shouldPrompt()||e.testStates(t=>{t.type==="started"&&this.promptToUseNativeTesting()})}unregisterTestAdapter(){}shouldPrompt(){return!k&&!C()&&!this.context.globalState.get(S)}async promptToUseNativeTesting(){if(!this.shouldPrompt())return;let e="Yes",t="Only in this Workspace",s="No";k=!0;let o=await p.window.showInformationMessage("Would you like to try out VS Code's new native UI for testing?",s,e,t);!o||(o===e?I(p.ConfigurationTarget.Global):o===t?I(p.ConfigurationTarget.Workspace):o===s&&this.context.globalState.update(S,!0))}};var P=f(require("vscode"));var n=f(require("vscode")),B=new WeakMap,A="workbench.view.extension.test",b=class{constructor(e){this.adapter=e;this.itemsById=new Map;this.tasksByRunId=new Map;this.runningSuiteByRunId=new Map;this.disposables=[];this.disposables.push(e.tests(t=>{var s;switch(t.type){case"finished":(s=this.doneDiscovery)==null||s.call(this),this.doneDiscovery=void 0,this.itemsById.clear(),t.suite&&this.syncTopLevel(t.suite);break;case"started":this.doneDiscovery||n.window.withProgress({location:{viewId:A}},()=>new Promise(o=>{this.doneDiscovery=o}));break}}),e.testStates(t=>{var o,i;let s=this.tasksByRunId.get((o=t.testRunId)!=null?o:"");if(!!s)switch(t.type){case"test":return this.onTestEvent(s,t);case"suite":return this.onTestSuiteEvent(t);case"finished":return this.tasksByRunId.delete((i=t.testRunId)!=null?i:""),s.end()}}))}get controllerId(){var e;return(e=this.controller)==null?void 0:e.id}async refresh(){await n.window.withProgress({location:{viewId:A}},()=>this.adapter.load())}dispose(){this.disposables.forEach(e=>e.dispose())}async run(e,t,s,o){if(!this.controller)return;t||(t=M(this.controller.items));let i=this.adapter.testStates(a=>{var l;if(a.type!=="started")return;let u=[t];for(;u.length;)for(let d of u.pop())e.enqueued(d),u.push(M(d.children));this.tasksByRunId.set((l=a.testRunId)!=null?l:"",e),o.onCancellationRequested(()=>this.adapter.cancel()),i.dispose()});s?this.adapter.debug?this.adapter.debug(t.map(a=>a.id)):i.dispose():this.adapter.run(t.map(a=>a.id))}syncTopLevel(e){let t=this.acquireController(e.label);this.syncItemChildren(t,t.items,e.children)}syncItemChildren(e,t,s,o){t.replace(s.map(i=>this.createTest(e,i,o)))}createTest(e,t,s){let o=e.createTestItem(t.id,t.label,t.file?N(t.file):s);return B.set(o,{converter:this}),this.itemsById.set(t.id,o),o.description=t.description,t.line!==void 0&&(o.range=new n.Range(t.line,0,t.line+1,0)),t.errored&&(o.error=t.message),"children"in t&&this.syncItemChildren(e,o.children,t.children),o}onTestSuiteEvent(e){var i;let t=(i=e.testRunId)!=null?i:"",s=this.runningSuiteByRunId.get(t),o=typeof e.suite=="string"?e.suite:e.suite.id;e.state==="running"?(!this.itemsById.has(o)&&typeof e.suite=="object"&&s&&s.children.add(this.createTest(this.controller,e.suite)),this.itemsById.has(o)&&this.runningSuiteByRunId.set(t,this.itemsById.get(o))):s&&s.id===o&&(s.parent?this.runningSuiteByRunId.set(t,s.parent):this.runningSuiteByRunId.delete(t))}onTestEvent(e,t){var a,u;let s=this.runningSuiteByRunId.get((a=t.testRunId)!=null?a:""),o=typeof t.test=="string"?t.test:t.test.id;t.state==="running"&&!this.itemsById.has(o)&&typeof t.test=="object"&&s&&s.children.add(this.createTest(this.controller,t.test));let i=this.itemsById.get(o);if(!!i){switch(t.state){case"skipped":e.skipped(i);break;case"running":e.started(i);break;case"passed":e.passed(i);break;case"errored":case"failed":let l=[];if(t.message){let d=new n.TestMessage(t.message);l.push(d)}for(let d of(u=t.decorations)!=null?u:[]){let v=new n.TestMessage(d.message),h=d.file?N(d.file):i.uri;h&&(v.location=new n.Location(h,new n.Position(d.line,0))),l.push(v)}e[t.state](i,l);break}t.message&&(t.state!=="errored"&&t.state!=="failed"||!i.uri)&&e.appendOutput(t.message.replace(/\r?\n/g,`\r
`))}}acquireController(e){if(this.controller)return this.controller.label=e,this.controller;let t=`test-adapter-ctrl-${e}`;this.adapter.workspaceFolder&&(t+=`-${this.adapter.workspaceFolder.uri.toString()}`);let s=this.controller=n.tests.createTestController(t,e);this.disposables.push(s);let o=i=>(a,u)=>{if(!a.include){this.run(s.createTestRun(a),a.include,i,u);return}let l=new Map;for(let d of a.include){let v=B.get(d).converter,h=l.get(v);h?h.push(d):l.set(v,[d])}for(let[d,v]of l)d.run(s.createTestRun(a),v,i,u)};return s.createRunProfile("Run",n.TestRunProfileKind.Run,o(!1),!0),s.createRunProfile("Debug",n.TestRunProfileKind.Debug,o(!0),!0),n.commands.executeCommand("setContext","hasTestConverterTests",!0),s}},M=r=>{let e=[];return r.forEach(t=>e.push(t)),e},K=/^[a-z][a-z0-9+-.]+:/,N=r=>K.test(r)?n.Uri.parse(r):n.Uri.file(r);var w=class{constructor(){this.converters=new Map}registerTestAdapter(e){this.converters.set(e,new b(e))}unregisterTestAdapter(e){var t;(t=this.converters.get(e))==null||t.dispose(),this.converters.delete(e)}dispose(){for(let e of this.converters.values())e.dispose();P.commands.executeCommand("setContext","hasTestConverterTests",!1)}refresh(){for(let e of this.converters.values())e.refresh()}};function q(r){let e,t=new y(r);c.env.appName.toLowerCase().includes("insiders")&&t.shouldPrompt()&&setTimeout(()=>{var o;let s=(o=c.extensions.getExtension(x.testExplorerExtensionId))==null?void 0:o.exports;!s||(s.registerTestController(t),r.subscriptions.push({dispose(){s.unregisterTestController(t)}}))},2e3),r.subscriptions.push(c.commands.registerCommand("testExplorerConverter.activate",()=>{var o;let s=(o=c.extensions.getExtension(x.testExplorerExtensionId))==null?void 0:o.exports;!s||(e=new w,r.subscriptions.push(e),s.registerTestController(e),r.subscriptions.push({dispose(){s.unregisterTestController(e)}}))}),c.workspace.onDidChangeConfiguration(s=>{!s.affectsConfiguration(m)||C()||(e==null||e.dispose(),e=void 0)}),c.commands.registerCommand("testExplorerConverter.refreshAdapter",()=>e==null?void 0:e.refresh()),c.commands.registerCommand("testExplorerConverter.useNativeTesting",()=>I()))}0&&(module.exports={activate});