import React from "react";
import "../scss/bootstrap.scss";
import "../scss/fontawesome.scss";
import "../scss/styles.scss";

const Header = () => {
  return (
    <header className="header position-relative overflow-hidden">
      <img
        src="images/decoration-star.svg"
        alt=""
        className="decoration-star position-absolute"
      />
      <img
        src="images/decoration-star.svg"
        alt=""
        className="decoration-star-2 position-absolute"
      />

      <div className="container position-relative z-3">
        <div className="row">
          <div className="col-lg-6">
            <div className="mt-6">
              <h1 className="xl-text">
                Donations <span className="text-primary"> Automated </span> for
                You
              </h1>
              <p className="lead mb-4">
                Indeed, those men and women who give in charity and lend to
                Allah a good loan will have it multiplied for them, and they
                will have an honourable reward ( Quran 57:18 )
              </p>
              <a href="#introduction" className="btn btn-primary btn-lg m-2">
                &nbsp;&nbsp;Donate&nbsp;&nbsp;
              </a>
              <a
                href="#contact"
                className="btn btn-outline-secondary btn-lg m-2"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-container">
              <img src="images/header.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
