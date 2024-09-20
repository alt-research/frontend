import { Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import type { Screen } from 'ui/snippets/auth/types';

import config from 'configs/app';
import MyProfileEmail from 'ui/myProfile/MyProfileEmail';
import MyProfileWallet from 'ui/myProfile/MyProfileWallet';
import ContentLoader from 'ui/shared/ContentLoader';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import PageTitle from 'ui/shared/Page/PageTitle';
import AuthModal from 'ui/snippets/auth/AuthModal';
import useProfileQuery from 'ui/snippets/auth/useProfileQuery';
import useRedirectForInvalidAuthToken from 'ui/snippets/auth/useRedirectForInvalidAuthToken';

const MyProfile = () => {
  const [ authInitialScreen, setAuthInitialScreen ] = React.useState<Screen>();
  const authModal = useDisclosure();

  const profileQuery = useProfileQuery();
  useRedirectForInvalidAuthToken();

  const handleAddWalletClick = React.useCallback(() => {
    setAuthInitialScreen({ type: 'connect_wallet', isAuth: true });
    authModal.onOpen();
  }, [ authModal ]);

  const content = (() => {
    if (profileQuery.isPending) {
      return <ContentLoader/>;
    }

    if (profileQuery.isError) {
      return <DataFetchAlert/>;
    }

    return (
      <>
        <Flex maxW="480px" mt={ 8 } flexDir="column" rowGap={ 12 }>
          <MyProfileEmail profileQuery={ profileQuery }/>
          { config.features.blockchainInteraction.isEnabled && <MyProfileWallet profileQuery={ profileQuery } onAddWallet={ handleAddWalletClick }/> }
        </Flex>
        { authModal.isOpen && authInitialScreen && <AuthModal initialScreen={ authInitialScreen } onClose={ authModal.onClose }/> }
      </>
    );
  })();

  return (
    <>
      <PageTitle title="My profile"/>
      { content }
    </>
  );
};

export default MyProfile;
