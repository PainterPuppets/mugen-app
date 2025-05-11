import React from 'react';
import { observer } from "mobx-react";
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import CharacterContainer from './containers/CharacterContainer'
import CharacterList from './containers/CharacterList'
import CharacterCreateContainer from './containers/CharacterCreateContainer'
import AuthStore from "@/shared/stores/AuthStore";
import NotAuth from '@/shared/components/NotAuth';


export default observer((props: RouteComponentProps) => {
  if (!AuthStore.isAuthenticated) {
    if (AuthStore.initial) {
      return null;
    }
    return <NotAuth />;
  }

  return (
    <Switch>
      <Route path={`${props.match.path}/create`} component={CharacterCreateContainer} />
      <Route path={`${props.match.path}/:uuid`} component={CharacterContainer} />
      <Route path={`${props.match.path}/`} component={CharacterList} />
      {/* <Redirect to={`${props.match.path}`} /> */}
    </Switch>
  )
});
