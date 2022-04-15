import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

//function App() {
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  async componentDidMount() {
    const users = await (
      await fetch('https://jsonplaceholder.typicode.com/users')
    ).json();

    this.setState(() => {
      return {
        monsters: users,
      };
    });
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();

    //console.log(monsters);

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>

        <SearchBox
          onChangeHandler={onSearchChange}
          className="search"
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
