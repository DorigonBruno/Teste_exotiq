import Banner from "../Banner/Banner";
import Filtros from "../../util/Filtros";
import Header from "../Header/Header";
import PostsList from "../Posts/PostsList";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Header title="Geral" />
      <Filtros />
      <Banner />
      <PostsList />
    </div>
  );
};

export default Home;
