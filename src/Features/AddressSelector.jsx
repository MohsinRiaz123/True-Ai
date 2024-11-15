import React, { useState, useEffect, useRef } from "react";
import { Country, State, City } from "country-state-city";

const AddressSelector = ({ formData, handleChange, errors, touched }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");

  const autocompleteRef = useRef(null);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(stateCities);
    }
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    setSelectedCountry(formData.country);
    setSelectedState(formData.state);
    setSelectedCity(formData.city);
    setAddress(formData.address);
  }, [formData]);

  // Google Maps autocomplete setup
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initAutocomplete;
    };

    const initAutocomplete = () => {
      if (window.google && window.google.maps && autocompleteRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place && place.formatted_address) {
            setAddress(place.formatted_address);
            handleChange({ target: { name: 'address', value: place.formatted_address } });
          }
        });
      }
    };

    if (!window.google || !window.google.maps) {
      loadGoogleMapsScript();
    } else {
      initAutocomplete();
    }
  }, []);

  const handleAddressChange = (e) => {
    const newValue = e.target.value;
    setAddress(newValue);
    handleChange({ target: { name: 'address', value: newValue } });
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    handleChange({ target: { name: 'country', value } });
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    handleChange({ target: { name: 'state', value } });
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    handleChange({ target: { name: 'city', value } });
  };

  return (
    <div className="space-y-10">
      <div className="flex gap-5 tablet:gap-20 w-full">
        <div className="flex flex-col w-full">
          <label className="font-semibold" htmlFor="country">Country:</label>
          <select
            id="country"
            value={selectedCountry}
            className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="font-semibold" htmlFor="state">State:</label>
          <select
            id="state"
            value={selectedState}
            className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          {touched.state && errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
      </div>
      <div className="flex gap-5 tablet:gap-20 w-full">
        <div className="flex flex-col w-full">
          <label className="font-semibold" htmlFor="city">City:</label>
          <select
            id="city"
            value={selectedCity}
            className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {touched.city && errors.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="font-semibold">Street Address</label>
          <input
            type="text"
            ref={autocompleteRef}
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your address"
            className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
          />
          {touched.address && errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSelector;