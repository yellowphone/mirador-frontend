export const addSpaceOrNot = (
  address: string,
  componentType: string
): string => {
  return address === '' ? componentType : ` ${componentType}`;
};

export const composePlace = (place: google.maps.places.PlaceResult): string => {
  let address = '';
  let postcode = '';
  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    const componentType = component.types[0];
    switch (componentType) {
      case 'street_number': {
        address = addSpaceOrNot(address, component.long_name);
        break;
      }

      case 'route': {
        address += addSpaceOrNot(address, component.short_name);
        break;
      }

      case 'postal_code': {
        postcode = `${component.long_name}${postcode}`;
        address += addSpaceOrNot(address, postcode);
        break;
      }

      case 'postal_code_suffix': {
        if (postcode) {
          address += `-${component.long_name}`;
        }
        break;
      }

      case 'locality':
        address += addSpaceOrNot(address, component.long_name);
        break;

      case 'administrative_area_level_1': {
        address += addSpaceOrNot(address, component?.short_name);
        break;
      }

      case 'country':
        address += addSpaceOrNot(address, component.long_name);
        break;
    }
  }
  return `${place.name} ${address}`;
};
