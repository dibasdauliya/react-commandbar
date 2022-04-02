import React from 'react';
import { useSnapshot } from 'valtio';
import _ from './store/store';
import { init } from 'commandbar';
import { useNavigate } from 'react-router-dom';
import { editCompanyDetails } from './store/actions';

init('352b7a36');

const useCommandBar = () => {
  const snapshot = useSnapshot(_);

  // for react router
  const navigate = useNavigate();

  // show the things, makes ctrl+k work
  const loggedInUserId = '12345';
  window.CommandBar.boot(loggedInUserId);

  React.useEffect(() => {
    // for react router
    function router(url: string) {
      navigate(url);
    }

    window.CommandBar.addRouter(router);
  }, [navigate]);

  // For all data of leads and integrations
  React.useEffect(() => {
    window.CommandBar.addContext('leads', snapshot.companies);
    window.CommandBar.addContext('integrations', snapshot.integrations);

    // contexts > leads [3 dots] > "+ create command" > Url: /leads/{{this_lead.id}}, add searchable fields from the setting for extra
  }, [snapshot.companies, snapshot.integrations]);
};

export default useCommandBar;
