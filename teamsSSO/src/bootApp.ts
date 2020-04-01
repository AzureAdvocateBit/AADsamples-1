import { IADGroup } from './model/IADGroup';
import { ServiceFactory, ServiceOption } from './services/ServiceFactory';
import { IMSGraphService } from './services/MSGraphService/IMSGraphService';

import ComponentManager from './components/ComponentManager';

export class bootstrapper {

  public onInit(): void {

    const workspace = document.getElementById('spaContainer');
    if (workspace) {

      let service: IMSGraphService = null;
      service = ServiceFactory.getService(ServiceOption.v2);
//        service = ServiceFactory.getService(ServiceOption.mock);

      service.getAllGroups()
        .then((data: IADGroup[]) => {
          ComponentManager.renderGroupTable(workspace, data);
        })
        .catch((error: string) => {
          console.log(`Error: ${error}`);
        });

    } else {

      // The elemement we want to attach to is missing
      console.log('Error: Unable to find element to attach header and footer');

    }
  }
}

// In-line code starts here
(() => {
  let b = new bootstrapper();
  b.onInit();
})();