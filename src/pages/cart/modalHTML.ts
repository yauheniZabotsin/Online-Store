export const modalHTML = `
<div class="modal">
      <div class="modal-content">
        <app-buy-products class = "app-products-buy">
          <form
            
            novalidate=""
            class="ng-untouched ng-pristine ng-invalid"
          >
            <div  class="person-details">
              <h2 >Personal details</h2>
              <div  class="person-name form-item">
                <input
                  
                  type="text"
                  placeholder="Name"
                  formcontrolname="personName"
                  class="ng-untouched ng-pristine ng-invalid"
                />
              </div>
              <div  class="phone-number form-item">
                <input
                  
                  type="text"
                  placeholder="Phone number"
                  formcontrolname="phoneNumber"
                  class="ng-untouched ng-pristine ng-invalid"
                />
              </div>
              <div  class="adress form-item">
                <input
                  
                  type="text"
                  placeholder="Delivery address"
                  formcontrolname="adress"
                  class="ng-untouched ng-pristine ng-invalid"
                />
              </div>
              <div  class="email form-item">
                <input
                  
                  type="text"
                  placeholder="E-mail"
                  formcontrolname="email"
                  class="ng-untouched ng-pristine ng-invalid"
                />
              </div>
            </div>
            <div  class="card-details">
              <h2 >Credit card details</h2>
              <div  class="card-data">
                <div  class="number">
                  <img
                    
                    alt=""
                    src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=fb1dca6cdd4589cd9ef2fc941935de71"
                  /><input
                    
                    type="text"
                    formcontrolname="cardNumber"
                    placeholder="Card number"
                    class="ng-untouched ng-pristine ng-invalid"
                  />
                </div>
                <div  class="other-data">
                  <div  class="valid-data">
                    VALID:
                    <input
                      
                      type="text"
                      formcontrolname="cardDate"
                      placeholder="Valid Thru"
                      class="ng-untouched ng-pristine ng-invalid"
                    />
                  </div>
                  <div  class="cvv-data">
                    CVV:
                    <input
                      
                      type="text"
                      formcontrolname="cardCVV"
                      placeholder="Code"
                      class="ng-untouched ng-pristine ng-invalid"
                    />
                  </div>
                </div>
              </div>
              
            </div>
            <button">CONFIRM</button>
          </form>
          </app-buy-products>
      </div>
    </div>
`;
