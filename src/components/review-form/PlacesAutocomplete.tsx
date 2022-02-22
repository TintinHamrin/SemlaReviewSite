import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { Review } from '../../models/review';

interface PlacesAutocompleteProps {
  //setPlaceId: (placeId: string) => void;
  reviewDispatch: React.Dispatch<Review>;
}

// let name: string = 'sfd';

// type PointType1 = { x: number; y: number };
// type PointType2 = { x: number; y: number; z: number };
// interface PointInterface {
//   x: number;
//   y: number;
// }
// let drawPoint: (pointdf:PointInterface) => void = (
//   point: PointInterface
// ) => {
//   console.log(point.x);
// };
// let p1: PointType1 = {x: 0, y: 0};
// let p2: PointType2 = {x: 0, y: 0, z: 0};
// drawPoint(p1)
// drawPoint(p2)
export const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
  // console.log(bakeryNameRef.current!);

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

      const review = new Review();
      review.nameOfBakery = obj.description;
      review.placeId = obj.place_id;
      props.reviewDispatch(review);

      console.log('weird obj handle select');
      console.log(obj);

      setValue(obj.description, false);

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      // const map = new google.maps.Map(
      //   document.getElementById('body') as HTMLElement,
      //   {
      //     center: { lat: -33.866, lng: 151.196 },
      //     zoom: 15,
      //   }
      // );

      const request = {
        placeId: obj.place_id,
        fields: ['name', 'formatted_address', 'place_id', 'geometry'],
      };

      //   const infowindow = new google.maps.InfoWindow();
      //      const service = new google.maps.places.PlacesService(document.querySelector("body")!);
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      service.getDetails(request, (place, status) => {
        console.log(place);
      });

      clearSuggestions();
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
        // inputRef={bakeryNameRef}
        onChange={handleInput}
        // value={value}
        // onChange={handleChange}
      />
      {/* <input
        
       
        disabled={!ready}
        placeholder="Where are you going?"
      /> */}
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
