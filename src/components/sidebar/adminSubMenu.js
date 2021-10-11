import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SwitchSubMenu } from 'actions/adminPanelActions';
import _ from 'lodash';
import ShortName from 'utils/short-name';

const SubMenu = () => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();

  return (
    <div className={'sidebar--course-name'}>
      {!_.isEmpty(store.subMenuData) ? (
        store.subMenuData.map((item, key) => (
          <div
            className={store.activeSubMenu === key ? 'coursehandle_active' : 'coursehandle'}
            key={key}
            onClick={() => dispatch(SwitchSubMenu(key))}
          >
            <span className="coursehandle--heading" title={item.title}>
              {item.title.length < 30 ? item.title : ShortName(item.title)}
              {item.code && ` | ${item.code}`}
            </span>
          </div>
        ))
      ) : (
        <div className="coursehandle">
          <span className="coursehandle--heading coursehandle--heading-light">
            Nothing to show Here
          </span>
        </div>
      )}
    </div>
  );
};

export default SubMenu;
