import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
interface PlacesAutocompleteProps {
  setPlaceId: (placeId: string) => void;
}
export const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    (obj: { description: string; place_id: string }) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      console.log("weird obj handle select");
      console.log(obj);
      setValue(obj.description, false);
      props.setPlaceId(obj.place_id);

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      const map = new google.maps.Map(
        document.getElementById("body") as HTMLElement,
        {
          center: { lat: -33.866, lng: 151.196 },
          zoom: 15,
        }
      );

      const request = {
        placeId: obj.place_id,
        fields: ["name", "formatted_address", "place_id", "geometry"],
      };

      //   const infowindow = new google.maps.InfoWindow();
      //      const service = new google.maps.places.PlacesService(document.querySelector("body")!);
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(request, (place, status) => {
        console.log(place);
      });

      clearSuggestions();

      // Get latitude and longitude via utility functions
      // getGeocode({ address: obj.description })
      //   .then((results) => getLatLng(results[0]))
      //   .then(({ lat, lng }) => {
      //     console.log("📍 Coordinates: ", { lat, lng });
      //   })
      //   .catch((error) => {
      //     console.log("😱 Error: ", error);
      //   });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        value={value}
        id="outlined-multiline-flexible"
        label="name"
        multiline
        placeholder="Bageri"
        maxRows={2}
        variant="filled"
        //   inputRef={nameRef}

        onChange={handleInput}
        // value={value}
        // onChange={handleChange}
      />
      {/* <input
        
       
        disabled={!ready}
        placeholder="Where are you going?"
      /> */}
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
