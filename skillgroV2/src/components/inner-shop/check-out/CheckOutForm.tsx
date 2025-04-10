const CheckOutForm = () => {
   return (
      <div className="col-lg-7">
         <form onSubmit={(e) => e.preventDefault()} className="customer__form-wrap">
            <span className="title">Billing Details</span>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="first-name">First name *</label>
                     <input type="text" id="first-name" />
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="last-name">Last name *</label>
                     <input type="text" id="last-name" />
                  </div>
               </div>
            </div>
            <div className="form-grp">
               <label htmlFor="company-name">Company name (optional)</label>
               <input type="text" id="company-name" />
            </div>
            <div className="form-grp select-grp">
               <label htmlFor="country-name">Country / Region *</label>
               <select id="country-name" name="country-name" className="country-name">
                  <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                  <option value="United States (US)">United States (US)</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Portugal">Portugal</option>
               </select>
            </div>
            <div className="form-grp">
               <label htmlFor="street-address">Street address *</label>
               <input type="text" id="street-address" placeholder="House number and street name" />
            </div>
            <div className="form-grp">
               <input type="text" id="street-address-two" placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>
            <div className="form-grp">
               <label htmlFor="town-name">Town / City *</label>
               <input type="text" id="town-name" />
            </div>
            <div className="form-grp select-grp">
               <label htmlFor="district-name">District *</label>
               <select id="district-name" name="district-name" className="district-name">
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="California">California</option>
                  <option value="New York">New York</option>
               </select>
            </div>
            <div className="form-grp">
               <label htmlFor="zip-code">ZIP Code *</label>
               <input type="text" id="zip-code" />
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="phone">Phone *</label>
                     <input type="number" id="phone" />
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="email">Email address *</label>
                     <input type="email" id="email" />
                  </div>
               </div>
            </div>
            <span className="title title-two">Additional Information</span>
            <div className="form-grp">
               <label htmlFor="note">Order notes (optional)</label>
               <textarea id="note" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
            </div>
         </form>
      </div>
   )
}

export default CheckOutForm;
