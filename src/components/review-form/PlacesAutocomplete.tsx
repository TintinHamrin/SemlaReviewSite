import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import TextField from "@mui/material/TextField";
import { Review } from "../../models/review";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { authActions } from "../../store/auth-slice";
import { bakeryActions } from "../../store/bakery-slice";

interface PlacesAutocompleteProps {
  reviewDispatch: React.Dispatch<Review>;
  bakeryName: string;
}

export const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
    console.log("val:", value);
  };

  useEffect(() => {
    setValue(props.bakeryName);
  }, []);

  const handleSelect =
    (obj: { description: string; place_id: string }) => () => {
      const review = new Review();
      review.nameOfBakery = obj.description;
      console.log("inside:", review.nameOfBakery);
      review.placeId = obj.place_id;
      props.reviewDispatch(review);
      console.log(obj);
      setValue(obj.description, false);

      const request = {
        placeId: obj.place_id,
        fields: ["name", "formatted_address", "place_id", "geometry"],
      };

      const service = new google.maps.places.PlacesService(
        document.createElement("div")
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
        <div key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        value={value}
        label="Bakery"
        minRows="2"
        maxRows={5}
        variant="filled"
        onChange={handleInput}
        fullWidth
      />

      {status === "OK" && (
        <div id="ex-list-box" role="listbox">
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
};
