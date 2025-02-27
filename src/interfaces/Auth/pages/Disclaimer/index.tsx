import './styles.sass'
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {PageId} from "../../../../shared/Auth/pageId";
import {authActions} from "../../reducer";

const PageDisclaimer = () => {

  const dispatch = useAppDispatch()
  const {page, disclaimerDuration} = useAppSelector(state => state.auth)
  const [isAnimStarted, setIsAnimStarted] = useState(false)
  const isOpen = page === PageId.Disclaimer

  useEffect(() => {
    if (!isOpen) setIsAnimStarted(false)
    else setTimeout(() => {
      setIsAnimStarted(true)
    }, 100)
  }, [page])

  return (
    <div className={`PageDisclaimer ${isOpen && '-show'}`}>
      <div className="logo"/>
      <div className="text">
        Skyrim Role Play никак не связан с Bethesda Game Studios, ZeniMax Media или любым другим правообладателем
        <br/>
        и не поддерживается ими. Все используемые торговые марки принадлежат соответствующим владельцам
        <br/>
        и не связаны с Bethesda Game Studios, ZeniMax Media и не поддерживаются ими.
      </div>
      <div className="progress">
        <div className="bar">
          <div
            className={`line ${isAnimStarted && '-anim'}`}
            style={{
              animationDuration: `${disclaimerDuration}ms`,
            }}
            onAnimationEnd={() => dispatch(authActions.setPage(PageId.SignIn))}
          />
        </div>
        <div className="helper">Идёт загрузка...</div>
      </div>
    </div>
  );
};

export default PageDisclaimer;