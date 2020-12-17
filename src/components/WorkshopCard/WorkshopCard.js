import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WorkshopCard.css";
import EditWorkshop from "./../EditWorkshop/EditWorkshop";
import { withAuth } from "../../context/auth-context";
import moment from "moment";
import workshopService from "../../lib/workshop-service";

class WorkshopCard extends React.Component {
  state = {
    showEditForm: false,
    host: {},
  };

  componentDidMount = () => {
    workshopService.getOneWorkshop(this.props.workshop._id).then((data) => {
      this.setState({ host: data.host });
    });
  };

  handleDelete = () => {
    const userId = this.props.user._id;
    const user = this.props.user;
    console.log("USERID", userId);

    workshopService
      .deleteOneWorkshop(this.props.workshop._id, userId)
      .then((data) => {
        this.props.delete();
      });
  };

  handleCancel = () => {
    const userId = this.props.user._id;
    console.log(userId);

    workshopService
      .cancelOneWorkshop(this.props.workshop._id, userId)
      .then((data) => {
        this.props.cancel();
      });
  };

  handleEdit = () => {
    this.setState({ showEditForm: !this.state.showEditForm });
    this.props.edit();
  };

  render() {
    const workshop = this.props.workshop;
    const date = moment(workshop.date).format("ll");

    return (
      <div>
        <div className="workshop-card">
          <Link to={`/workshops/${workshop._id}`}>
            <div className="card-image">
              <img className="workshop-card-img" src={workshop.img} alt="" />
            </div>
          </Link>

          <div id="card-information">
            <div id="card-top">
              <p>
                <i className="far fa-clock"></i> {date}
              </p>
              <p className="credits">{workshop.credits} credits</p>
            </div>
            <Link
              style={{ textDecoration: "none" }}
              to={`/workshops/${workshop._id}`}
            >
              <h3 id="card-title">{workshop.title}</h3>
            </Link>

            <div id="card-bottom">
              {this.state.host ? (
                <div class="card-host-container">
                  <img
                    id="workshop-card-host-img"
                    src={this.state.host.img}
                    alt=""
                  />
                  <p>{this.state.host.username}</p>
                </div>
              ) : (
                <div class="card-host-container">
                  <p>
                    <i className="fas fa-user"></i> hosted by
                    <span> SkillsUp</span>
                  </p>
                </div>
              )}

              <div className="icons">
                <div onClick={this.handleDelete}>
                  {this.props.showBin ? (
                    <i className="fas fa-trash-alt"></i>
                  ) : null}
                </div>
                <div onClick={this.handleEdit}>
                  {this.props.showPen ? <i className="fas fa-pen"></i> : null}
                </div>
                <div onClick={this.handleCancel}>
                  {this.props.showCross ? (
                    <div>
                      <i className="fas fa-times"></i>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {this.state.showEditForm ? (
            <EditWorkshop workshop={workshop} edit={this.handleEdit} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default withAuth(WorkshopCard);
