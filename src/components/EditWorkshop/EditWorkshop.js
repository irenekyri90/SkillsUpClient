import React from "react";
import axios from "axios";
import { withAuth } from "./../../context/auth-context";
import "./EditWorkshop.css";
import workshopService from "../../lib/workshop-service";

class EditWorkshop extends React.Component {
  state = {
    title: this.props.workshop.title,
    img: this.props.workshop.img,
    description: this.props.workshop.description,
    category: this.props.workshop.category,
    date: this.props.workshop.date,
    length: this.props.workshop.length,
    credits: this.props.workshop.credits,
    maxParticipants: this.props.workshop.maxParticipants,
    location: this.props.workshop.location,
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    console.log(value);

    if (type === "checkbox") {
      value = !this.state[name];
    }

    if (name === "length") {
      this.setState({ credits: Math.round((value / 60) * 10) });
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Button submitted");

    const {
      title,
      img,
      description,
      category,
      date,
      length,
      credits,
      maxParticipants,
      location,
    } = this.state;

    const userId = this.props.user._id;
    const id = this.props.workshop._id;

    workshopService
      .editOneWorkshop(
        id,
        title,
        img,
        description,
        date,
        category,
        length,
        credits,
        maxParticipants,
        location,
        userId
      )
      .then((data) => {
        this.props.edit();
      });
  };

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    uploadData.append("img", file);

    workshopService.uploadImage(uploadData).then((data) => {
      this.setState({ img: data.secure_url });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="edit-form">
        <label for="title">Name your workshop</label>
        <input
          name="title"
          type="text"
          placeholder="e.g. Cooking Class"
          value={this.state.title}
          onChange={this.handleInput}
          required
        />
        <label>Upload an Image</label>
        <input name="img" type="file" onChange={this.handleFileUpload}></input>
        <span>
          <img
            style={{ width: "100px", marginBottom: "20px" }}
            src={this.state.img && this.state.img}
            alt=""
          ></img>
        </span>

        <label for="description">Tell us a bit about your workshop</label>
        <textarea
          id="description-box"
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleInput}
          required
        />
        <label>Pick a category</label>
        <div className="category-checkboxes">
          <div className="checkbox-pair">
            <label for="sports">Sports</label>
            <input
              type="radio"
              name="category"
              value="Sports"
              onChange={this.handleInput}
              required
            />
          </div>

          <div className="checkbox-pair">
            <label for="beauty">Beauty</label>
            <input
              type="radio"
              name="category"
              value="Beauty"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="languages">Languages</label>
            <input
              type="radio"
              name="category"
              value="Languages"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="creativity">Creativity</label>
            <input
              type="radio"
              name="category"
              value="Creativity"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="food-drink">Food & Drink</label>
            <input
              type="radio"
              name="category"
              value="Food & Drink"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="performing-arts">Performing Arts</label>
            <input
              type="radio"
              name="category"
              value="Performing Arts"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="other">Other</label>
            <input
              type="radio"
              name="category"
              value="Other"
              onChange={this.handleInput}
            />
          </div>
        </div>

        <label for="date">What's the date and time?</label>
        <input
          name="date"
          type="datetime-local"
          value={this.state.date}
          onChange={this.handleInput}
        />

        <label for="length">How long will it last (in mins)? </label>
        <input
          name="length"
          type="number"
          placeholder="e.g 90"
          value={this.state.length}
          onChange={this.handleInput}
          required
        />
        <p className="price-tag">Price: {this.state.credits}</p>

        <label for="maxParticipants">Maximum number of participants:</label>
        <input
          type="number"
          name="maxParticipants"
          value={this.state.maxParticipants}
          onChange={this.handleInput}
          required
        />
        <label for="location">Where will it take place?</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. Barceloneta Beach"
          value={this.state.location}
          onChange={this.handleInput}
          required
        />

        <button type="submit" className="edit-host-workshop-btn">
          {" "}
          Edit your workshop{" "}
        </button>
      </form>
    );
  }
}

export default withAuth(EditWorkshop);
