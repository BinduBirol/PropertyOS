import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFacility } from 'src/api/propertyAxios';
import { CONFIG } from 'src/config-global';
import { NotFoundView } from 'src/sections/error';
import FacilityEditContent from 'src/sections/property/facility-edit-content';


import type { Facility } from 'src/types/property/facility';

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const [facility, setFacility] = useState<Facility | null>(null);

  useEffect(() => {
    const loadFacility = async () => {
      if (!id) return;

      try {
        const response = await getFacility(id);
        setFacility(response.data);

        if(response.error){
          return <NotFoundView />;
        }

      } catch (error) {
        console.error('Failed to load facility', error);
      }
    };

    loadFacility();
  }, [id]);

  if (!facility) {
    return <NotFoundView />
  }

  return (
    <>
      <title>{`Facility View - ${CONFIG.appName}`}</title>

      <FacilityEditContent facility={facility} />
    </>
  );
}