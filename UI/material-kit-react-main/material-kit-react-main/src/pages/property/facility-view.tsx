import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { getFacility } from 'src/api/propertyAxios';
import LoadingData from 'src/components/loading/loading-data';
import { CONFIG } from 'src/config-global';
import CustomBreadcrumbs from 'src/routes/components/custom-breadcrumbs';
import { NotFoundView } from 'src/sections/error';
import { ServerErrorView } from 'src/sections/error/server-error';
import FacilityViewContent from 'src/sections/property/facility-view-content';

import type { Facility } from 'src/types/property/facility';

export default function Page() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const loadFacility = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const response = await getFacility(id);
        setFacility(response.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          setServerError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadFacility();
  }, [id]);

  if (loading) {
    return <LoadingData />;
  }

  if (notFound) {
    return <NotFoundView />;
  }

  if (serverError) {
    return <ServerErrorView />;
  }

  return (
    <>
      <title>{`Facility View - ${CONFIG.appName}`}</title>

      

      <FacilityViewContent facility={facility!} />
    </>
  );
}