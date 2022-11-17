import {BsSearch} from "react-icons/bs"
import PropTypes from 'prop-types';
import css from "../Searchbar/Searchbar.module.css"
const { Component } = require("react");

class Searchbar extends Component{
    state={
        inputText:""
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      };
    handleChange=(evt)=>{
        
        this.setState({inputText:evt.target.value})
    }
    handleSubmit=(evt)=>
    {
        evt.preventDefault();
        this.props.onSubmit(this.state.inputText)
        this.setState({inputText:""})
    }
    render()
    {
        return(
            <header className={css.searchbar}>
                <form onSubmit={this.handleSubmit} className={css.SearchForm}>
                    <button type="submit" className={css.SearchForm__button } >
                        <BsSearch size={30}/>
                    <span className={css.SearchForm_button_label}>Search</span>
                    </button>

                    <input
                    onChange={this.handleChange}
                    className={css.SearchForm__input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={this.state.inputText}
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    
    }
}
export default Searchbar
