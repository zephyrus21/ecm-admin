'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useOrigin } from '@/hooks/use-origin';
import ApiAlert from './api-alert';

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origins = useOrigin();

  const baseUrl = `${origins}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
