import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  ngAfterContentInit(): void {
    const activeTabs: TabComponent[] = this.tabs?.filter(tab => tab.active);

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs!.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs?.forEach(tab => {
      tab.active = false;
    });

    tab.active = true;

    return false;
  }

  // currentTabClass(tabVisible: boolean): string {
  //   if (tabVisible === true) {
  //     return "bg-indigo-400";
  //   } else {
  //     return "hover:text-indigo-400";
  //   }
  // }

}
