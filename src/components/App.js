import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (type) => {
    this.setState({
      ...this.state,
      filters: {type}
    })
  }

  onFindPetsClick = () => {
    let url;
    this.state.filters.type === "all" ?
    url = "/api/pets" :
    url = `/api/pets?type=${this.state.filters.type}`

    fetch(url)
    .then(resp => resp.json())
    .then(results => {
      this.setState({
        pets: results
      })
    })
  }

  onAdoptPet = (petID) => {
    console.log(petID)
    const updatedPets = this.state.pets.map(pet => {
      return pet.id === petID ? {...pet, isAdopted: true} : pet
    })
    this.setState({pets: updatedPets})
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
