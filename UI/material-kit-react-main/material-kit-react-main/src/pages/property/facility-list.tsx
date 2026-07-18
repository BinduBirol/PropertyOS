import { CONFIG } from 'src/config-global';

import { FacilityListView } from 'src/sections/property/facility-list-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`My Facilities - ${CONFIG.appName}`}</title>

      <FacilityListView />
    </>
  );
}
