import Button from "./Button/Button";
import api from "./services/api";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Spinner from "./Spinner/Spinner";
import Notiflix from 'notiflix';
import BtnScrollUp from "./BtnScrollUp/BtnScrollUp";

const { Component } = require("react");
const { default: Searchbar } = require("./Searchbar/Searchbar");

class App extends Component {
  state={
      page:1,
      query:"",
      photos:[],
      isLoading:false,
      showModal:"",
      largeImage:"",
      totalPages:0
  }
  async componentDidUpdate(_,prevState) {
    if(this.state.query!==prevState.query || this.state.page!==prevState.page)
    {
      const {query, page}=this.state;
      this.setState({ isLoading: true });

      const response = await api
        .fetchImages(query, page)
        .catch(error => this.setState({ error }))
        .finally( this.setState({ isLoading: false }))
        if (response.data.totalHits === 0)
        {
          Notiflix.Notify.failure('Enter correct request');
          this.setState({ images: [] });
          return;
        }
      response.data.hits.forEach(({ id, webformatURL, largeImageURL, tags }) => {
        return this.setState(prev=>({
          photos:[...prev.photos,{ id, webformatURL, largeImageURL, tags }],
          totalPages: Math.ceil(response.data.totalHits/12)
        })) 
      });
    }
  }
  handleSubmit=(name)=>{
    this.setState({query:name,photos:[],page:1})
  }
  loadMore=()=>{
this.setState(prevState=>({page:prevState.page+1}))
  }
  onClick=(photo)=>{
    this.setState({largeImage:photo,showModal:true})
  }
  onModalClose=()=>{
    this.setState(prevState=>({
      showModal:!prevState.showModal
    }))
  }
  render()
  {
    const{isLoading,showModal,photos,largeImage,totalPages,page}=this.state;
    return (
      <>
      <Searchbar onSubmit={this.handleSubmit}/>
      {isLoading && <Spinner/>}
      {showModal && <Modal src={largeImage} onClose={this.onModalClose}/>  }
      {this.state.photos.length>0 && <ImageGallery items={photos} onClick={this.onClick}/>}
      {photos.length!==0 && totalPages>page && ( <Button onLoadMore={this.loadMore}/>)}
      <BtnScrollUp/>
      </>
    );
  }
}
export default App
