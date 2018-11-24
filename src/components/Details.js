import React from "react";
import { navigate } from "@reach/router/lib/history";
import Carousel from "./Carousel";
import Modal from "./Modal";
import { petfinder } from "../utils/petFinderApi";

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      // .catch(error => this.setState({ error }));
      .catch(() => navigate("/"));
  }
  render() {
    const {
      animal,
      breed,
      location,
      description,
      loading,
      name,
      media,
      showModal
    } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
