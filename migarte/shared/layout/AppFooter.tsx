import React from 'react';
import { observer } from 'mobx-react';
import { Layout, Divider } from 'antd';
import { Link } from 'react-router-dom';
import UIStore from 'shared/stores/UIStore';
import logoLight from '@/assets/img/logo-light.png'
import './styles.less';

const { Footer } = Layout;

@observer
class AppFooter extends React.Component<any, any> {
  render() {
    let cpYear = new Date();

    return (
      <Footer className="app-footer" style={{ display: UIStore.footerVisible ? 'block' : 'none' }}>
        <div className="footer-wrapper-content">
          <div className="left-wrapper">
            <Link to="/">
              <img src={logoLight} className="brand app-footer-logo" />
            </Link>
            <div className="content-wrapper">
              <div className="select-wrapper">
                <Link to="/">
                  首页
                </Link>
                <Divider type='vertical'/>
                <Link to="/course/">
                  课程
                </Link>
                <Divider type='vertical'/>
                <a href="/">联系我们</a>
              </div>
              <div className="copy-right">
                Copyright &copy; 2018-{cpYear.getFullYear()} 无限科技 Mugen.Inc &nbsp;
                {/* <Link to="http://www.miibeian.gov.cn/">京ICP备16004690号-1</Link> */}
              </div>
            </div>
          </div>
        </div>
      </Footer>
    );
  }
}

export default AppFooter;
