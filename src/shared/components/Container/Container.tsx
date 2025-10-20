import { PropsWithChildren } from "react";
import './Container.scss';

const Container = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="c-container">
      <div className="c-container__inner">{children}</div>
    </div>
  );
}
export default Container;
