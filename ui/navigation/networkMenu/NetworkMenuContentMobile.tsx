import { Box, Select, VStack } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import { useRouter } from 'next/router';
import React from 'react';

import type { NetworkGroup } from 'types/networks';

import { NETWORKS } from 'lib/networks';

import NetworkMenuLink from './NetworkMenuLink';

const TABS: Array<NetworkGroup> = [ 'mainnets', 'testnets', 'other' ];

const NetworkMenuContentMobile = () => {
  const router = useRouter();
  const routeName = router.pathname.replace('/[network_type]/[network_sub_type]', '');
  const selectedNetwork = NETWORKS.find((network) => router.query.network_type === network.type && router.query.network_sub_type === network.subType);
  const [ selectedTab, setSelectedTab ] = React.useState<NetworkGroup>(TABS.find((tab) => selectedNetwork?.group === tab) || 'mainnets');

  const handleSelectChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value as NetworkGroup);
  }, []);

  return (
    <Box mt={ 6 }>
      <Select size="sm" borderRadius="base" value={ selectedTab } onChange={ handleSelectChange }>
        { TABS.map((tab) => <option key={ tab } value={ tab }>{ capitalize(tab) }</option>) }
      </Select>
      <VStack as="ul" spacing={ 2 } alignItems="stretch" mt={ 6 }>
        { NETWORKS
          .filter(({ group }) => group === selectedTab)
          .map((network) => (
            <NetworkMenuLink
              key={ network.name }
              { ...network }
              isActive={ network.name === selectedNetwork?.name }
              routeName={ routeName }
            />
          ))
        }
      </VStack>
    </Box>
  );
};

export default NetworkMenuContentMobile;
