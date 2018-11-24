import React from "react";
import Pet from "./Pet";
import { petfinder } from "../utils/petFinderApi";
import { Consumer } from "./SearchContext";
import SearchBox from "./SearchBox";

class Results extends React.Component {
  state = {
    pets: []
  };

  componentDidMount() {
    this.search();
  }

  search = () => {
    const { location, animal, breed } = this.props.searchParams;
    petfinder.pet
      .find({
        output: "full",
        location,
        animal,
        breed
      })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="search">
          <SearchBox search={this.search} />
          {this.state.pets.map(pet => {
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }
            return (
              <Pet
                id={pet.id}
                key={pet.id}
                name={pet.name}
                breed={breed}
                animal={pet.animal}
                media={pet.media}
                location={`${pet.contact.city}, ${pet.contact.state}`}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

// use context this way if you need to access context outside of render method
export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
