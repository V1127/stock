import React from "react";

function Button(props) {
  return (
    <div className="container">
          <button class="tip-button">
              <span class="tip-button__text">Get Latest Updates...</span>
              <div class="coin-wrapper">
                  <div class="coin">
                      <div class="coin__middle"></div>
                      <div class="coin__back"></div>
                      <div class="coin__front"></div>
                  </div>
              </div>
          </button>
    </div>
  );
}

export default Button;