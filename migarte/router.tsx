import React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import AppLayout from 'shared/layout';
import CharacterRouter from '@/character/router';
// import ModuleDetail from '@/module/containers/ModuleDetail';
import WorkingPage from 'shared/components/Working';
// import HomePageContainer from '@/home/HomePageContainer';
import STContainer from '@/st/containers/STContainer';


class AppRouter extends React.Component<any, any> {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <AppLayout>
            <Switch>
              {/* <Route exact path="/home" component={CharacterRouter} /> */}
              <Route exact path="/module" component={WorkingPage} />
              <Route exact path="/map" component={WorkingPage} />
              <Route exact path="/shop" component={WorkingPage} />
              <Route exact path="/st" component={STContainer} />
              <Route exact path="/replay" component={WorkingPage} />
              <Route exact path="/forum" component={WorkingPage} />
              <Route exact path="/rule" component={WorkingPage} />
              <Route exact path="/module/:uuid" component={WorkingPage} />
              <Route path="/character" component={CharacterRouter} />
              <Redirect exact from="/" to="/character" />
            </Switch>
          </AppLayout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppRouter;