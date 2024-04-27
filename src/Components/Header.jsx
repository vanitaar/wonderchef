import { Block, Media } from "react-bulma-components";
import logo from "./asset/logo.png";

export default function Header() {
  return (
    <section className="hero is-warning is-halfheight">
      <div className="hero-body">
        <div className="">
          <Media>
            <Media.Item align="left">
              <img src={logo} alt="Logo" width={200} height={200} />
            </Media.Item>
            <Media.Item align="right">
              <Block />
              <p className="title">WonderChef</p>
              <p className="subtitle">Explore and Savour</p>
            </Media.Item>
          </Media>
        </div>
      </div>
    </section>
  );
}
